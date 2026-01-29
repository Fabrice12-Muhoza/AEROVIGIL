// src/components/LiveAlertsTable.jsx
import React, { useState } from 'react';
import { PlayIcon, EyeIcon } from '@heroicons/react/24/outline';

const LiveAlertsTable = ({ alerts, onSelectVehicle }) => {
  const [filter, setFilter] = useState('all');
const EyeIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
  const mockAlerts = [
    { id: 101, plate: 'RAB123', status: 'moving', timestamp: '2026-01-06 08:12:45', camera: 'CAM-001', location: 'Intersection A', confidence: 95 },
    { id: 102, plate: 'RACS67', status: 'stopped', timestamp: '2026-01-06 08:10:30', camera: 'CAM-002', location: 'Highway B', confidence: 87 },
    { id: 103, plate: 'RAD891', status: 'speeding', timestamp: '2026-01-06 08:05:15', camera: 'CAM-003', location: 'Street C', confidence: 92 },
    { id: 104, plate: 'RAE234', status: 'moving', timestamp: '2026-01-06 07:58:42', camera: 'CAM-001', location: 'Intersection A', confidence: 78 },
    { id: 105, plate: 'RAF567', status: 'stopped', timestamp: '2026-01-06 07:45:20', camera: 'CAM-004', location: 'Bridge D', confidence: 85 },
  ];

  const filteredAlerts = filter === 'all' 
    ? mockAlerts 
    : mockAlerts.filter(alert => alert.status === filter);

  const getStatusColor = (status) => {
    switch(status) {
      case 'moving': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'stopped': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'speeding': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'moving': return '🚗';
      case 'stopped': return '🛑';
      case 'speeding': return '⚡';
      default: return '🚘';
    }
  };

  return (
    <div>
      {/* Filters */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {['all', 'moving', 'stopped', 'speeding'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${filter === status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              >
                {status}
              </button>
            ))}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredAlerts.length} alerts
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px 6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Camera
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredAlerts.map((alert) => (
              <tr 
                key={alert.id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => onSelectVehicle(alert.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">{getStatusIcon(alert.status)}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {alert.plate}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {alert.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(alert.status)}`}>
                    {alert.status.toUpperCase()}
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {alert.confidence}% confidence
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{alert.camera}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{alert.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {alert.timestamp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectVehicle(alert.id);
                      }}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      title="View Evidence"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                      title="Play Video"
                    >
                      <PlayIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveAlertsTable;