// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  BellAlertIcon,
  ExclamationTriangleIcon,
  FolderIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', icon: HomeIcon, label: 'Dashboard' },
    { path: '/dashboard/alerts', icon: BellAlertIcon, label: 'Live Alerts' },
    { path: '/dashboard/violations', icon: ExclamationTriangleIcon, label: 'Violations' },
    { path: '/evidence', icon: FolderIcon, label: 'Evidence Library' },
    { path: '/reports', icon: ChartBarIcon, label: 'Reports' },
    { path: '/settings', icon: Cog6ToothIcon, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-md shadow"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 fixed lg:static top-0 left-0 
        w-64 h-full bg-white dark:bg-gray-800 
        border-r border-gray-200 dark:border-gray-700 
        z-40 transition-transform duration-300 ease-in-out
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">AEROVIGIL</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Traffic Monitoring System</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-3 rounded-lg
                  transition-colors duration-200
                  ${isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">AD</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;