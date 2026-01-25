
import React from 'react';
import { Order } from '../types';

interface AdminProps {
  orders: Order[];
}

const Admin: React.FC<AdminProps> = ({ orders }) => {
  const uniqueClients = new Set(orders.map(o => o.phone)).size;
  const totalOrders = orders.length;
  
  const todayStr = new Date().toLocaleDateString('uz-UZ');
  const todayOrders = orders.filter(o => o.timestamp.includes(todayStr)).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Tizim Boshqaruvi</div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Admin Boshqaruvi</h1>
        </div>
        <div className="flex items-center bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm font-bold text-sm">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse mr-3"></span>
          Jonli monitoring faol
        </div>
      </div>
      
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 card-shadow overflow-hidden">
            <div className="p-10 border-b border-slate-50 flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center">
                <i className="fas fa-stream mr-4 text-blue-600 opacity-50"></i> Oxirgi kelgan so'rovlar
              </h2>
              <span className="text-xs font-bold text-slate-400">{orders.length} ta jami</span>
            </div>
            
            <div className="overflow-x-auto">
              {orders.length === 0 ? (
                <div className="py-32 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl mx-auto mb-6 flex items-center justify-center text-slate-200">
                    <i className="fas fa-inbox text-2xl"></i>
                  </div>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Hozircha buyurtmalar yo'q</p>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-10 py-5 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Mijoz</th>
                      <th className="px-10 py-5 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Transport</th>
                      <th className="px-10 py-5 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Xizmat</th>
                      <th className="px-10 py-5 font-bold text-slate-400 text-[10px] uppercase tracking-widest text-right">Amal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-10 py-6">
                          <div className="font-extrabold text-slate-900 text-sm">{order.userName}</div>
                          <div className="text-[11px] text-blue-600 font-bold mt-1 tracking-wide">{order.phone}</div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="font-bold text-slate-700 text-sm">{order.brand} {order.model}</div>
                          <div className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-tight">{order.timestamp}</div>
                        </td>
                        <td className="px-10 py-6">
                          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest">
                            {order.serviceType}
                          </span>
                        </td>
                        <td className="px-10 py-6 text-right">
                          <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">
                            <i className="fas fa-arrow-right text-xs"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
             <div className="relative z-10 space-y-12">
               <div>
                 <div className="text-white/30 text-[9px] font-bold uppercase tracking-widest mb-4">Jami Mijozlar</div>
                 <div className="text-5xl font-black tracking-tighter">{uniqueClients}</div>
               </div>
               <div>
                 <div className="text-white/30 text-[9px] font-bold uppercase tracking-widest mb-4">Jami Buyurtmalar</div>
                 <div className="text-5xl font-black tracking-tighter">{totalOrders}</div>
               </div>
               <div>
                 <div className="text-white/30 text-[9px] font-bold uppercase tracking-widest mb-4">Bugungi</div>
                 <div className="text-5xl font-black tracking-tighter text-blue-400">{todayOrders}</div>
               </div>
             </div>
             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
           </div>

           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 card-shadow">
              <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-[10px]">Eksport qilish</h3>
              <div className="grid grid-cols-2 gap-4">
                 <button className="p-6 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-all text-center">
                    <i className="fas fa-file-excel text-xl text-slate-300 mb-3 block"></i>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Excel</span>
                 </button>
                 <button className="p-6 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-all text-center">
                    <i className="fas fa-file-pdf text-xl text-slate-300 mb-3 block"></i>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">PDF</span>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
