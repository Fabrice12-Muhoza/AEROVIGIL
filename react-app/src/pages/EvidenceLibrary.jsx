// src/pages/EvidenceLibrary.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  PlayIcon,
  DocumentArrowDownIcon,
  EyeIcon,
  ShareIcon,
} from '@heroicons/react/outline';

const EvidenceLibrary = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const evidenceItems = [
    {
      id: 1,
      vehicleId: '101',
      plate: 'RAB123',
      violationType: 'Moving Violation',
      timestamp: '2026-01-06 08:12:45',
      duration: '45s',
      size: '12.4 MB',
      hash: 'af23d4f67bc...',
      status: 'Processed',
      thumbnail: 'https://via.placeholder.com/300x150/3b82f6/ffffff?text=Vehicle+RAB123',
    },
    {
      id: 2,
      vehicleId: '102',
      plate: 'RACS67',
      violationType: 'Stopped in No-Stop Zone',
      timestamp: '2026-01-06 08:10:30',
      duration: '32s',
      size: '8.7 MB',
      hash: 'be78d9e45cc...',
      status: 'Processed',
      thumbnail: 'https://via.placeholder.com/300x150/ef4444/ffffff?text=Vehicle+RACS67',
    },
    {
      id: 3,
      vehicleId: '103',
      plate: 'RAD891',
      violationType: 'Speeding (85km/h)',
      timestamp: '2026-01-06 08:05:15',
      duration: '28s',
      size: '7.2 MB',
      hash: 'c12a34b56d7...',
      status: 'Processing',
      thumbnail: 'https://via.placeholder.com/300x150/f59e0b/000000?text=Vehicle+RAD891',
    },
    {
      id: 4,
      vehicleId: '104',
      plate: 'RAE234',
      violationType: 'Red Light Violation',
      timestamp: '2026-01-06 07:58:42',
      duration: '51s',
      size: '15.8 MB',
      hash: 'd98e76f54a3...',
      status: 'Processed',
      thumbnail: 'https://via.placeholder.com/300x150/8b5cf6/ffffff?text=Vehicle+RAE234',
    },
    {
      id: 5,
      vehicleId: '105',
      plate: 'RAF567',
      violationType: 'Wrong Way Driving',
      timestamp: '2026-01-06 07:45:20',
      duration: '36s',
      size: '10.3 MB',
      hash: 'e54a3b21c98...',
      status: 'Processed',
      thumbnail: 'https://via.placeholder.com/300x150/10b981/ffffff?text=Vehicle+RAF567',
    },
  ];

  const filteredItems = evidenceItems.filter(item => {
    const matchesSearch = item.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.vehicleId.includes(searchTerm) ||
                         item.violationType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || item.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={logout} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Evidence Library</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage and review all collected evidence</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="relative flex-1 max-w-xl">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by plate, vehicle ID, or violation type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FunnelIcon className="h-5 w-5 text-gray-500" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="processed">Processed</option>
                    <option value="processing">Processing</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-gray-500" />
                  <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last quarter</option>
                    <option>Custom range</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Evidence Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <div className="relative">
                  <img
                    src={item.thumbnail}
                    alt={item.plate}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      item.status === 'Processed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button className="p-1 bg-black/50 rounded backdrop-blur-sm">
                      <PlayIcon className="h-5 w-5 text-white" />
                    </button>
                    <button className="p-1 bg-black/50 rounded backdrop-blur-sm">
                      <EyeIcon className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{item.plate}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Vehicle ID: {item.vehicleId}</p>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                      {item.violationType}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Timestamp</span>
                      <span className="font-mono text-gray-900 dark:text-white">{item.timestamp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Duration</span>
                      <span className="text-gray-900 dark:text-white">{item.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">File Size</span>
                      <span className="text-gray-900 dark:text-white">{item.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Hash</span>
                      <span className="font-mono text-gray-900 dark:text-white truncate">{item.hash}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                    <button className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                      <DocumentArrowDownIcon className="h-4 w-4" />
                      <span className="text-sm">Download</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
                      <ShareIcon className="h-4 w-4" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No evidence found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EvidenceLibrary;