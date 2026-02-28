import React from 'react'
import { NavLink } from 'react-router-dom'

const BottomNav = () => {
  // Determine user role from sessionStorage
  // Can be adapted to use AuthContext when implemented
  const getUserRole = () => {
    return sessionStorage.getItem('userRole') || 'user'; // 'user' or 'foodPartner'
  };

  const getProfileRoute = () => {
    if (getUserRole() === 'foodPartner') {
      const foodPartnerId = sessionStorage.getItem('foodPartnerId');
      return foodPartnerId ? `/food-partner/${foodPartnerId}` : '/user-profile';
    }
    return '/user-profile';
  };

  const profileRoute = getProfileRoute();

  return (
    <nav
      className="fixed left-0 right-0 bottom-0 z-50 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-auto animate-in fade-in slide-in-from-bottom-4 duration-500"
      role="navigation"
      aria-label="Bottom Navigation"
    >
      {/* Floating Dock Container */}
      <div className="mx-auto w-full max-w-md md:max-w-[470px] px-4 md:px-0 pb-safe">
        <div className="relative mb-3 overflow-hidden rounded-2xl backdrop-blur-2xl bg-zinc-900/80 border border-zinc-800/50 shadow-2xl shadow-black/40">
          {/* Subtle top glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
          
          {/* Navigation Grid - Now 3 columns */}
          <div className="grid h-16 grid-cols-3 divide-x divide-zinc-800/50">
            
            {/* Home Link */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `group relative flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                  isActive ? 'text-[#bff364]' : 'text-zinc-400 hover:text-zinc-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active Indicator - Top Glow */}
                  {isActive && (
                    <span 
                      className="absolute -top-px left-1/2 h-1 w-12 -translate-x-1/2 rounded-b-full bg-linear-to-b from-[#bff364] to-transparent lime-glow-strong animate-in fade-in zoom-in-95 duration-300" 
                      aria-hidden="true"
                    />
                  )}
                  
                  {/* Icon */}
                  <span className="relative transition-transform duration-300 group-hover:scale-110 group-active:scale-95" aria-hidden="true">
                    {isActive && (
                      <span className="absolute inset-0 -z-10 blur-md bg-[#bff364]/30 rounded-full scale-150" />
                    )}
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill={isActive ? 'currentColor' : 'none'} 
                      stroke="currentColor" 
                      strokeWidth={isActive ? "0" : "2"} 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="drop-shadow-lg"
                    >
                      <path d="M3 10.5 12 3l9 7.5" />
                      <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" />
                    </svg>
                  </span>
                  
                  {/* Label */}
                  <span className="text-[9px] font-bold tracking-widest uppercase">
                    Home
                  </span>
                </>
              )}
            </NavLink>

            {/* Saved Link */}
            <NavLink
              to="/saved"
              className={({ isActive }) =>
                `group relative flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                  isActive ? 'text-[#bff364]' : 'text-zinc-400 hover:text-zinc-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active Indicator - Top Glow */}
                  {isActive && (
                    <span 
                      className="absolute -top-px left-1/2 h-1 w-12 -translate-x-1/2 rounded-b-full bg-linear-to-b from-[#bff364] to-transparent lime-glow-strong animate-in fade-in zoom-in-95 duration-300" 
                      aria-hidden="true"
                    />
                  )}
                  
                  {/* Icon */}
                  <span className="relative transition-transform duration-300 group-hover:scale-110 group-active:scale-95" aria-hidden="true">
                    {isActive && (
                      <span className="absolute inset-0 -z-10 blur-md bg-[#bff364]/30 rounded-full scale-150" />
                    )}
                    <svg 
                      width="22" 
                      height="22" 
                      viewBox="0 0 24 24" 
                      fill={isActive ? 'currentColor' : 'none'} 
                      stroke="currentColor" 
                      strokeWidth={isActive ? "0" : "2"} 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="drop-shadow-lg"
                    >
                      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                    </svg>
                  </span>
                  
                  {/* Label */}
                  <span className="text-[9px] font-bold tracking-widest uppercase">
                    Saved
                  </span>
                </>
              )}
            </NavLink>

            {/* Profile Link - Dynamic based on user role */}
            <NavLink
              to={profileRoute}
              className={({ isActive }) =>
                `group relative flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                  isActive ? 'text-[#bff364]' : 'text-zinc-400 hover:text-zinc-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active Indicator - Top Glow */}
                  {isActive && (
                    <span 
                      className="absolute -top-px left-1/2 h-1 w-12 -translate-x-1/2 rounded-b-full bg-linear-to-b from-[#bff364] to-transparent lime-glow-strong animate-in fade-in zoom-in-95 duration-300" 
                      aria-hidden="true"
                    />
                  )}
                  
                  {/* Icon */}
                  <span className="relative transition-transform duration-300 group-hover:scale-110 group-active:scale-95" aria-hidden="true">
                    {isActive && (
                      <span className="absolute inset-0 -z-10 blur-md bg-[#bff364]/30 rounded-full scale-150" />
                    )}
                    <svg 
                      width="22" 
                      height="22" 
                      viewBox="0 0 24 24" 
                      fill={isActive ? 'currentColor' : 'none'} 
                      stroke="currentColor" 
                      strokeWidth={isActive ? "0" : "2"} 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="drop-shadow-lg"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  
                  {/* Label */}
                  <span className="text-[9px] font-bold tracking-widest uppercase">
                    Profile
                  </span>
                </>
              )}
            </NavLink>
            
          </div>
          
          {/* Bottom subtle shadow */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-zinc-700/30 to-transparent" />
        </div>
      </div>
    </nav>
  )
}

export default BottomNav
