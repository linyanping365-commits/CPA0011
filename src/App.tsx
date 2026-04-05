/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Settings, 
  CircleDollarSign, 
  List, 
  Settings2, 
  Video, 
  Bell, 
  Info,
  Menu,
  Maximize2,
  User,
  ChevronDown,
  Minus,
  X,
  UserCircle2,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { cn } from './lib/utils';

// Mock data for the chart
const chartData = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i).padStart(2, '0')}:00`,
  clicks: 0,
  conversions: 0,
  payout: 0,
}));

const SidebarItem = ({ icon: Icon, active = false }: { icon: any, active?: boolean }) => (
  <div className={cn(
    "p-3 cursor-pointer transition-colors hover:bg-white/10 flex items-center justify-center",
    active ? "bg-white/10 border-l-4 border-white" : ""
  )}>
    <Icon className="w-5 h-5 text-gray-400" />
  </div>
);

const StatCard = ({ title, approved, pending, color }: { title: string, approved: string, pending: string, color: string }) => (
  <div className="bg-white rounded-sm shadow-sm overflow-hidden flex-1 min-w-[250px]">
    <div className={cn("h-10 flex items-center justify-center text-white font-medium", color)}>
      {title}
    </div>
    <div className="p-4 flex justify-between text-center">
      <div className="flex-1 border-r border-gray-100">
        <p className="text-xs text-gray-500 mb-1">Approved Income</p>
        <p className="text-sm font-semibold text-gray-700">{approved}</p>
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-500 mb-1">Pending Income</p>
        <p className="text-sm font-semibold text-gray-700">{pending}</p>
      </div>
    </div>
  </div>
);

const ProfileCard = ({ 
  title, 
  avatar, 
  name, 
  role, 
  email, 
  skype, 
  gradient 
}: { 
  title?: string, 
  avatar?: string, 
  name: string, 
  role?: string, 
  email?: string, 
  skype?: string, 
  gradient: string 
}) => (
  <div className={cn("rounded-md p-6 text-white text-center shadow-md relative overflow-hidden", gradient)}>
    <div className="relative z-10 flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4 border-4 border-white/30">
        <UserCircle2 className="w-12 h-12 text-white/80" />
      </div>
      <h3 className="text-lg font-bold mb-1">{name}</h3>
      {role && (
        <div className="bg-white/20 px-3 py-0.5 rounded-full text-xs font-medium mb-2 flex items-center gap-1">
          <User className="w-3 h-3" /> {role}
        </div>
      )}
      {title && <p className="text-sm opacity-90 mb-2">{title}</p>}
      {email && <p className="text-xs opacity-80 mb-1">@ {email}</p>}
      {skype && (
        <div className="flex items-center gap-1 text-xs opacity-80">
          <span className="bg-white rounded-full p-0.5"><Video className="w-2 h-2 text-blue-500" /></span>
          {skype}
        </div>
      )}
    </div>
  </div>
);

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) + ' at ' + currentTime.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }) + ' UTC +00:00';

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-16 bg-[#2c3e50] flex flex-col items-stretch z-20">
        <div className="h-16 bg-[#1a252f] flex items-center justify-center">
          <div className="bg-white/20 px-2 py-1 rounded text-[10px] font-black text-white tracking-tighter">LOGO</div>
        </div>
        <SidebarItem icon={Home} active />
        <SidebarItem icon={Settings} />
        <SidebarItem icon={CircleDollarSign} />
        <SidebarItem icon={List} />
        <SidebarItem icon={Settings2} />
        <SidebarItem icon={Video} />
        <SidebarItem icon={Bell} />
        <SidebarItem icon={Info} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-[#f39c12] flex items-center justify-between px-6 text-white shadow-md z-10">
          <div className="flex items-center gap-6">
            <Menu className="w-6 h-6 cursor-pointer" />
            <Maximize2 className="w-5 h-5 cursor-pointer" />
            <div className="flex flex-col">
              <span className="text-[10px] opacity-80 uppercase font-bold tracking-wider">Current Panel Time:</span>
              <span className="text-sm font-medium italic flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formattedTime}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 px-2 py-1 rounded cursor-pointer">
              <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-5 h-3" />
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center border-2 border-white/50 cursor-pointer">
              <User className="w-6 h-6" />
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Stats Row */}
          <div className="flex flex-wrap gap-6">
            <StatCard 
              title="Today" 
              approved="$ 0.00" 
              pending="$ 0.00" 
              color="bg-[#3498db]" 
            />
            <StatCard 
              title="Yesterday" 
              approved="$ 0.00" 
              pending="$ 0.00" 
              color="bg-[#6c5ce7]" 
            />
            <StatCard 
              title="Month" 
              approved="$ 0.00" 
              pending="$ 0.00" 
              color="bg-[#a29bfe]" 
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chart Section */}
            <div className="lg:col-span-3 bg-white rounded-sm shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-gray-600 font-medium">Summary</h2>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 pr-8 text-sm text-gray-600 focus:outline-none">
                      <option>Today</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Minus className="w-4 h-4 cursor-pointer" />
                  <Maximize2 className="w-4 h-4 cursor-pointer" />
                  <X className="w-4 h-4 cursor-pointer" />
                </div>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-4 gap-4 mb-8 text-center">
                <div>
                  <p className="text-sm text-red-500 mb-1">Approved Income</p>
                  <p className="text-lg font-bold text-red-500">$ 0.00</p>
                </div>
                <div>
                  <p className="text-sm text-yellow-500 mb-1">Pending Income</p>
                  <p className="text-lg font-bold text-yellow-500">$ 0.00</p>
                </div>
                <div>
                  <p className="text-sm text-green-500 mb-1">Conversions</p>
                  <p className="text-lg font-bold text-green-500">0</p>
                </div>
                <div>
                  <p className="text-sm text-cyan-500 mb-1">Clicks</p>
                  <p className="text-lg font-bold text-cyan-500">0</p>
                </div>
              </div>

              {/* Chart */}
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="#eee" />
                    <XAxis 
                      dataKey="time" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#999' }}
                      interval={2}
                    />
                    <YAxis 
                      yAxisId="left"
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#999' }}
                      domain={[0, 100]}
                    />
                    <YAxis 
                      yAxisId="right1"
                      orientation="left"
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#999' }}
                      domain={[0, 10]}
                      dx={-20}
                    />
                    <YAxis 
                      yAxisId="right2"
                      orientation="left"
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#999' }}
                      domain={[0, 10]}
                      dx={-40}
                    />
                    <Tooltip />
                    <Legend 
                      verticalAlign="top" 
                      align="center" 
                      iconType="rect" 
                      wrapperStyle={{ paddingTop: '0px', paddingBottom: '20px' }}
                    />
                    <Bar yAxisId="left" dataKey="clicks" name="Clicks" fill="#c8e6c9" barSize={8} />
                    <Bar yAxisId="right1" dataKey="conversions" name="Conversions" fill="#a5d6a7" barSize={8} />
                    <Bar yAxisId="right2" dataKey="payout" name="Payout" fill="#f06292" barSize={8} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Sidebar Widgets */}
            <div className="space-y-6">
              <ProfileCard 
                name="2573838961@qq.com"
                role="publisher"
                title="Not Mentioned"
                gradient="bg-gradient-to-br from-[#4b6cb7] to-[#182848]"
              />
              <ProfileCard 
                name="Manager"
                title="erqiang"
                email="heatherann_w@hotmail.com"
                skype="live:.cid.83138053aeeb3f0a"
                gradient="bg-gradient-to-br from-[#a29bfe] to-[#fd79a8]"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
