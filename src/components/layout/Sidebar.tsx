'use client';

import { Shield, Activity, Database, Settings, AlertTriangle, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Threat Overview', href: '/', icon: Shield },
  { name: 'AI Analytics', href: '/analytics', icon: Activity },
  { name: 'Fusion Center', href: '/fusion', icon: Users },
  { name: 'Auto Response', href: '/response', icon: AlertTriangle },
  { name: 'Compliance', href: '/compliance', icon: Database },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r border-[#1a1a1a] bg-[#0d0d0d] text-[#00ff41]">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-[#1a1a1a] bg-[#000000] px-4">
        <Shield className="h-8 w-8 text-[#00ff41] drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]" />
        <span className="ml-2 text-xl font-bold tracking-wider text-[#00ff41] font-mono">NCTIRS</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center rounded-none border-l-2 px-3 py-2 text-sm font-medium transition-all duration-200 ${isActive
                  ? 'border-[#00ff41] bg-[#00ff41]/10 text-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.2)]'
                  : 'border-transparent text-[#4d4d4d] hover:bg-[#1a1a1a] hover:text-[#00ff41] hover:border-[#00ff41]/50'
                }`}
            >
              <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-[#00ff41]' : ''}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-[#1a1a1a] bg-[#000000] p-4">
        <div className="text-xs font-mono">
          <div className="font-semibold text-[#00ff41]">National Intelligence Service</div>
          <div className="mt-1 text-[#4d4d4d]">Kenya Cyber Defense</div>
          <div className="mt-3 flex items-center space-x-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.8)]"></div>
            <span className="text-[#00ff41] font-medium tracking-widest">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
