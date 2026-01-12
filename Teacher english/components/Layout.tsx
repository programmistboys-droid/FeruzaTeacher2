
import React from 'react';
import { Home, Book, BrainCircuit, User, Bell } from 'lucide-react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  labels: {
    home: string;
    slovar: string;
    test: string;
    profile: string;
  };
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, labels }) => {
  const navItems = [
    { id: AppTab.HOME, icon: Home, label: labels.home },
    { id: AppTab.SLOVAR, icon: Book, label: labels.slovar },
    { id: AppTab.TEST, icon: BrainCircuit, label: labels.test },
    { id: AppTab.PROFILE, icon: User, label: labels.profile },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#fcfcfc] text-[#1c1c1c] max-w-md mx-auto shadow-2xl relative overflow-hidden">
      <header className="bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-gray-100 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <span className="text-[10px] font-black">FT</span>
          </div>
          <h1 className="text-lg font-black tracking-tight text-gray-800 italic">Feruza Teacher</h1>
        </div>
        <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
          <Bell size={20} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-28 bg-[#fdfdfd]">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-2xl border-t border-gray-100 px-6 py-4 flex justify-between items-center z-20 pb-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              activeTab === item.id ? 'text-indigo-600' : 'text-gray-300'
            }`}
          >
            <div className={`p-2 rounded-2xl transition-all ${activeTab === item.id ? 'bg-indigo-50 shadow-inner scale-110' : 'hover:bg-gray-50'}`}>
               <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
