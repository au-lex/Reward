import React, { useState } from 'react';
import { Home, Compass, Library, Layers, CreditCard, Gem, Settings, Menu, X } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', active: false },
    { icon: Compass, label: 'Discover', active: false },
    { icon: Library, label: 'Library', active: false },
    { icon: Layers, label: 'Tech Stack', active: false },
    { icon: CreditCard, label: 'Subscriptions', active: false },
    { icon: Gem, label: 'Rewards Hub', active: true },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans relative">
      

      <div className="md:hidden fixed top-0 left-0 w-full bg-white z-40 px-4 py-3 flex items-center justify-between shadow-sm">
        <img src="https://app.flowvahub.com/assets/flowva_logo-xVpZI3-U.png" className='w-24' alt="Flowva Logo" />
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={24} />
        </button>
      </div>

\
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden glass"
        />
      )}

      {/* 3. Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white flex flex-col justify-between py-6 px-4 border-r border-gray-100 z-50
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        <div>
          {/* Logo & Close Button Row */}
          <div className="flex items-center justify-between mb-10 px-2">
            <img src="https://app.flowvahub.com/assets/flowva_logo-xVpZI3-U.png" className='w-32' alt="Flowva Logo" />
            
            {/* Close Button (Mobile Only) */}
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-gray-500 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-xl text-base transition-all duration-200 ${item.active
                    ? 'bg-[#EBDDFF] text-purple-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <item.icon
                  size={22}
                  strokeWidth={2.5}
                  className={item.active ? 'text-purple-600' : 'text-gray-500'}
                />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* User Profile at Bottom */}
        <div className="pt-4 mt-auto">
          <div className="w-full h-px bg-gray-200 mb-6"></div>
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-[#009CA6] rounded-full flex items-center justify-center text-white text-lg font-medium shrink-0">
              A
            </div>
            <div className="text-sm overflow-hidden">
              <p className="font-bold text-gray-900 leading-none mb-1">Script</p>
              <p className="text-xs text-gray-500 truncate">aulex500@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>

  
      <main className="flex-1 md:ml-64 p-8 pt-20 md:pt-8">
        {children}
      </main>
    </div>
  );
}