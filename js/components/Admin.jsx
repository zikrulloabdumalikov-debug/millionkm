import React from 'react';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { getApp } from "firebase/app";

// --- ADMIN COMPONENT ---
const Admin = ({ orders }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterType, setFilterType] = React.useState('all');
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const uniqueClients = new Set(orders.map(o => o.phone)).size;
  const totalOrders = orders.length;
  
  const todayStr = new Date().toLocaleDateString('uz-UZ');
  const todayOrders = orders.filter(o => o.timestamp.includes(todayStr)).length;

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.phone.includes(searchTerm) ||
      order.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || order.serviceType === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const serviceTypes = Array.from(new Set(orders.map(o => o.serviceType)));

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
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
        <div className="lg:col-span-3 space-y-8">
          {/* Filters & Search */}
          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 card-shadow flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"></i>
              <input 
                type="text" 
                placeholder="Mijoz, telefon yoki mashina bo'yicha qidirish..." 
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 font-semibold text-slate-900 transition-all outline-none text-sm"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 font-bold text-slate-900 transition-all outline-none text-sm appearance-none cursor-pointer"
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
            >
              <option value="all">Barcha xizmatlar</option>
              {serviceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 card-shadow overflow-hidden">
            <div className="p-10 border-b border-slate-50 flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center">
                <i className="fas fa-stream mr-4 text-blue-600 opacity-50"></i> So'rovlar ro'yxati
              </h2>
              <span className="text-xs font-bold text-slate-400">{filteredOrders.length} ta natija</span>
            </div>
            
            <div className="overflow-x-auto">
              {filteredOrders.length === 0 ? (
                <div className="py-32 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl mx-auto mb-6 flex items-center justify-center text-slate-200">
                    <i className="fas fa-inbox text-2xl"></i>
                  </div>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Natija topilmadi</p>
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
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
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
                          <button 
                            onClick={() => setSelectedOrder(order)}
                            className="w-10 h-10 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all ml-auto"
                          >
                            <i className="fas fa-eye text-xs"></i>
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

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[3rem] p-12 w-full max-w-2xl shadow-2xl relative animate-in zoom-in duration-300">
            <button onClick={() => setSelectedOrder(null)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-colors">
              <i className="fas fa-times text-2xl"></i>
            </button>
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Buyurtma tafsilotlari</div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-10">ID: #{selectedOrder.id}</h2>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Mijoz ma'lumotlari</span>
                  <div className="text-lg font-extrabold text-slate-900">{selectedOrder.userName}</div>
                  <div className="text-blue-600 font-bold">{selectedOrder.phone}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Avtomobil</span>
                  <div className="text-lg font-extrabold text-slate-900">{selectedOrder.brand} {selectedOrder.model}</div>
                  <div className="text-slate-500 font-medium">{selectedOrder.carYear ? `${selectedOrder.carYear}-yil` : 'Yili noma\'lum'}</div>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Xizmat turi</span>
                  <div className="inline-block px-4 py-1.5 bg-slate-100 text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest">
                    {selectedOrder.serviceType}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Vaqti</span>
                  <div className="text-slate-900 font-bold">{selectedOrder.timestamp}</div>
                </div>
              </div>
            </div>

            {selectedOrder.note && (
              <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Izoh</span>
                <p className="text-slate-700 font-medium leading-relaxed">{selectedOrder.note}</p>
              </div>
            )}

            <div className="mt-12 flex gap-4">
              <button className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-slate-100">
                Mijoz bilan bog'lanish
              </button>
              <button className="flex-1 py-5 bg-green-600 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-green-700 transition-all shadow-xl shadow-green-100">
                Bajarildi deb belgilash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- ADMIN CHECK WRAPPER ---
export const AdminCheck = ({ orders, currentUser, showToast, setCurrentView }) => {
  const [isVerifying, setIsVerifying] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const verify = async () => {
      if (!currentUser?.uid) {
        setCurrentView('home');
        return;
      }
      try {
        const db = getFirestore(getApp());
        // uid field bo'yicha qidir — document ID emas!
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', '==', currentUser.uid));
        const snapshot = await getDocs(q);

        if (!snapshot.empty && snapshot.docs[0].data().isAdmin === true) {
          setIsAdmin(true);
        } else {
          showToast("Ruxsat yo'q! Siz admin emassiz.", "error");
          setCurrentView('home');
        }
      } catch (e) {
        console.error("Admin verification error:", e);
        showToast("Xavfsizlik tekshiruvida xatolik", "error");
        setCurrentView('home');
      } finally {
        setIsVerifying(false);
      }
    };
    verify();
  }, [currentUser?.uid, setCurrentView, showToast]);

  if (isVerifying) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Xavfsizlik tekshiruvi...</p>
        </div>
      </div>
    );
  }

  return isAdmin ? <Admin orders={orders} /> : null;
};

export default Admin;
