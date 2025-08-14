import React from 'react';
import { StatsCard } from './StatsCard';
import { RecentActivity } from './RecentActivity';
import { ProcessingChart } from './ProcessingChart';
import { 
  VideoIcon, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  TrendingUp,
  Users,
  Shield,
  Database
} from 'lucide-react';

const mockStats = {
  totalVideos: "2,847",
  processedVideos: "2,731",
  detectedIssues: "156",
  avgProcessingTime: "2.3min",
  totalUsers: "1,245",
  activeScans: "23",
  storageUsed: "1.2TB",
  accuracy: "98.7%"
};

export const DashboardView: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          AI Detection Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor video processing and content detection in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Videos"
          value={mockStats.totalVideos}
          change="+12.5%"
          changeType="positive"
          icon={VideoIcon}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Processed Videos"
          value={mockStats.processedVideos}
          change="+8.2%"
          changeType="positive"
          icon={CheckCircle}
          gradient="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatsCard
          title="Issues Detected"
          value={mockStats.detectedIssues}
          change="-15.3%"
          changeType="positive"
          icon={AlertTriangle}
          gradient="bg-gradient-to-br from-red-500 to-red-600"
        />
        <StatsCard
          title="Avg Processing"
          value={mockStats.avgProcessingTime}
          change="-0.4min"
          changeType="positive"
          icon={Clock}
          gradient="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProcessingChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Users"
          value={mockStats.totalUsers}
          change="+5.7%"
          changeType="positive"
          icon={Users}
          gradient="bg-gradient-to-br from-teal-500 to-teal-600"
        />
        <StatsCard
          title="Active Scans"
          value={mockStats.activeScans}
          change="Real-time"
          changeType="neutral"
          icon={Shield}
          gradient="bg-gradient-to-br from-orange-500 to-orange-600"
        />
        <StatsCard
          title="Storage Used"
          value={mockStats.storageUsed}
          change="+2.1GB"
          changeType="neutral"
          icon={Database}
          gradient="bg-gradient-to-br from-indigo-500 to-indigo-600"
        />
        <StatsCard
          title="Detection Accuracy"
          value={mockStats.accuracy}
          change="+0.3%"
          changeType="positive"
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-pink-500 to-pink-600"
        />
      </div>
    </div>
  );
};