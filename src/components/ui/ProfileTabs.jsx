import React, { useState } from 'react';
import Icon from '../AppIcon';

const ProfileTabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Personal Details', icon: 'User' },
    { label: 'Job Information', icon: 'Briefcase' },
    { label: 'Documents', icon: 'FileText' },
  ];

  return (
    <div className="profile-tabs">
      <div className="hidden lg:flex gap-2 mb-6 border-b border-border">
        {tabs?.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex items-center gap-2 px-6 py-4 font-body font-medium transition-smooth border-b-2 ${
              activeTab === index
                ? 'text-primary border-primary' :'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
            }`}
          >
            <Icon name={tab?.icon} size={20} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      <div className="lg:hidden mb-6">
        <div className="space-y-2">
          {tabs?.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-md font-body font-medium transition-smooth ${
                activeTab === index
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-foreground border border-border hover:bg-muted'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon name={tab?.icon} size={20} />
                <span>{tab?.label}</span>
              </div>
              <Icon
                name={activeTab === index ? 'ChevronUp' : 'ChevronDown'}
                size={20}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="profile-tabs-content">
        {React.Children?.toArray(children)?.[activeTab]}
      </div>
    </div>
  );
};

const ProfileTabPanel = ({ children }) => {
  return <div className="profile-tab-panel">{children}</div>;
};

export { ProfileTabs, ProfileTabPanel };