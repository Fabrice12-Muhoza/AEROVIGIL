// src/pages/Reports.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import {
  DocumentChartBarIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
  EyeIcon,
} from '@heroicons/react/outline';

const Reports = () => {
  const { user, logout } = useAuth();
  const [reportType, setReportType] = useState('daily');

  const reports = [
    {
      id: 1,
      title: 'Daily Violation Summary',
      type: 'daily',
      date: '2026-01-06',
      generatedBy: 'System Auto',
      size: '2.4 MB',
      downloads: 42,
      status: 'Ready',
    },
    {
      id: 2,
      title: 'Weekly Analysis Report',
      type: 'weekly',
      date: '2026-01-01 to 2026-01-07',
      generatedBy: 'Admin User',
      size: '5.7 MB',
      downloads: 18,
      status: 'Ready',
    },
    {
      id: 3,
      title: 'Monthly Compliance Report',
      type: 'monthly',
      date: 'December 2025',
      generatedBy: 'System Auto',
      size: '12.3 MB',
      downloads: 9,
      status: 'Ready',
    },
    {
      id: 4,
      title: 'Quarterly Performance Review',
      type: 'quarterly',
      date: 'Q4 2025',
      generatedBy: 'System Auto',
      size: '18.9 MB',
      downloads: 5,
      status: 'Processing',
    },
    {
      id: 5,
      title: 'Camera Performance Report',
      type: 'equipment',
      date: '2026-01-06',
      generatedBy: 'Technical Team',
      size: '3.2 MB',
      downloads: 23,
      status: 'Ready',
    },
    {
      id: 6,
      title: 'Traffic Pattern Analysis',
      type: 'analysis',
      date: 'December 2025',
      generatedBy: 'Analytics Team',
      size: '8.5 MB',
      downloads: 31,
      status: 'Ready',
    },
  ];

  const filteredReports = reportType === 'all' 
    ? reports 
    : reports.filter(report => report.type === reportType);

  const stats = {
    totalReports: reports.length,
    readyReports: reports.filter(r => r.status === 'Ready').length,
    totalDownloads: reports.reduce((sum, r) => sum + r.downloads, 0),
    averageSize: (reports.reduce((sum, r) => sum + parseFloat(r.size), 0) / reports.length).toFixed(1),
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={logout} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
            <p className="text-gray-600 dark:text-gray-400">Generate and manage system reports</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Reports</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalReports}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <DocumentChartBarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ready to Download</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.readyReports}</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <ArrowDownTrayIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Downloads</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalDownloads}</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <EyeIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Size</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageSize} MB</p>
                </div>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <CalendarIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Report Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Report Type:</span>
                <div className="flex flex-wrap gap-2">
                  {['all', 'daily', 'weekly', 'monthly', 'quarterly', 'equipment', 'analysis'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setReportType(type)}
                      className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                        reportType === type
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Generate New Report
              </button>
            </div>
          </div>

          {/* Reports Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Report Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date Range
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Downloads
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {report.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Generated by: {report.generatedBy}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 capitalize">
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {report.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {report.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{report.downloads}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          report.status === 'Ready'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                            <ArrowDownTrayIcon className="h-5 w-5" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                            <PrinterIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;