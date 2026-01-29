// src/components/ViolationTypes.jsx
import React from 'react';

const ViolationTypes = () => {
  const violationTypes = [
    { type: 'MOVING VIOLATIONS', count: 42, color: 'bg-blue-500', description: 'Vehicles in motion' },
    { type: 'STOPPED VIOLATIONS', count: 18, color: 'bg-red-500', description: 'Illegal stops' },
    { type: 'SPEEDING', count: 25, color: 'bg-yellow-500', description: 'Over speed limit' },
    { type: 'RED LIGHT', count: 12, color: 'bg-purple-500', description: 'Signal violations' },
    { type: 'NO HELMET', count: 8, color: 'bg-green-500', description: 'Safety violations' },
  ];

  const total = violationTypes.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="p-6">
      <div className="space-y-4">
        {violationTypes.map((item, index) => {
          const percentage = ((item.count / total) * 100).toFixed(1);
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.type}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.count}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ({percentage}%)
                  </span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${item.color}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{total}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Violations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">5</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Violation Types</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViolationTypes;