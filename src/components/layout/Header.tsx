'use client';

import { Bell, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[#1a1a1a] bg-[#0d0d0d] px-6 shadow-lg">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-[#00ff41] tracking-wide font-mono">
          &gt; National Cyber Threat Intelligence System
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="SEARCH_THREATS_DATABASE..."
            className="w-64 rounded-none border border-[#333] bg-[#000000] px-4 py-2 pl-10 text-sm text-[#00ff41] placeholder-[#003300] focus:border-[#00ff41] focus:outline-none focus:ring-1 focus:ring-[#00ff41]/50 font-mono"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#00ff41]" />
        </div>

        {/* Notifications */}
        <button className="relative rounded-sm p-2 hover:bg-[#1a1a1a]/50 transition-colors border border-transparent hover:border-[#00ff41]/30">
          <Bell className="h-5 w-5 text-[#00ff41]" />
          <span className="absolute right-1 top-1 h-2 w-2 animate-pulse rounded-full bg-[#cc0000] shadow-[0_0_8px_rgba(204,0,0,0.8)]"></span>
        </button>

        {/* User */}
        <button className="flex items-center space-x-2 rounded-none border border-[#333] bg-[#000000] px-3 py-2 hover:bg-[#1a1a1a] hover:border-[#00ff41] transition-all duration-300">
          <User className="h-5 w-5 text-[#00ff41]" />
          <span className="text-sm font-medium text-[#00ff41] font-mono">ANALYST_01</span>
        </button>
      </div>
    </header>
  );
}
