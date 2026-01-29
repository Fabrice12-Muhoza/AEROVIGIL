// src/pages/Settings.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import {
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  VideoCameraIcon,
  UserCircleIcon,
  KeyIcon,
  GlobeAltIcon,
  DatabaseIcon,
} from '@heroicons/react/outline';

const Settings = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    autoGenerateReports: false,
    videoQuality: 'high',
    dataRetention: 30,
    darkMode: false,
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Cog6ToothIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
    { id: 'cameras', label: 'Cameras', icon: VideoCameraIcon },
    { id: 'storage', label: 'Storage', icon: DatabaseIcon },
    { id: 'users', label: 'Users', icon: UserCircleIcon },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={logout} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Configure system preferences and settings</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Settings Sidebar */}
            <div className="lg:w-64">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Settings Categories</h3>
                  <nav className="space-y-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <tab.icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="flex-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
                <div className="p-6">
                  {/* General Settings */}
                  {activeTab === 'general' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">General Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-sm font-medium text-gray-900 dark:text-white">
                                Dark Mode
                              </label>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Switch between light and dark themes
                              </p>
                            </div>
                            <button
                              onClick={() => handleSettingChange('darkMode', !settings.darkMode)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                settings.darkMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                  settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                              Language
                            </label>
                            <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <option>English</option>
                              <option>French</option>
                              <option>Spanish</option>
                              <option>Arabic</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                              Time Zone
                            </label>
                            <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <option>UTC (Coordinated Universal Time)</option>
                              <option>EST (Eastern Standard Time)</option>
                              <option>CST (Central Standard Time)</option>
                              <option>PST (Pacific Standard Time)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications Settings */}
                  {activeTab === 'notifications' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Settings</h3>
                      
                      <div className="space-y-4">
                        {[
                          { id: 'notifications', label: 'Enable Notifications', description: 'Receive system notifications' },
                          { id: 'emailAlerts', label: 'Email Alerts', description: 'Send violation alerts via email' },
                          { id: 'pushNotifications', label: 'Push Notifications', description: 'Receive push notifications on mobile' },
                          { id: 'autoGenerateReports', label: 'Auto Generate Reports', description: 'Automatically generate daily reports' },
                        ].map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div>
                              <label className="text-sm font-medium text-gray-900 dark:text-white">
                                {item.label}
                              </label>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {item.description}
                              </p>
                            </div>
                            <button
                              onClick={() => handleSettingChange(item.id, !settings[item.id])}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                settings[item.id] ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                  settings[item.id] ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Security Settings */}
                  {activeTab === 'security' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security Settings</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Password</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Current Password
                              </label>
                              <input
                                type="password"
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                New Password
                              </label>
                              <input
                                type="password"
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Confirm New Password
                              </label>
                              <input
                                type="password"
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h4>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-900 dark:text-white">Enable 2FA</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                              Enable
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Camera Settings */}
                  {activeTab === 'cameras' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Camera Settings</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Video Quality
                          </label>
                          <select
                            value={settings.videoQuality}
                            onChange={(e) => handleSettingChange('videoQuality', e.target.value)}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="low">Low (480p)</option>
                            <option value="medium">Medium (720p)</option>
                            <option value="high">High (1080p)</option>
                            <option value="ultra">Ultra (4K)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Frame Rate (FPS)
                          </label>
                          <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>15 FPS</option>
                            <option>24 FPS</option>
                            <option>30 FPS</option>
                            <option>60 FPS</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Recording Duration
                          </label>
                          <div className="flex items-center space-x-4">
                            <input
                              type="range"
                              min="5"
                              max="60"
                              value="30"
                              className="w-full"
                            />
                            <span className="text-sm text-gray-900 dark:text-white">30 seconds</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-end space-x-4">
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;