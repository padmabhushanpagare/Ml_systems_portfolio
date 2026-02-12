import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { role: 'assistant', text: "Hello! I'm an AI assistant trained on Alex's portfolio. Ask me about his projects, skills, or experience." }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const generateResponse = (input: string): string => {
    const text = input.toLowerCase();

    // 1. Projects
    if (text.includes('delivery') || text.includes('demo') || text.includes('regression')) {
        return "PROJECT: Delivery Time Prediction\n\nPROBLEM: Inaccurate ETAs leading to customer dissatisfaction.\n\nAPPROACH: Simulated a weighted regression model with feature engineering (traffic density, rush hour logic, driver ratings) directly in the browser.\n\nIMPACT: Demonstrates how feature engineering affects model output logic in real-time.\n\nTOOLS: React, TypeScript, Manual Regression Logic.";
    }

    if (text.includes('maintenance') || text.includes('anomaly') || text.includes('sensor') || text.includes('project 1') || text.includes('stock')) {
        return "PROJECT: Predictive Maintenance System\n\nPROBLEM: Unplanned downtime costing $50k/hour with high false positive rates.\n\nAPPROACH: Architected LSTM-based anomaly detection on high-frequency sensor data. Implemented drift monitoring via EvidentlyAI.\n\nIMPACT: Reduced downtime by 35% ($2M/year savings) and false alarms by 60%.\n\nTOOLS: Python, TensorFlow, Kubernetes, FastAPI.";
    }

    if (text.includes('recommend') || text.includes('ranking') || text.includes('feed') || text.includes('project 2') || text.includes('dashboard')) {
        return "PROJECT: Real-time Recommendation Engine\n\nPROBLEM: Static sorting resulted in low engagement (2.5% conversion).\n\nAPPROACH: Designed a two-tower retrieval/ranking system with TFX and a Redis feature store for <50ms inference.\n\nIMPACT: Boosted CTR by 12% and GMV by 8%.\n\nTOOLS: PyTorch, Redis, TFX, BigQuery.";
    }

    if (text.includes('legal') || text.includes('nlp') || text.includes('document') || text.includes('project 3')) {
        return "PROJECT: Legal Document Intelligence\n\nPROBLEM: Manual contract review consumed 40+ hours/week.\n\nAPPROACH: Fine-tuned RoBERTa for NER and clause classification with a human-in-the-loop active learning pipeline.\n\nIMPACT: Automated 85% of initial review tasks.\n\nTOOLS: HuggingFace, NLP, Docker, PostgreSQL.";
    }

    // 2. Skills / Stack / ML
    if (text.includes('skill') || text.includes('stack') || text.includes('technology') || text.includes('tool') || text.includes('language') || text.includes('python') || text.includes('ml')) {
        return "TECHNICAL STACK\n\nLANGUAGES: Python, SQL, TypeScript, C++, Rust.\n\nML FRAMEWORKS: PyTorch, TensorFlow, Scikit-learn, HuggingFace.\n\nMLOPS: Docker, Kubernetes, AWS SageMaker, MLflow, Terraform.\n\nDATA: Spark, Kafka, PostgreSQL, dbt.";
    }

    // 3. Approach / Experience
    if (text.includes('approach') || text.includes('philosophy') || text.includes('method') || text.includes('experience') || text.includes('background')) {
        return "SYSTEMS APPROACH\n\nI focus on the full ML lifecycle: from Data Strategy (Feature Stores) to Modeling (Iterative Baselines) and Productionization (Scalable APIs), ensuring continuous value via rigorous Monitoring (Drift/Latency).";
    }

    // 4. Contact
    if (text.includes('contact') || text.includes('email') || text.includes('hire') || text.includes('resume')) {
        return "CONTACT INFO\n\nYou can reach me at hello@alexchen.dev. I am currently open to discussing new opportunities in ML Systems Engineering.";
    }

    // 5. Casual / Fallback
    if (text.includes('hello') || text.includes('hi ') || text === 'hi' || text.includes('hey')) {
        return "Hello! Feel free to ask about my specific projects like the 'Predictive Maintenance System' or my technical skills.";
    }

    return "I can provide details on my Machine Learning projects, MLOps experience, or technical stack. Try asking about 'Predictive Maintenance', 'Skills', or 'Contact'.";
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMsg = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI delay
    setTimeout(() => {
        const responseText = generateResponse(userMsg);
        setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
        setIsTyping(false);
    }, 800);
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
                        className={`max-w-[85%] p-3 text-sm leading-relaxed whitespace-pre-wrap ${
                            msg.role === 'user' 
                                ? 'bg-accent text-white rounded-2xl rounded-br-sm shadow-sm' 
                                : 'bg-surface border border-gray-700 text-gray-300 rounded-2xl rounded-bl-sm'
                        }`}
                    >
                        {msg.text}
                    </div>
                </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
                <div className="flex justify-start">
                    <div className="bg-surface border border-gray-700 p-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center h-10">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-[bounce_1s_infinite_-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-[bounce_1s_infinite_-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-[bounce_1s_infinite]"></span>
                    </div>
                </div>
            )}
            
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