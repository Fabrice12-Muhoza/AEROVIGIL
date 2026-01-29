// src/components/Header.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BellIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const Header = ({ user, onLogout }) => {
  const [notifications] = useState([
    { id: 1, message: 'New violation detected: Vehicle RAB123', time: '2 min ago', read: false },
    { id: 2, message: 'Camera 3 is offline', time: '1 hour ago', read: true },
    { id: 3, message: 'System update completed', time: '2 hours ago', read: true },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex-1">
            <div className="max-w-xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search vehicles, plates, violations..."
                />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Date and Time */}
            <div className="hidden md:block">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {format(new Date(), 'EEEE, MMMM d, yyyy')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(), 'hh:mm:ss a')}
                </p>
              </div>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 relative"
              >
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                      >
                        <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 text-center">
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-3"
              >
                <UserCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.role || 'Administrator'}
                  </p>
                </div>
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.email || 'admin@aerovigil.com'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Last login: Today
                    </p>
                  </div>
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Profile Settings
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      System Preferences
                    </button>
                    <button
                      onClick={onLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;