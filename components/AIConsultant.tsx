
import React, { useState, useRef, useEffect } from 'react';
import { getCarAdvice } from '../services/geminiService';
import { sendChatLogToTelegram } from '../services/telegramService';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Assalomu alaykum! Men Million KM AI mexanikman. Mashinangizdagi har qanday texnik muammo haqida so\'rashingiz mumkin.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;
    
    const userMsg = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const advice = await getCarAdvice('Avtomobil', userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: advice }]);
      sendChatLogToTelegram('Foydalanuvchi', userMsg, advice);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: "Kechirasiz, aloqada uzilish bo'ldi. Iltimos, qayta urinib ko'ring." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[101]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-black text-white rounded-3xl shadow-2xl flex items-center justify-center tap-active hover:scale-110 transition-all border border-white/10"
        >
          <i className="fas fa-robot text-2xl"></i>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      ) : (
        <div className="w-85 md:w-[420px] bg-white apple-glass rounded-[2.5rem] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.3)] border border-white/40 flex flex-col animate-spring overflow-hidden">
          <div className="p-6 bg-black text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="fas fa-robot"></i>
              </div>
              <div>
                <span className="font-black text-sm block tracking-tight">Million KM AI</span>
                <span className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">Onlayn Texnik Maslahatchi</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all">
              <i className="fas fa-times text-xs"></i>
            </button>
          </div>
          
          <div className="flex-1 p-6 space-y-4 max-h-[450px] overflow-y-auto bg-gray-50/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-medium leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-200' 
                  : 'bg-white text-slate-900 border border-gray-100 rounded-tl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-gray-100 flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <div className="p-6 bg-white border-t border-gray-100 flex items-center space-x-3">
            <input 
              className="flex-1 bg-gray-100 h-14 px-6 rounded-2xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              placeholder="Muammoni yozing..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center tap-active shadow-xl"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
          <div className="pb-4 text-center">
            <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Powered by Google Gemini Intelligence</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIConsultant;
