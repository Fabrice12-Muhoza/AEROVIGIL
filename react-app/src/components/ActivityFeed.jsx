import React from 'react';
import { 
  BellIcon, 
  ExclamationTriangleIcon, 
  CameraIcon, 
  UserIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch(type) {
      case 'alert': return <BellIcon className="h-5 w-5 text-red-500" />;
      case 'violation': return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'camera': return <CameraIcon className="h-5 w-5 text-blue-500" />;
      case 'user': return <UserIcon className="h-5 w-5 text-green-500" />;
      default: return <BellIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diff = Math.floor((now - past) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="p-4">
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
            <div className="flex-shrink-0">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
              <div className="flex items-center space-x-2 mt-1">
                <ClockIcon className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {getTimeAgo(activity.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;