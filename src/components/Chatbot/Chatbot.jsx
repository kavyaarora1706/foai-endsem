import { useState, useRef, useEffect } from 'react';
import { useChat } from '../../hooks/useChat';
import { MessageSquare, X, Send, Trash2, Bot, User } from 'lucide-react';

export default function Chatbot({ dashboardContext }) {
  const { messages, isTyping, isOpen, sendMessage, clearChat, toggleOpen } = useChat(dashboardContext);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleOpen}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent), #8b5cf6)',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 32px rgba(99,102,241,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'scale(0)' : 'scale(1)',
        }}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <div
        style={{
          position: 'fixed',
          bottom: isOpen ? '24px' : '-500px',
          right: '24px',
          width: '350px',
          height: '500px',
          maxWidth: 'calc(100vw - 48px)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100,
          transition: 'bottom 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          overflow: 'hidden',
          opacity: isOpen ? 1 : 0,
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px',
            background: 'linear-gradient(135deg, var(--accent), #8b5cf6)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bot size={20} />
            <h3 style={{ margin: 0, fontSize: '16px' }}>AI Assistant</h3>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={clearChat} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.8 }}>
              <Trash2 size={16} />
            </button>
            <button onClick={toggleOpen} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '40px', fontSize: '14px' }}>
              <Bot size={40} style={{ opacity: 0.5, marginBottom: '12px' }} />
              <p>Hello! I can answer questions about the ISS and news on this dashboard.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-secondary)',
                  color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  fontSize: '14px',
                  lineHeight: 1.5,
                  border: msg.role === 'bot' && msg.isError ? '1px solid #ef4444' : 'none',
                }}
              >
                {msg.text}
              </div>
            ))
          )}
          {isTyping && (
            <div style={{ alignSelf: 'flex-start', background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: '16px 16px 16px 4px', display: 'flex', gap: '4px' }}>
              <span className="pulse-dot" style={{ background: 'var(--text-secondary)', width: '6px', height: '6px' }} />
              <span className="pulse-dot" style={{ background: 'var(--text-secondary)', width: '6px', height: '6px', animationDelay: '0.2s' }} />
              <span className="pulse-dot" style={{ background: 'var(--text-secondary)', width: '6px', height: '6px', animationDelay: '0.4s' }} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} style={{ padding: '12px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about ISS or News..."
            className="input-field"
            style={{ flex: 1, borderRadius: '20px' }}
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: input.trim() ? 'var(--accent)' : 'var(--bg-secondary)',
              color: 'white',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: input.trim() ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s',
            }}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
}
