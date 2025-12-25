import React from 'react';
import { Home, Compass, Library, Layers, CreditCard, Gem, Settings } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white fixed h-full hidden md:flex flex-col justify-between py-6 px-4 shadow-[1px_0_20px_rgba(0,0,0,0.02)]">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10 px-2">
           <img src="https://app.flowvahub.com/assets/flowva_logo-xVpZI3-U.png" className='w-32' alt="Flowva Logo" />
          </div>
          
          {/* Navigation */}
          <nav className="space-y-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-xl text-base  transition-all duration-200 ${
                  item.active 
                    ? 'bg-[#EBDDFF] text-purple-700 ' 
                    : 'text-black hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
            
                <item.icon 
                  size={22} 
                  strokeWidth={2.5}
                  className={item.active ? 'text-purple-600' : 'text-black'} 
                />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        
        {/* User Profile at Bottom */}
        <div className="pt-4 mt-auto">
          <div className="w-full h-px bg-gray-200 mb-6"></div> {/* Divider Line */}
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

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
}