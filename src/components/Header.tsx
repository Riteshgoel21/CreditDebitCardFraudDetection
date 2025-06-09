import React from 'react';
import { Bell, Menu, Search, X } from 'lucide-react';

const Header: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [notifications] = React.useState([
    {
      id: 1,
      title: 'High-risk transaction detected',
      description: 'Transaction #4592 has a fraud score of 89%',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      title: 'Multiple transactions from unusual location',
      description: 'Customer ID #387 has 5 transactions from 3 different countries',
      time: '15 minutes ago',
      read: false
    },
    {
      id: 3,
      title: 'New fraud pattern identified',
      description: 'ML model has detected a new pattern affecting Visa cards',
      time: '1 hour ago',
      read: true
    }
  ]);

  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center md:hidden">
          <button 
            type="button"
            className="text-gray-400 hover:text-white"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <div className="max-w-lg w-full lg:max-w-xs mx-4 hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-700 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Search transactions..."
              type="search"
            />
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="relative">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-white relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-900"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-700">
                <div className="px-4 py-2 border-b border-gray-700">
                  <h3 className="text-sm font-medium">Notifications</h3>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-700 transition-colors ${notification.read ? '' : 'border-l-2 border-blue-500'}`}
                    >
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-700">
                  <button className="text-xs text-blue-500 hover:text-blue-400">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showMobileMenu && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600">
              Dashboard
            </a>
            <a href="/transactions" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
              Transactions
            </a>
            <a href="/analytics" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
              Analytics
            </a>
            <a href="/settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
              Settings
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;