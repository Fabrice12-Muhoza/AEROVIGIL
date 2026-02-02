// // src/pages/EvidenceLibrary.jsx
// import React, { useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import Header from '../components/Header';
// import { useAuth } from '../context/AuthContext';
// import {
//   MagnifyingGlassIcon,
//   FunnelIcon,
//   CalendarIcon,
//   PlayIcon,
//   DocumentArrowDownIcon,
//   EyeIcon,
//   ShareIcon,
// } from '@heroicons/react/outline';

// const EvidenceLibrary = () => {
//   const { user, logout } = useAuth();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filter, setFilter] = useState('all');

//   const evidenceItems = [
//     {
//       id: 1,
//       vehicleId: '101',
//       plate: 'RAB123',
//       violationType: 'Moving Violation',
//       timestamp: '2026-01-06 08:12:45',
//       duration: '45s',
//       size: '12.4 MB',
//       hash: 'af23d4f67bc...',
//       status: 'Processed',
//       thumbnail: 'https://via.placeholder.com/300x150/3b82f6/ffffff?text=Vehicle+RAB123',
//     },
//     {
//       id: 2,
//       vehicleId: '102',
//       plate: 'RACS67',
//       violationType: 'Stopped in No-Stop Zone',
//       timestamp: '2026-01-06 08:10:30',
//       duration: '32s',
//       size: '8.7 MB',
//       hash: 'be78d9e45cc...',
//       status: 'Processed',
//       thumbnail: 'https://via.placeholder.com/300x150/ef4444/ffffff?text=Vehicle+RACS67',
//     },
//     {
//       id: 3,
//       vehicleId: '103',
//       plate: 'RAD891',
//       violationType: 'Speeding (85km/h)',
//       timestamp: '2026-01-06 08:05:15',
//       duration: '28s',
//       size: '7.2 MB',
//       hash: 'c12a34b56d7...',
//       status: 'Processing',
//       thumbnail: 'https://via.placeholder.com/300x150/f59e0b/000000?text=Vehicle+RAD891',
//     },
//     {
//       id: 4,
//       vehicleId: '104',
//       plate: 'RAE234',
//       violationType: 'Red Light Violation',
//       timestamp: '2026-01-06 07:58:42',
//       duration: '51s',
//       size: '15.8 MB',
//       hash: 'd98e76f54a3...',
//       status: 'Processed',
//       thumbnail: 'https://via.placeholder.com/300x150/8b5cf6/ffffff?text=Vehicle+RAE234',
//     },
//     {
//       id: 5,
//       vehicleId: '105',
//       plate: 'RAF567',
//       violationType: 'Wrong Way Driving',
//       timestamp: '2026-01-06 07:45:20',
//       duration: '36s',
//       size: '10.3 MB',
//       hash: 'e54a3b21c98...',
//       status: 'Processed',
//       thumbnail: 'https://via.placeholder.com/300x150/10b981/ffffff?text=Vehicle+RAF567',
//     },
//   ];

//   const filteredItems = evidenceItems.filter(item => {
//     const matchesSearch = item.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          item.vehicleId.includes(searchTerm) ||
//                          item.violationType.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = filter === 'all' || item.status.toLowerCase() === filter.toLowerCase();
//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
//       <Sidebar />
      
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header user={user} onLogout={logout} />
        
//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Evidence Library</h1>
//             <p className="text-gray-600 dark:text-gray-400">Manage and review all collected evidence</p>
//           </div>

//           {/* Search and Filter Bar */}
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-6">
//             <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
//               <div className="relative flex-1 max-w-xl">
//                 <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by plate, vehicle ID, or violation type..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
              
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center space-x-2">
//                   <FunnelIcon className="h-5 w-5 text-gray-500" />
//                   <select
//                     value={filter}
//                     onChange={(e) => setFilter(e.target.value)}
//                     className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="all">All Status</option>
//                     <option value="processed">Processed</option>
//                     <option value="processing">Processing</option>
//                     <option value="pending">Pending</option>
//                   </select>
//                 </div>
                
