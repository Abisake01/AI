import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const ProcessingChart: React.FC = () => {
  const hourlyData = [
    { hour: '00:00', processed: 45, detected: 3 },
    { hour: '02:00', processed: 23, detected: 1 },
    { hour: '04:00', processed: 18, detected: 0 },
    { hour: '06:00', processed: 67, detected: 4 },
    { hour: '08:00', processed: 134, detected: 8 },
    { hour: '10:00', processed: 198, detected: 12 },
    { hour: '12:00', processed: 234, detected: 15 },
    { hour: '14:00', processed: 267, detected: 18 },
    { hour: '16:00', processed: 189, detected: 11 },
    { hour: '18:00', processed: 145, detected: 7 },
    { hour: '20:00', processed: 98, detected: 5 },
    { hour: '22:00', processed: 76, detected: 3 }
  ];

  const maxValue = Math.max(...hourlyData.map(d => d.processed));

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Processing Activity (24h)
          </h3>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Videos Processed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Issues Detected</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">+12.5%</span>
        </div>
      </div>

      <div className="h-64 flex items-end justify-between space-x-2">
        {hourlyData.map((data, index) => (
          <div key={index} className="flex flex-col items-center space-y-1 flex-1">
            <div className="w-full flex flex-col justify-end h-48 space-y-1">
              <div 
                className="bg-blue-500 rounded-sm w-full transition-all duration-500"
                style={{ height: `${(data.processed / maxValue) * 100}%` }}
                title={`${data.processed} videos processed`}
              ></div>
              <div 
                className="bg-red-500 rounded-sm w-full transition-all duration-500"
                style={{ height: `${(data.detected / maxValue) * 100 * 10}%` }}
                title={`${data.detected} issues detected`}
              ></div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 transform rotate-45 origin-left">
              {data.hour}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">1,847</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Today</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">87</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Issues Found</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">4.7%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Detection Rate</p>
        </div>
      </div>
    </div>
  );
};