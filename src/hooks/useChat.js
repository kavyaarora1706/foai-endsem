import { useState, useCallback, useEffect } from 'react';

import toast from 'react-hot-toast';

const STORAGE_KEY = 'iss-dashboard-chat';
const MAX_MESSAGES = 30;

/**
 * Build a prompt that restricts the AI strictly to dashboard data.
 * We inject ISS + news context so the model can answer accurately.
 */
function buildPrompt(userMessage, context) {
  const { issData, astronauts, newsArticles } = context;

  const issSection = issData
    ? `Current ISS Position: Latitude ${issData.lat?.toFixed(4)}, Longitude ${issData.lon?.toFixed(4)}. Speed: ~${Math.round(issData.speed || 0)} km/h.`
    : 'ISS data not available.';

  const astroSection =
    astronauts && astronauts.length > 0
      ? `Astronauts in space (${astronauts.length}): ${astronauts.map(a => a.name).join(', ')}.`
      : 'Astronaut data not available.';

  const newsSection =
    newsArticles && newsArticles.length > 0
      ? `Top news headlines:\n` +
        newsArticles
          .slice(0, 5)
          .map(
            (a, i) =>
              `${i + 1}. "${a.title}" — ${a.source?.name || 'Unknown source'}. ${a.description || a.content || ''}`
          )
          .join('\n')
      : 'News data not available.';

  return `<s>[INST] You are an AI assistant embedded inside the ISS & News Dashboard. You ONLY answer questions about ISS tracking data and the news articles displayed in this dashboard. If a user asks something unrelated, respond exactly: "I can only answer questions related to ISS tracking and dashboard news."

Here is the current dashboard data:

${issSection}
${astroSection}
${newsSection}

User question: ${userMessage} [/INST]`;
}

export function useChat(dashboardContext) {
  // Load messages from localStorage
  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Persist messages to localStorage (keep last MAX_MESSAGES)
  useEffect(() => {
    const toStore = messages.slice(-MAX_MESSAGES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  }, [messages]);

  const sendMessage = useCallback(
    async (userText) => {
      if (!userText.trim()) return;

      const userMsg = { role: 'user', text: userText, id: Date.now() };
      setMessages(prev => [...prev, userMsg]);
      setIsTyping(true);

      try {
        const prompt = buildPrompt(userText, dashboardContext);
        
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_AI_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "mistralai/mistral-7b-instruct",
            messages: [{ role: "user", content: prompt }]
          })
        });
        
        const data = await response.json();
        const reply = data.choices[0].message.content;

        const botMsg = {
          role: 'bot',
          text: reply,
          id: Date.now() + 1,
        };
        setMessages(prev => [...prev, botMsg]);
      } catch (err) {
        const errMsg = {
          role: 'bot',
          text: '⚠️ Failed to get a response. Please check your VITE_AI_TOKEN or try again later.',
          id: Date.now() + 1,
          isError: true,
        };
        setMessages(prev => [...prev, errMsg]);
        toast.error('Chatbot error. Check API token.');
      } finally {
        setIsTyping(false);
      }
    },
    [dashboardContext]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    toast.success('Chat cleared!');
  }, []);

  const toggleOpen = useCallback(() => setIsOpen(prev => !prev), []);

  return { messages, isTyping, isOpen, sendMessage, clearChat, toggleOpen };
}