//                 <div className="flex items-center space-x-2">
//                   <CalendarIcon className="h-5 w-5 text-gray-500" />
//                   <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
//                     <option>Last 7 days</option>
//                     <option>Last 30 days</option>
//                     <option>Last quarter</option>
//                     <option>Custom range</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Evidence Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredItems.map((item) => (
//               <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
//                 <div className="relative">
//                   <img
//                     src={item.thumbnail}
//                     alt={item.plate}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="absolute top-3 left-3">
//                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                       item.status === 'Processed' 
//                         ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
//                         : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
//                     }`}>
//                       {item.status}
//                     </span>
//                   </div>
//                   <div className="absolute top-3 right-3 flex space-x-2">
//                     <button className="p-1 bg-black/50 rounded backdrop-blur-sm">
//                       <PlayIcon className="h-5 w-5 text-white" />
//                     </button>
//                     <button className="p-1 bg-black/50 rounded backdrop-blur-sm">
//                       <EyeIcon className="h-5 w-5 text-white" />
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="p-4">
//                   <div className="flex items-center justify-between mb-3">
//                     <div>
//                       <h3 className="font-bold text-gray-900 dark:text-white">{item.plate}</h3>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">Vehicle ID: {item.vehicleId}</p>
//                     </div>
//                     <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
//                       {item.violationType}
//                     </span>
//                   </div>
                  
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-gray-500 dark:text-gray-400">Timestamp</span>
//                       <span className="font-mono text-gray-900 dark:text-white">{item.timestamp}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-500 dark:text-gray-400">Duration</span>
//                       <span className="text-gray-900 dark:text-white">{item.duration}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-500 dark:text-gray-400">File Size</span>
//                       <span className="text-gray-900 dark:text-white">{item.size}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-500 dark:text-gray-400">Hash</span>
//                       <span className="font-mono text-gray-900 dark:text-white truncate">{item.hash}</span>
//                     </div>
//                   </div>
                  
//                   <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
//                     <button className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
//                       <DocumentArrowDownIcon className="h-4 w-4" />
//                       <span className="text-sm">Download</span>
//                     </button>
//                     <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
//                       <ShareIcon className="h-4 w-4" />
//                       <span className="text-sm">Share</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {filteredItems.length === 0 && (
//             <div className="text-center py-12">
//               <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No evidence found</h3>
//               <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default EvidenceLibrary;





import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { API } from '../services/api';
import { toast } from 'react-hot-toast';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  PlayIcon,
  DocumentArrowDownIcon,
  EyeIcon,
  ShareIcon,
  TrashIcon,
  PlusIcon,
  CheckCircleIcon,
  XMarkIcon,
  CloudArrowUpIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';

