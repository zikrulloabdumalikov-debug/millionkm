
import React, { useState } from 'react';
import { getCarAdvice } from '../services/geminiService';
import { sendChatLogToTelegram } from '../services/telegramService';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [model, setModel] = useState('');
  const [problem, setProblem] = useState('');
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!model || !problem) return;
    setIsLoading(true);
    const result = await getCarAdvice(model, problem);
    setAdvice(result);
    setIsLoading(false);
    
    // Also log this conversation to Telegram group
    sendChatLogToTelegram(model, problem, result);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-black text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative border border-white/10"
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
          </svg>
          <span className="absolute right-20 bg-black text-white text-[10px] font-bold px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest shadow-xl">AI MEXANIK</span>
        </button>
      ) : (
        <div className="w-85 md:w-[400px] bg-white rounded-[2.5rem] shadow-[0_25px_100px_-20px_rgba(0,0,0,0.3)] border border-gray-100 flex flex-col animate-in slide-in-from-bottom duration-500 overflow-hidden relative z-[101]">
          <div className="p-6 bg-black text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-robot text-sm"></i>
              </div>
              <div>
                <span className="font-bold text-sm block">Million KM AI</span>
                <span className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">Onlayn Texnik Maslahatchi</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {!advice ? (
              <>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">Assalomu alaykum! Mashinangizdagi har qanday texnik muammo haqida so'rang, AI mexanik sizga professional maslahat beradi.</p>
                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Avtomobil Modeli</label>
                    <input 
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 font-bold transition-all" 
                      placeholder="Masalan: Chevrolet Cobalt" 
                      value={model}
                      onChange={e => setModel(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Muammo Tavsifi</label>
                    <textarea 
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 font-bold transition-all min-h-[120px] resize-none" 
                      placeholder="Muammo nima? (Masalan: Sovuqda yurganda motor taraq-turuq qilyapti)"
                      value={problem}
                      onChange={e => setProblem(e.target.value)}
                    />
                  </div>
                </div>
                <button 
                  onClick={handleAsk}
                  disabled={isLoading}
                  className="w-full py-5 bg-black text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-gray-100 flex items-center justify-center disabled:opacity-50 active:scale-95 transition-all"
                >
                  {isLoading ? <i className="fas fa-circle-notch fa-spin mr-2"></i> : "Maslahat olish"}
                </button>
              </>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100/30">
                  <div className="flex items-center space-x-2 mb-4">
                    <i className="fas fa-comment-dots text-blue-600"></i>
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">AI Maslahati</span>
                  </div>
                  <p className="text-sm text-blue-900 leading-relaxed font-semibold italic">"{advice}"</p>
                </div>
                <button 
                  onClick={() => { setAdvice(''); setProblem(''); }}
                  className="w-full py-5 bg-gray-100 text-black rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  Yana so'rash
                </button>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-gray-50 text-center">
            <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">Powered by Google Gemini Intelligence</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIConsultant;
