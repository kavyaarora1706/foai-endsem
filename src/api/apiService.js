import axios from 'axios';

const ISS_API = 'https://api.open-notify.org/iss-now.json';
const ASTROS_API = 'https://api.open-notify.org/astros.json';
const GNEWS_API_BASE = 'https://gnews.io/api/v4';
const HF_API_BASE = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';

// ─── ISS ────────────────────────────────────────────────────────────────────

export const fetchISSPosition = async () => {
  // Use cors proxy to avoid CORS issues with api.open-notify.org
  const { data } = await axios.get(ISS_API);
  return data;
};

export const fetchAstronauts = async () => {
  const { data } = await axios.get(ASTROS_API);
  return data;
};

// ─── NEWS ────────────────────────────────────────────────────────────────────

export const fetchTopHeadlines = async ({ query = '', pageSize = 10 } = {}) => {
  const key = import.meta.env.VITE_NEWS_API_KEY;
  if (!key) throw new Error('No VITE_NEWS_API_KEY set in environment variables.');

  // GNews API — token is passed as a query param, not a header
  const params = {
    token: key,
    lang: 'en',
    max: pageSize,
  };

  if (query) {
    // GNews /search endpoint for keyword queries
    params.q = query;
    const { data } = await axios.get(`${GNEWS_API_BASE}/search`, { params });
    return data;
  } else {
    // GNews /top-headlines for general top stories
    const { data } = await axios.get(`${GNEWS_API_BASE}/top-headlines`, { params });
    return data;
  }
};

// ─── AI CHATBOT ──────────────────────────────────────────────────────────────

export const sendChatMessage = async (prompt) => {
  const token = import.meta.env.VITE_AI_TOKEN;
  if (!token) throw new Error('No VITE_AI_TOKEN set in environment variables.');

  const { data } = await axios.post(
    HF_API_BASE,
    {
      inputs: prompt,
      parameters: {
        max_new_tokens: 256,
        temperature: 0.7,
        return_full_text: false,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  // HuggingFace returns an array of generated texts
  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text.trim();
  }
  throw new Error('Unexpected response format from HuggingFace API.');
};
