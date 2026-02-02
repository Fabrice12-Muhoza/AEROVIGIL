import React from 'react';
import { CameraIcon, CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const CameraStatus = ({ cameras }) => {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'warning': return <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />;
      case 'offline': return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default: return <CameraIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-4">
      <div className="space-y-3">
        {cameras.map((camera) => (
          <div key={camera.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              {getStatusIcon(camera.status)}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{camera.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{camera.location}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                camera.status === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : camera.status === 'warning'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {camera.status.toUpperCase()}
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Uptime: {camera.uptime}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraStatus;