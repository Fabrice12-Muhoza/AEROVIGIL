// // src/pages/Dashboard.jsx
// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import Header from '../components/Header';
// import LiveAlertsTable from '../components/LiveAlertsTable';
// import RecentViolationsTable from '../components/RecentViolationsTable';
// import ViolationTypes from '../components/ViolationTypes';
// import ViolationsOverviewChart from '../components/ViolationsOverviewChart';
// import EvidenceViewer from '../components/EvidenceViewer';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const Dashboard = () => {
//   const { user, logout } = useAuth();
//   const [liveAlerts, setLiveAlerts] = useState([]);
//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     totalAlerts: 0,
//     todayViolations: 0,
//     activeCameras: 0
//   });

//   useEffect(() => {
//     fetchDashboardData();
//     // Set up WebSocket/SSE for real-time updates
//     const eventSource = new EventSource('http://localhost:8000/api/events');
    
//     eventSource.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.type === 'new_alert') {
//         toast.success(`New alert: ${data.vehicle.plate}`);
//         setLiveAlerts(prev => [data.vehicle, ...prev.slice(0, 9)]);
//       }
//     };

//     return () => eventSource.close();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const [alertsRes, violationsRes, statsRes] = await Promise.all([
//         axios.get('/api/alerts/live'),
//         axios.get('/api/violations/recent'),
//         axios.get('/api/stats')
//       ]);
      
//       setLiveAlerts(alertsRes.data);
//       setStats(statsRes.data);
//       setLoading(false);
//     } catch (error) {
//       toast.error('Failed to load dashboard data');
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
//       <Sidebar />
      
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header user={user} onLogout={logout} />
        
//         <main className="flex-1 overflow-y-auto p-4 md:p-6">
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border-l-4 border-blue-500">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Live Alerts</p>
//                   <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalAlerts}</p>
//                 </div>
//                 <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                   <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border-l-4 border-red-500">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Violations</p>
//                   <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.todayViolations}</p>
//                 </div>
//                 <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
//                   <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.698-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border-l-4 border-green-500">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Cameras</p>
//                   <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeCameras}</p>
//                 </div>
//                 <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
//                   <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Left Column */}
//             <div className="lg:col-span-2 space-y-6">
//               <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
//                 <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Alerts</h3>
//                     <span className="flex items-center space-x-2">
//                       <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
//                       <span className="text-sm font-medium text-red-600 dark:text-red-400">LIVE</span>
//                     </span>
//                   </div>
//                 </div>
//                 <LiveAlertsTable 
//                   alerts={liveAlerts} 
//                   onSelectVehicle={setSelectedVehicle}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
//                   <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Violations</h3>
//                   </div>
//                   <RecentViolationsTable />
//                 </div>

//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
//                   <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Violation Types</h3>
//                   </div>
//                   <ViolationTypes />
//                 </div>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-6">
//               <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
//                 <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Violations Overview</h3>
//                 </div>
//                 <div className="p-6">
//                   <ViolationsOverviewChart />
//                 </div>
//               </div>

//               <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
//                 <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Evidence Viewer</h3>
//                     {selectedVehicle && (
//                       <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
//                         Vehicle {selectedVehicle}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 <EvidenceViewer vehicleId={selectedVehicle} />
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;






