import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Library, Layers, CreditCard, Gem, Settings, Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabase';


interface UserProfile {
  email: string | undefined;
  name: string;
  initial: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Compass, label: 'Discover', path: '/discover' },
    { icon: Library, label: 'Library', path: '/library' },
    { icon: Layers, label: 'Tech Stack', path: '/tech-stack' },
    { icon: CreditCard, label: 'Subscriptions', path: '/subscriptions' },
    { icon: Gem, label: 'Rewards Hub', path: '/' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];


  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
       
            const metadataName = user.user_metadata?.full_name || user.user_metadata?.name || 'User';

            console.log(user);
            
            
            setUserProfile({
                email: user.email,
                name: metadataName,
            
                initial: metadataName.charAt(0).toUpperCase()
            });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    getUser();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white z-40 px-4 py-3 flex items-center justify-between shadow-sm">
        <img src="https://app.flowvahub.com/assets/flowva_logo-xVpZI3-U.png" className='w-24' alt="Flowva Logo" />
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden glass"
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-[15rem] bg-white flex flex-col justify-between py-6 px-4 border-r border-gray-100 z-50
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        <div>
          {/* Logo & Close Button Row */}
          <div className="flex items-center justify-between mb-10 px-2">
            <img src="https://app.flowvahub.com/assets/flowva_logo-xVpZI3-U.png" className='w-32' alt="Flowva Logo" />
            
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-gray-500 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-3">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)} 
                className={({ isActive }) => `
                  w-full flex items-center gap-4 px-4 py-2.5 rounded-lg text-base transition-all duration-200
                  ${isActive 
                    ? 'bg-[#EBDDFF] text-purple-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      size={22}
                      strokeWidth={2.5}
                      className={isActive ? 'text-purple-600' : 'text-gray-500'}
                    />
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>


        <div className="pt-4 mt-auto">
          <div className="w-full h-px bg-gray-200 mb-6"></div>
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-[#009CA6] rounded-full flex items-center justify-center text-white text-lg font-medium shrink-0">
              {userProfile ? userProfile.initial : 'G'}
            </div>
            <div className="text-sm overflow-hidden">
              <p className="font-bold text-gray-900 leading-none mb-1">
                {userProfile ? userProfile.name : 'Guest'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {userProfile ? userProfile.email : 'Please log in'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 lg:p-6 pt-20 md:pt-8 w-full">
        {children}
      </main>
    </div>
  );
}