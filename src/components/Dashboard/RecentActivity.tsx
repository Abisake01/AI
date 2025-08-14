import React from 'react';
import { AlertTriangle, CheckCircle, Clock, Eye } from 'lucide-react';

const mockActivities = [
  {
    id: '1',
    type: 'detection',
    description: 'Inappropriate content detected in video_2024_001.mp4',
    timestamp: '2 minutes ago',
    severity: 'high' as const,
    confidence: 94
  },
  {
    id: '2',
    type: 'completion',
    description: 'Analysis completed for marketing_video.mp4',
    timestamp: '5 minutes ago',
    severity: 'low' as const,
    confidence: 100
  },
  {
    id: '3',
    type: 'processing',
    description: 'Started processing educational_content.mp4',
    timestamp: '8 minutes ago',
    severity: 'medium' as const,
    confidence: 0
  },
  {
    id: '4',
    type: 'detection',
    description: 'Violence detected in action_sequence.mp4',
    timestamp: '12 minutes ago',
    severity: 'high' as const,
    confidence: 87
  },
  {
    id: '5',
    type: 'completion',
    description: 'Clean content verified in tutorial_video.mp4',
    timestamp: '15 minutes ago',
    severity: 'low' as const,
    confidence: 99
  }
];

export const RecentActivity: React.FC = () => {
  const getIcon = (type: string, severity: string) => {
    if (type === 'processing') return <Clock className="w-4 h-4 text-blue-500" />;
    if (type === 'completion' && severity === 'low') return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (type === 'detection') return <AlertTriangle className="w-4 h-4 text-red-500" />;
    return <Eye className="w-4 h-4 text-gray-500" />;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h3>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex-shrink-0 mt-1">
              {getIcon(activity.type, activity.severity)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white font-medium">
                {activity.description}
              </p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.timestamp}
                </p>
                <div className="flex items-center space-x-2">
                  {activity.confidence > 0 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.confidence}% confidence
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getSeverityColor(activity.severity)}`}>
                    {activity.severity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};