const EvidenceLibrary = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('last7days');
  const [evidenceItems, setEvidenceItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const fetchEvidence = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        filter,
        search: searchTerm,
        dateRange,
        sortBy,
        sortOrder,
        page: currentPage,
        limit: itemsPerPage
      };

      const response = await API.evidence.getAll(params);
      setEvidenceItems(response.data);
    } catch (error) {
      toast.error('Failed to load evidence');
      console.error('Evidence fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [filter, searchTerm, dateRange, sortBy, sortOrder, currentPage]);

  useEffect(() => {
    fetchEvidence();
  }, [fetchEvidence]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setCurrentPage(1);
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === evidenceItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(evidenceItems.map(item => item.id));
    }
  };

  const handleDeleteSelected = async () => {
    if (!selectedItems.length) return;

    if (window.confirm(`Delete ${selectedItems.length} selected items?`)) {
      try {
        await API.evidence.bulkDelete(selectedItems);
        toast.success(`${selectedItems.length} items deleted`);
        setSelectedItems([]);
        fetchEvidence();
      } catch (error) {
        toast.error('Failed to delete items');
      }
    }
  };

  const handleUpload = async (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      setUploadProgress(0);
      const response = await API.evidence.upload(formData);
      toast.success('Files uploaded successfully');
      setUploadModalOpen(false);
      setUploadProgress(null);
      fetchEvidence();
    } catch (error) {
      toast.error('Upload failed');
      setUploadProgress(null);
    }
  };

  const handleDownload = async (id, filename) => {
    try {
      const response = await API.evidence.download(id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error('Download failed');
    }
  };

  const handleVerify = async (id) => {
    try {
      const response = await API.evidence.verify(id);
      toast.success('Evidence verified successfully');
      fetchEvidence();
    } catch (error) {
      toast.error('Verification failed');
    }
  };

  const totalPages = Math.ceil(evidenceItems.totalCount / itemsPerPage);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={logout} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Evidence Library</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage and review all collected evidence</p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              {selectedItems.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedItems.length} selected
                  </span>
                  <button
                    onClick={handleDeleteSelected}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2"
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span>Delete Selected</span>
                  </button>
                </div>
              )}
              
              <button
                onClick={() => setUploadModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center space-x-2"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Upload Evidence</span>
              </button>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              {/* Search */}
              <div className="relative flex-1 max-w-xl">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by plate, vehicle ID, violation type, or hash..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Filters */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FunnelIcon className="h-5 w-5 text-gray-500" />
                  <select
                    value={filter}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="processed">Processed</option>
                    <option value="processing">Processing</option>
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-gray-500" />
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="today">Today</option>
                    <option value="last7days">Last 7 days</option>
                    <option value="last30days">Last 30 days</option>
                    <option value="lastquarter">Last quarter</option>
                    <option value="custom">Custom range</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="timestamp">Date</option>
                    <option value="plate">Plate</option>
                    <option value="type">Type</option>
                    <option value="size">Size</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {selectedItems.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-800 dark:text-blue-200">
                  {selectedItems.length} items selected
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    // Handle bulk download
                  }}
                  className="px-3 py-1 text-sm bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30"
                >
                  Download All
                </button>
                <button
                  onClick={handleDeleteSelected}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete All
                </button>
              </div>
            </div>
          )}

          {/* Evidence Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : evidenceItems.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {evidenceItems.map((item) => (
                  <div 
                    key={item.id}
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden border-2 transition-all ${
                      selectedItems.includes(item.id)
                        ? 'border-blue-500 dark:border-blue-400'
                        : 'border-transparent'
                    }`}
                  >
                    <div className="relative">
                      {/* Thumbnail */}
                      <div className="h-48 bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                        {item.thumbnail_url ? (
                          <img
                            src={item.thumbnail_url}
                            alt={item.plate}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <DocumentCheckIcon className="h-16 w-16 text-gray-400" />
                          </div>
                        )}
                        
                        {/* Selection Checkbox */}
                        <div className="absolute top-3 left-3">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        
                        {/* Status Badge */}
                        <div className="absolute top-3 right-3">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            item.status === 'verified'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : item.status === 'processing'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : item.status === 'failed'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {item.status.toUpperCase()}
                          </span>
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="absolute bottom-3 right-3 flex space-x-2">
                          <button
                            onClick={() => handleDownload(item.id, `${item.plate}_${item.timestamp}`)}
                            className="p-2 bg-black/70 rounded-full backdrop-blur-sm hover:bg-black/90"
                            title="Download"
                          >
                            <DocumentArrowDownIcon className="h-4 w-4 text-white" />
                          </button>
                          <button
                            onClick={() => handleVerify(item.id)}
                            className="p-2 bg-black/70 rounded-full backdrop-blur-sm hover:bg-black/90"
                            title="Verify"
                          >
                            <EyeIcon className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">{item.plate}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Vehicle ID: {item.vehicle_id}
                          </p>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                          {item.violation_type}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Timestamp</span>
                          <span className="font-mono text-gray-900 dark:text-white">
                            {new Date(item.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Duration</span>
                          <span className="text-gray-900 dark:text-white">{item.duration}s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">File Size</span>
                          <span className="text-gray-900 dark:text-white">
                            {(item.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Hash</span>
                          <span className="font-mono text-gray-900 dark:text-white truncate" title={item.hash}>
                            {item.hash.substring(0, 12)}...
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                        <button
                          onClick={() => handleDownload(item.id, `${item.plate}_${item.timestamp}`)}
                          className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          <DocumentArrowDownIcon className="h-4 w-4" />
                          <span className="text-sm">Download</span>
                        </button>
                        <button
                          onClick={() => handleVerify(item.id)}
                          className="flex items-center space-x-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                        >
                          <EyeIcon className="h-4 w-4" />
                          <span className="text-sm">Verify</span>
                        </button>
                        <button
                          className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                        >
                          <ShareIcon className="h-4 w-4" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-between">
                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    Showing page {currentPage} of {totalPages}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
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