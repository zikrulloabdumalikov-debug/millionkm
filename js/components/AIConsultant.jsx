import React from 'react';
import { sendTelegramNotification } from '../data.js';

const AIConsultant = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [step, setStep] = React.useState('problem');
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  
  const [messages, setMessages] = React.useState([]);
  
  const [data, setData] = React.useState({
    problem: '',
    model: '',
    mileage: '',
    time: '',
    name: '',
    phone: ''
  });

  const scrollRef = React.useRef(null);

  const resetChat = () => {
    setStep('problem');
    setMessages([
      { type: 'bot', text: "Assalomu alaykum! Million KM xizmatiga xush kelibsiz. Mashinangiz qanday muammoga duch keldi yoki qanday xizmat kerak?" }
    ]);
    setInputValue('');
    setData({ problem: '', model: '', mileage: '', time: '', name: '', phone: '' });
    setErrorMsg('');
  };

  React.useEffect(() => {
    if (isOpen) {
      resetChat();
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, step, errorMsg]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = { type: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    
    const currentInput = inputValue;
    setInputValue('');

    if (step === 'problem') {
      setData(prev => ({ ...prev, problem: currentInput }));
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: "Tushunarli. Mashinangiz qaysi brend va modeli? Masalan: Chevrolet Cobalt" }]);
        setStep('model');
      }, 500);
    } else if (step === 'model') {
      setData(prev => ({ ...prev, model: currentInput }));
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: "Mashinangiz necha yilda chiqarilgan va hozirgi probegi qancha kilometr?" }]);
        setStep('mileage');
      }, 500);
    } else if (step === 'mileage') {
      setData(prev => ({ ...prev, mileage: currentInput }));
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: "Siz bilan qachon bog'lanishimiz qulay? Bugun, ertaga yoki boshqa vaqtmi?" }]);
        setStep('time');
      }, 500);
    } else if (step === 'time') {
      setData(prev => ({ ...prev, time: currentInput }));
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: "Zo'r! Sizga tez orada murojaat qilamiz. Ismingiz va telefon raqamingizni qoldiring:" }]);
        setStep('contact');
      }, 500);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.phone) return;

    setIsLoading(true);
    setErrorMsg('');
    
    const telegramMessage = `
🤖 <b>YANGI LEAD (AI CHAT)</b>

👤 <b>Mijoz:</b> ${data.name}
📞 <b>Telefon:</b> <code>${data.phone}</code>
🚗 <b>Avto:</b> ${data.model}
📊 <b>Probeg va Yili:</b> ${data.mileage}
⏰ <b>Qulay vaqt:</b> ${data.time}

🛠 <b>Muammo/Xizmat:</b> 
<i>"${data.problem}"</i>
    `;

    try {
      const success = await sendTelegramNotification(telegramMessage);
      if (success) {
        setMessages(prev => [...prev, { type: 'bot', text: "Rahmat! Tez orada siz bilan bog'lanamiz." }]);
        setStep('success');
        setTimeout(() => {
          setIsOpen(false);
        }, 4000);
      } else {
        setErrorMsg("Xatolik bo'ldi. Internetni tekshiring.");
      }
    } catch (err) {
      setErrorMsg("Xatolik yuz berdi. Qayta urining.");
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 text-white rounded-[24px] md:rounded-[28px] shadow-[0_20px_50px_rgba(37,99,235,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all border border-white/10 group animate-spring"
        >
          <i className="fas fa-comment-dots text-2xl md:text-3xl group-hover:rotate-12 transition-transform"></i>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      ) : (
        <div className="w-[90vw] sm:w-[380px] md:w-[420px] bg-white rounded-[24px] md:rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col overflow-hidden animate-spring max-h-[80vh] fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999]">
          {/* Header */}
          <div className="p-4 md:p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <i className="fas fa-headset text-base md:text-lg"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm md:text-base tracking-tight">Million KM Support</h4>
                <div className="flex items-center mt-0.5 md:mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-[9px] md:text-[10px] text-white/60 font-bold uppercase tracking-widest">Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 ios-scroll bg-[#F8F9FA]" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-up`}>
                <div className={`max-w-[85%] p-3 md:p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                  msg.type === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 rounded-tl-none border border-gray-200'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fade-up">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm flex space-x-2">
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 shrink-0">
            {step !== 'contact' && step !== 'success' && (
              <form onSubmit={handleSend} className="flex items-center space-x-2">
                <input 
                  autoFocus
                  className="flex-1 h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900"
                  placeholder="Javobingizni yozing..."
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                />
                <button 
                  type="submit" 
                  disabled={!inputValue.trim()} 
                  className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center disabled:opacity-50 transition-all hover:bg-blue-700 active:scale-95 shrink-0"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            )}

            {step === 'contact' && (
              <form onSubmit={handleContactSubmit} className="space-y-3 animate-fade-up">
                <input 
                  required 
                  className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 text-slate-900" 
                  placeholder="Ismingiz" 
                  value={data.name} 
                  onChange={e => setData({...data, name: e.target.value})} 
                />
                <input 
                  required 
                  type="tel" 
                  className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 text-slate-900" 
                  placeholder="+998" 
                  value={data.phone} 
                  onChange={e => setData({...data, phone: e.target.value})} 
                />
                
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold text-center">
                    {errorMsg}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center"
                >
                  {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : "YUBORISH"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIConsultant;