import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import LiveAlertsTable from '../components/LiveAlertsTable';
import RecentViolationsTable from '../components/RecentViolationsTable';
import ViolationTypes from '../components/ViolationTypes';
import ViolationsOverviewChart from '../components/ViolationsOverviewChart';
import EvidenceViewer from '../components/EvidenceViewer';
import CameraStatus from '../components/CameraStatus';
import ActivityFeed from '../components/ActivityFeed';
import { useAuth } from '../context/AuthContext';
import { API, WebSocketService } from '../services/api';
import { toast } from 'react-hot-toast';
import { 
  BellAlertIcon,
  ArrowPathIcon,
 ArrowDownTrayIcon,
  ExclamationTriangleIcon,
  CameraIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalAlerts: 0,
    todayViolations: 0,
    activeCameras: 0,
    resolvedAlerts: 0,
    totalEvidence: 0,
    systemHealth: 100
  });
  const [liveAlerts, setLiveAlerts] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [realtimeConnected, setRealtimeConnected] = useState(false);
  const [activityFeed, setActivityFeed] = useState([]);
  const [cameraStatus, setCameraStatus] = useState([]);
  
  const wsRef = React.useRef(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      
      const [
        statsRes,
        alertsRes,
        activityRes,
        camerasRes,
        violationsRes
      ] = await Promise.all([
        API.dashboard.stats(),
        API.alerts.getLive(),
        API.dashboard.activity(),
        API.cameras.status(),
        API.violations.getRecent(5)
      ]);

      setStats(statsRes.data);
      setLiveAlerts(alertsRes.data);
      setActivityFeed(activityRes.data);
      setCameraStatus(camerasRes.data);
      
      toast.success('Dashboard updated');
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();

    // Setup real-time events
    const eventSource = API.events.stream();
    
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleRealtimeEvent(data);
      } catch (error) {
        console.error('Error parsing event:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('EventSource error:', error);
      setRealtimeConnected(false);
    };

    // Setup WebSocket for video streams
    wsRef.current = new WebSocketService('ws://localhost:8000/ws/dashboard');
    wsRef.current.connect();
    
    wsRef.current.on('connected', () => setRealtimeConnected(true));
    wsRef.current.on('disconnected', () => setRealtimeConnected(false));
    wsRef.current.on('message', handleWebSocketMessage);

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);

    return () => {
      eventSource.close();
      if (wsRef.current) {
        wsRef.current.disconnect();
      }
      clearInterval(interval);
    };
  }, [fetchDashboardData]);

  const handleRealtimeEvent = (data) => {
    switch(data.type) {
      case 'new_alert':
        toast.success(`New alert: ${data.data.plate_number}`);
        setLiveAlerts(prev => [data.data, ...prev.slice(0, 19)]);
        break;
      case 'violation_detected':
        toast.warning(`Violation detected: ${data.data.type}`);
        break;
      case 'camera_status_change':
        setCameraStatus(prev => 
          prev.map(cam => 
            cam.id === data.data.camera_id 
              ? { ...cam, status: data.data.status }
              : cam
          )
        );
        break;
      case 'system_notification':
        toast.info(data.data.message);
        break;
    }
  };

  const handleWebSocketMessage = (data) => {
    // Handle video stream updates
    if (data.type === 'video_update') {
      // Update specific camera feed
    }
  };

  const handleExportData = async () => {
    try {
      const response = await API.alerts.export('csv');
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `alerts_${new Date().toISOString()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Data exported successfully');
    } catch (error) {
      toast.error('Failed to export data');
    }
  };

  const handleAcknowledgeAll = async () => {
    try {
      await Promise.all(
        liveAlerts.filter(alert => !alert.acknowledged).map(alert => 
          API.alerts.acknowledge(alert.id)
        )
      );
      
      setLiveAlerts(prev => 
        prev.map(alert => ({ ...alert, acknowledged: true }))
      );
      
      toast.success('All alerts acknowledged');
    } catch (error) {
      toast.error('Failed to acknowledge alerts');
    }
  };

  if (loading && liveAlerts.length === 0) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <div className="m-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={logout} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
              <div className="flex items-center space-x-2 mt-2">
                <div className={`w-2 h-2 rounded-full ${realtimeConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {realtimeConnected ? 'Real-time connected' : 'Realtime disconnected'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <button
                onClick={fetchDashboardData}
                disabled={loading}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                <ArrowPathIcon className="h-4 w-4" />
                <span>Refresh</span>
              </button>
              
              <button
                onClick={handleExportData}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center space-x-2"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span>Export Data</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              {
                title: 'Live Alerts',
                value: stats.totalAlerts,
                icon: BellAlertIcon,
                color: 'from-blue-500 to-blue-600',
                bgColor: 'bg-blue-50 dark:bg-blue-900/20',
                trend: '+12%'
              },
              {
                title: "Today's Violations",
                value: stats.todayViolations,
                icon: ExclamationTriangleIcon,
                color: 'from-red-500 to-red-600',
                bgColor: 'bg-red-50 dark:bg-red-900/20',
                trend: '+8%'
              },
              {
                title: 'Active Cameras',
                value: stats.activeCameras,
                icon: CameraIcon,
                color: 'from-green-500 to-green-600',
                bgColor: 'bg-green-50 dark:bg-green-900/20',
                trend: `${cameraStatus.filter(c => c.status === 'active').length}/${cameraStatus.length}`
              },
              {
                title: 'System Health',
                value: `${stats.systemHealth}%`,
                icon: ClockIcon,
                color: 'from-purple-500 to-purple-600',
                bgColor: 'bg-purple-50 dark:bg-purple-900/20',
                trend: 'Optimal'
              }
            ].map((stat, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Trend: {stat.trend}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              {/* Live Alerts Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Alerts</h3>
                    <span className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">LIVE</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleAcknowledgeAll}
                      className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800"
                    >
                      Acknowledge All
                    </button>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {liveAlerts.filter(a => !a.acknowledged).length} unread
                    </span>
                  </div>
                </div>
                <LiveAlertsTable 
                  alerts={liveAlerts} 
                  onSelectVehicle={setSelectedVehicle}
                />
              </div>

              {/* Charts and Activity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Violations Overview</h3>
                  </div>
                  <div className="p-4">
                    <ViolationsOverviewChart />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                  </div>
                  <ActivityFeed activities={activityFeed} />
                </div>
              </div>

              {/* Recent Violations */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Violations</h3>
                </div>
                <RecentViolationsTable />
              </div>
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              {/* Evidence Viewer */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Evidence Viewer</h3>
                    {selectedVehicle && (
                      <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                        Vehicle #{selectedVehicle}
                      </span>
                    )}
                  </div>
                </div>
                <EvidenceViewer vehicleId={selectedVehicle} />
              </div>

              {/* Violation Types */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Violation Types</h3>
                </div>
                <ViolationTypes />
              </div>

              {/* Camera Status */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Camera Status</h3>
                </div>
                <CameraStatus cameras={cameraStatus} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;