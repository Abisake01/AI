import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { DashboardView } from './components/Dashboard/DashboardView';
import { UploadView } from './components/Upload/UploadView';
import { VideosView } from './components/Videos/VideosView';
import { useTheme } from './hooks/useTheme';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isDark, toggleTheme } = useTheme();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'upload':
        return <UploadView />;
      case 'videos':
        return <VideosView />;
      case 'analytics':
        return (
          <div className="p-6 flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Analytics Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced analytics and reporting features coming soon...
              </p>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6 flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Reports & Export
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Generate detailed reports and export detection results...
              </p>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="p-6 flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                User Management
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Manage users, permissions, and access controls...
              </p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                System Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Configure detection thresholds, notifications, and system preferences...
              </p>
            </div>
          </div>
        );
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isDark ? 'dark' : ''}`}>
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 flex flex-col">
          <Header isDark={isDark} onThemeToggle={toggleTheme} />
          <main className="flex-1 overflow-auto">
            {renderActiveView()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;