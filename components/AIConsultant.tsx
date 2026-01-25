
import React, { useState, useRef, useEffect } from 'react';
import { getCarAdvice } from '../services/geminiService';
import { sendLeadToTelegram } from '../services/telegramService';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'chat' | 'lead'>('chat');
  const [model, setModel] = useState('');
  const [problem, setProblem] = useState('');
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const [leadData, setLeadData] = useState({
    name: '',
    phone: '',
    carPlate: '',
    mileage: ''
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [advice, step, isLoading]);

  const handleAsk = async () => {
    if (!model.trim() || !problem.trim()) return;
    setIsLoading(true);
    setAdvice('');
    const result = await getCarAdvice(model, problem);
    setAdvice(result);
    setIsLoading(false);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.name || !leadData.phone || !leadData.carPlate || !leadData.mileage) return;
    
    setIsLoading(true);
    const success = await sendLeadToTelegram({
      ...leadData,
      model,
      problem
    });
    
    setIsLoading(false);
    if (success) {
      setIsSent(true);
      setTimeout(() => {
        setIsOpen(false);
        setStep('chat');
        setAdvice('');
        setModel('');
        setProblem('');
        setIsSent(false);
        setLeadData({ name: '', phone: '', carPlate: '', mileage: '' });
      }, 3000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[150]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-black text-white rounded-[22px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group border border-white/10"
        >
          <div className="relative">
            <i className="fas fa-robot text-2xl"></i>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-black animate-pulse"></span>
          </div>
        </button>
      ) : (
        <div className="w-[380px] sm:w-[420px] bg-white rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col overflow-hidden animate-spring max-h-[640px]">
          {/* Header */}
          <div className="p-6 bg-black text-white flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <i className="fas fa-microchip text-sm"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm">Million KM AI Support</h4>
                <div className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Online Mexanik</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
              <i className="fas fa-times text-xs"></i>
            </button>
          </div>
          
          {/* Body */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 ios-scroll bg-gray-50/30">
            {step === 'chat' ? (
              <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                {!advice ? (
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                      <p className="text-sm font-semibold text-slate-800 leading-relaxed mb-4">
                        Assalomu alaykum! Men Million KM AI mexanikman. Mashinangizda qanday muammo borligini yozing, men sizga maslahat beraman.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Avtomobil Modeli</label>
                        <input 
                          className="w-full h-14 px-6 bg-white border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                          placeholder="Masalan: Chevrolet Cobalt" 
                          value={model}
                          onChange={e => setModel(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Muammoning tavsifi</label>
                        <textarea 
                          className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[120px] resize-none" 
                          placeholder="Muammo haqida batafsil yozing..."
                          value={problem}
                          onChange={e => setProblem(e.target.value)}
                        />
                      </div>
                    </div>

                    <button 
                      onClick={handleAsk}
                      disabled={isLoading || !model || !problem}
                      className="w-full h-16 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl active:scale-95 disabled:opacity-30 transition-all"
                    >
                      {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : "Tahlilni boshlash"}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-start">
                      <div className="max-w-[90%] bg-blue-600 text-white p-6 rounded-[2rem] rounded-tl-none shadow-xl shadow-blue-500/10">
                        <p className="text-[13px] font-semibold leading-relaxed whitespace-pre-wrap">{advice}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 pt-4">
                       <button 
                        onClick={() => setStep('lead')}
                        className="py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg"
                       >
                         Servisga yozilish
                       </button>
                       <button 
                        onClick={() => { setAdvice(''); setProblem(''); }}
                        className="py-4 bg-white border border-gray-100 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:text-black transition-all"
                       >
                         Yana so'rash
                       </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                {isSent ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <h3 className="text-xl font-black tracking-tight">Qabul qilindi!</h3>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Tez orada mutaxassis bog'lanadi</p>
                  </div>
                ) : (
                  <>
                    <div className="text-center space-y-1 mb-4">
                      <h3 className="text-lg font-black tracking-tight uppercase">Servisga Yozilish</h3>
                      <p className="text-[9px] text-blue-500 font-bold uppercase tracking-[0.2em]">Ma'lumotlaringizni tasdiqlang</p>
                    </div>
                    
                    <form onSubmit={handleLeadSubmit} className="space-y-3">
                       <input 
                        required
                        className="w-full h-14 px-6 bg-white border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-600 outline-none" 
                        placeholder="Ismingiz"
                        value={leadData.name}
                        onChange={e => setLeadData({...leadData, name: e.target.value})}
                       />
                       <input 
                        required
                        type="tel"
                        className="w-full h-14 px-6 bg-white border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-600 outline-none" 
                        placeholder="Telefon raqamingiz"
                        value={leadData.phone}
                        onChange={e => setLeadData({...leadData, phone: e.target.value})}
                       />
                       <input 
                        required
                        className="w-full h-14 px-6 bg-white border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-600 outline-none" 
                        placeholder="Mashina raqami (masalan: 01A777AA)"
                        value={leadData.carPlate}
                        onChange={e => setLeadData({...leadData, carPlate: e.target.value})}
                       />
                       <input 
                        required
                        type="number"
                        className="w-full h-14 px-6 bg-white border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-600 outline-none" 
                        placeholder="Hozirgi probeg (KM)"
                        value={leadData.mileage}
                        onChange={e => setLeadData({...leadData, mileage: e.target.value})}
                       />
                       
                       <div className="flex gap-2 pt-4">
                         <button type="button" onClick={() => setStep('chat')} className="w-14 h-16 bg-gray-100 text-gray-400 rounded-2xl hover:text-black transition-all">
                           <i className="fas fa-chevron-left"></i>
                         </button>
                         <button 
                          type="submit"
                          disabled={isLoading}
                          className="flex-1 h-16 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
                         >
                           {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : "Yuborish"}
                         </button>
                       </div>
                    </form>
                  </>
                )}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <div className="p-4 bg-white border-t border-gray-50 text-center shrink-0">
            <p className="text-[8px] font-bold text-gray-300 uppercase tracking-[0.3em]">© 2025 Million KM Premium Care</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIConsultant;
