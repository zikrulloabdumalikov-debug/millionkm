import React, { useState, useRef, useEffect } from 'react';
import { sendLeadToTelegram } from '../services/telegramService';

const AIConsultant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('welcome');
  const [isLoading, setIsLoading] = useState(false);
  
  const [data, setData] = useState({
    model: '',
    problem: '',
    name: '',
    phone: '',
    carPlate: '',
    mileage: ''
  });

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [step, isOpen]);

  const handleNext = () => {
    if (step === 'welcome') setStep('model');
    else if (step === 'model' && data.model) setStep('problem');
    else if (step === 'problem' && data.problem) setStep('contact');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.phone) return;
    
    setIsLoading(true);
    const success = await sendLeadToTelegram(data);
    setIsLoading(false);
    
    if (success) {
      setStep('success');
      setTimeout(() => {
        setIsOpen(false);
        resetChat();
      }, 5000);
    }
  };

  const resetChat = () => {
    setStep('welcome');
    setData({ model: '', problem: '', name: '', phone: '', carPlate: '', mileage: '' });
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[200]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 md:w-16 md:h-16 bg-black text-white rounded-[22px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-white/10 group"
        >
          <i className="fas fa-comment-dots text-xl md:text-2xl group-hover:rotate-12 transition-transform"></i>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-black animate-pulse"></span>
        </button>
      ) : (
        <div className="w-[calc(100vw-32px)] sm:w-[380px] md:w-[420px] bg-white rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col overflow-hidden animate-spring max-h-[85vh]">
          {/* Header */}
          <div className="p-5 md:p-6 bg-black text-white flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <i className="fas fa-headset text-sm"></i>
              </div>
              <div>
                <h4 className="font-bold text-xs md:text-sm tracking-tight">Million KM Support</h4>
                <div className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Operator Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
              <i className="fas fa-times text-xs"></i>
            </button>
          </div>

          {/* Chat Body */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 ios-scroll bg-gray-50/30">
            
            {/* Step: Messages */}
            <div className="space-y-6">
              {/* Bot: Welcome */}
              <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="max-w-[85%] bg-white p-4 md:p-5 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm text-xs md:text-sm font-semibold text-slate-800 leading-relaxed">
                  Assalomu alaykum! Million KM servisiga xush kelibsiz. Biz bilan bog'lanish uchun bir nechta savolga javob bering.
                </div>
              </div>

              {/* Bot: Ask Model */}
              {(step === 'model' || step === 'problem' || step === 'contact' || step === 'success') && (
                <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="max-w-[85%] bg-white p-4 md:p-5 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm text-xs md:text-sm font-semibold text-slate-800">
                    Mashinangiz modelini yozing (masalan: Cobalt, Kia K5):
                  </div>
                </div>
              )}

              {/* User: Model Input UI */}
              {step === 'model' && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <input 
                    autoFocus
                    className="w-full h-12 md:h-14 px-5 bg-white border border-gray-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Avto modeli..."
                    value={data.model}
                    onChange={e => setData({...data, model: e.target.value})}
                    onKeyPress={e => e.key === 'Enter' && data.model && handleNext()}
                  />
                  <button onClick={handleNext} disabled={!data.model} className="w-full h-12 bg-black text-white rounded-xl font-bold text-[10px] uppercase tracking-widest disabled:opacity-20 transition-all active:scale-95">
                    Davom etish <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              )}

              {/* Bot: Ask Problem */}
              {(step === 'problem' || step === 'contact' || step === 'success') && (
                <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="max-w-[85%] bg-white p-4 md:p-5 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm text-xs md:text-sm font-semibold text-slate-800">
                    Muammoni qisqacha tushuntiring:
                  </div>
                </div>
              )}

              {/* User: Problem Input UI */}
              {step === 'problem' && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <textarea 
                    autoFocus
                    className="w-full p-5 bg-white border border-gray-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[100px] resize-none"
                    placeholder="Masalan: moy kamayishi, motor ovozi..."
                    value={data.problem}
                    onChange={e => setData({...data, problem: e.target.value})}
                  />
                  <button onClick={handleNext} disabled={!data.problem} className="w-full h-12 bg-black text-white rounded-xl font-bold text-[10px] uppercase tracking-widest disabled:opacity-20 transition-all active:scale-95">
                    Keyingi <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              )}

              {/* Bot: Ask Contact */}
              {(step === 'contact' || step === 'success') && (
                <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="max-w-[85%] bg-white p-4 md:p-5 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm text-xs md:text-sm font-semibold text-slate-800">
                    Ajoyib! Mutaxassis bog'lanishi uchun ma'lumotlarni qoldiring:
                  </div>
                </div>
              )}

              {/* User: Contact Form UI */}
              {step === 'contact' && (
                <form onSubmit={handleSubmit} className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="grid grid-cols-1 gap-3">
                    <input required className="w-full h-12 px-5 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ismingiz" value={data.name} onChange={e => setData({...data, name: e.target.value})} />
                    <input required type="tel" className="w-full h-12 px-5 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" placeholder="Telefon (901234567)" value={data.phone} onChange={e => setData({...data, phone: e.target.value})} />
                    <div className="grid grid-cols-2 gap-3">
                      <input className="w-full h-12 px-5 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" placeholder="Raqam" value={data.carPlate} onChange={e => setData({...data, carPlate: e.target.value})} />
                      <input type="number" className="w-full h-12 px-5 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" placeholder="Probeg" value={data.mileage} onChange={e => setData({...data, mileage: e.target.value})} />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 active:scale-95 transition-all mt-4"
                  >
                    {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : "YUBORISH"}
                  </button>
                </form>
              )}

              {/* Success State */}
              {step === 'success' && (
                <div className="text-center py-8 space-y-4 animate-in zoom-in duration-500">
                  <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-2xl mx-auto shadow-inner">
                    <i className="fas fa-check"></i>
                  </div>
                  <h3 className="text-lg font-black tracking-tight uppercase text-slate-900">Qabul qilindi!</h3>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                    Mutaxassisimiz tez orada siz bilan <br /> bog'lanadi.
                  </p>
                </div>
              )}
            </div>
            
            <div ref={scrollRef} />
          </div>

          {/* Footer Branding */}
          <div className="p-4 bg-white border-t border-gray-50 text-center shrink-0">
            <p className="text-[8px] font-bold text-gray-300 uppercase tracking-[0.3em]">Million KM Premium Intelligence</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIConsultant;