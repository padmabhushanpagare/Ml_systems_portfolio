import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { role: 'assistant', text: "Hello! I'm an AI assistant trained on Alex's portfolio. Ask me about his projects, skills, or experience." }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMsg = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue("");

    // Simulate AI delay and response
    setTimeout(() => {
        setMessages(prev => [...prev, { 
            role: 'assistant', 
            text: "This is a demo interaction running in the browser. In a production environment, this would connect to a RAG pipeline to query my resume and technical documentation." 
        }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Panel */}
      <div 
        className={`fixed bottom-24 right-6 w-[90vw] md:w-80 max-h-[600px] h-[450px] bg-surface border border-gray-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="p-4 bg-surface border-b border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-accent/10 rounded-lg text-accent">
                    <Bot size={18} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-white">Assistant</h3>
                    <p className="text-[10px] text-accent flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        Online
                    </p>
                </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-full"
                aria-label="Close Chat"
            >
                <X size={18} />
            </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50 scroll-smooth">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                        className={`max-w-[85%] p-3 text-sm leading-relaxed ${
                            msg.role === 'user' 
                                ? 'bg-accent text-white rounded-2xl rounded-br-sm shadow-sm' 
                                : 'bg-surface border border-gray-700 text-gray-300 rounded-2xl rounded-bl-sm'
                        }`}
                    >
                        {msg.text}
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 bg-surface border-t border-gray-800">
            <div className="relative flex items-center">
                <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about my work..."
                    className="w-full bg-background border border-gray-700 text-white text-sm rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:border-accent transition-colors placeholder:text-gray-600"
                />
                <button 
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="absolute right-2 p-1.5 bg-accent text-white rounded-lg hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Send Message"
                >
                    <Send size={16} />
                </button>
            </div>
        </form>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 group">
        {/* Label Tooltip */}
        <div 
            className={`bg-surface border border-gray-800 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}
        >
            Ask about my work
            <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2 h-2 bg-surface border-t border-r border-gray-800 rotate-45 transform"></div>
        </div>

        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="h-14 w-14 bg-accent hover:bg-accent-hover text-white rounded-full shadow-lg shadow-accent/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            aria-label={isOpen ? "Close Chat" : "Open Chat"}
        >
            <div className="relative w-6 h-6">
                <MessageSquare 
                    size={24} 
                    className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} 
                />
                <X 
                    size={24} 
                    className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} 
                />
            </div>
        </button>
      </div>
    </>
  );
};

export default ChatAssistant;