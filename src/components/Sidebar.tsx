import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  BarChart3, 
  Settings, 
  ShieldAlert,
  Search
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/verify', icon: <Search size={20} />, label: 'Verify Card' },
    { path: '/transactions', icon: <CreditCard size={20} />, label: 'Transactions' },
    { path: '/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 hidden md:flex flex-col">
      <div className="p-4 border-b border-gray-700 flex items-center space-x-2">
        <ShieldAlert className="h-8 w-8 text-blue-500" />
        <span className="text-xl font-bold">FraudGuard AI</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="font-bold">RG</span>
          </div>
          <div>
            <p className="text-sm font-medium">Ritesh Goel</p>
            <p className="text-xs text-gray-400">Security Analyst</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;