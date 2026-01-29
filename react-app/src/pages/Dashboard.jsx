// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import LiveAlertsTable from '../components/LiveAlertsTable';
import RecentViolationsTable from '../components/RecentViolationsTable';
import ViolationTypes from '../components/ViolationTypes';
import ViolationsOverviewChart from '../components/ViolationsOverviewChart';
import EvidenceViewer from '../components/EvidenceViewer';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [liveAlerts, setLiveAlerts] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAlerts: 0,
    todayViolations: 0,
    activeCameras: 0
  });

  useEffect(() => {
    fetchDashboardData();
    // Set up WebSocket/SSE for real-time updates
    const eventSource = new EventSource('http://localhost:8000/api/events');
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'new_alert') {
        toast.success(`New alert: ${data.vehicle.plate}`);
        setLiveAlerts(prev => [data.vehicle, ...prev.slice(0, 9)]);
      }
    };

    return () => eventSource.close();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [alertsRes, violationsRes, statsRes] = await Promise.all([
        axios.get('/api/alerts/live'),
        axios.get('/api/violations/recent'),
        axios.get('/api/stats')
      ]);
      
      setLiveAlerts(alertsRes.data);
      setStats(statsRes.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={logout} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Live Alerts</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalAlerts}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Violations</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.todayViolations}</p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.698-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Cameras</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeCameras}</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Alerts</h3>
                    <span className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">LIVE</span>
                    </span>
                  </div>
                </div>
                <LiveAlertsTable 
                  alerts={liveAlerts} 
                  onSelectVehicle={setSelectedVehicle}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Violations</h3>
                  </div>
                  <RecentViolationsTable />
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Violation Types</h3>
                  </div>
                  <ViolationTypes />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Violations Overview</h3>
                </div>
                <div className="p-6">
                  <ViolationsOverviewChart />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Evidence Viewer</h3>
                    {selectedVehicle && (
                      <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                        Vehicle {selectedVehicle}
                      </span>
                    )}
                  </div>
                </div>
                <EvidenceViewer vehicleId={selectedVehicle} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;