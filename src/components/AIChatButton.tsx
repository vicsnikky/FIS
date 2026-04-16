import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export default function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', text: 'Hi! I am the FIS AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const promptHistory = messages.slice(-5).map(m => `[${m.role.toUpperCase()}]: ${m.text}`).join('\n');
      
      const prompt = `You are a helpful, friendly academic assistant for Fenster International School (FIS). You help parents and students get quick info about the school. They offer Creche, Kindergarten, Primary, Secondary School, Diploma Programs, and Study in Canada relocation services. Here is the conversation history:\n${promptHistory}\n[USER]: ${userMsg.text}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      const replyText = response.text || "I'm not sure how to respond to that.";

      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', text: replyText };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error: any) {
      console.error(error);
      const errorMsg: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        text: 'Sorry, I am having trouble connecting right now. Please try again later.' 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 left-6 z-50 w-80 md:w-96 bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">FIS Assistant</h3>
                  <p className="text-white/60 text-xs">Powered by AI</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
                title="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[400px] min-h-[300px] bg-slate-50">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-accent text-white rounded-tr-sm' 
                        : 'bg-white text-slate-700 border border-slate-100 rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 text-slate-400 p-3 rounded-2xl rounded-tl-sm shadow-sm">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-slate-50">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-accent/20 outline-none transition-all placeholder:text-slate-400"
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-slate-900 transition-colors disabled:opacity-50 disabled:hover:bg-primary shrink-0"
                >
                  <Send size={18} className="translate-y-[1px] translate-x-[-1px]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 bg-primary text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform animate-bounce"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.9 }}
        title="Chat with FIS Assistant"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </motion.button>
    </>
  );
}
