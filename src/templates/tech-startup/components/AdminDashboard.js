import React, { useState } from 'react';
import AdminServices from './AdminServices';
import AdminTeam from './AdminTeam';
import AdminContactForms from './AdminContactForms';

const AdminDashboard = ({ tenantId }) => {
  const [activeTab, setActiveTab] = useState('services');

  const tabs = [
    { id: 'services', label: 'Services', icon: '🚀' },
    { id: 'team', label: 'Team', icon: '👥' },
    { id: 'contact', label: 'Contact Forms', icon: '📧' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return <AdminServices tenantId={tenantId} />;
      case 'team':
        return <AdminTeam tenantId={tenantId} />;
      case 'contact':
        return <AdminContactForms tenantId={tenantId} />;
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Template Settings</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">Template customization settings will be available here.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">TS</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Tech Startup Admin</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <span className="sr-only">View live site</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
