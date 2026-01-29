// src/components/RecentViolationsTable.jsx
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const RecentViolationsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const violations = [
    { id: 305, vehicleId: 101, plate: 'RAB123', type: 'Moving Violation', timestamp: '2026-01-06 08:12:45', hash: 'af23d4f67bc...', status: 'Confirmed' },
    { id: 304, vehicleId: 102, plate: 'RACS67', type: 'Stopped in No-Stop Zone', timestamp: '2026-01-06 08:10:30', hash: 'be78d9e45cc...', status: 'Confirmed' },
    { id: 303, vehicleId: 103, plate: 'RAD891', type: 'Speeding (85km/h)', timestamp: '2026-01-06 08:05:15', hash: 'c12a34b56d7...', status: 'Pending' },
    { id: 302, vehicleId: 104, plate: 'RAE234', type: 'Red Light Violation', timestamp: '2026-01-06 07:58:42', hash: 'd98e76f54a3...', status: 'Confirmed' },
    { id: 301, vehicleId: 105, plate: 'RAF567', type: 'Wrong Way Driving', timestamp: '2026-01-06 07:45:20', hash: 'e54a3b21c98...', status: 'Under Review' },
    { id: 300, vehicleId: 106, plate: 'RAG890', type: 'Illegal Parking', timestamp: '2026-01-06 07:30:15', hash: 'f67b89c12d3...', status: 'Confirmed' },
    { id: 299, vehicleId: 107, plate: 'RAH123', type: 'No Helmet', timestamp: '2026-01-06 07:15:45', hash: 'g78c90d23e4...', status: 'Confirmed' },
    { id: 298, vehicleId: 108, plate: 'RAI456', type: 'Overspeeding', timestamp: '2026-01-06 07:00:30', hash: 'h89d01e34f5...', status: 'Pending' },
  ];

  const totalPages = Math.ceil(violations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = violations.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Under Review': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Violation Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Hash
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {currentItems.map((violation) => (
              <tr key={violation.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  #{violation.id}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {violation.plate}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    ID: {violation.vehicleId}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{violation.type}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{violation.timestamp}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(violation.status)}`}>
                    {violation.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white font-mono">
                  {violation.hash}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-400">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">{Math.min(startIndex + itemsPerPage, violations.length)}</span> of{' '}
            <span className="font-medium">{violations.length}</span> violations
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentViolationsTable;