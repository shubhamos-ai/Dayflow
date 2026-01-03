import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';


const DashboardNav = ({ userRole = 'employee' }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const employeeNavItems = [
    {
      label: 'Dashboard',
      path: '/employee-dashboard',
      icon: 'LayoutDashboard',
      permission: 'employee',
    },
    {
      label: 'Attendance',
      path: '/attendance-tracking',
      icon: 'Clock',
      permission: 'employee',
    },
    {
      label: 'Leave',
      path: '/leave-management',
      icon: 'Calendar',
      permission: 'employee',
    },
    {
      label: 'Profile',
      path: '/profile-management',
      icon: 'User',
      permission: 'employee',
    },
  ];

  const adminNavItems = [
    {
      label: 'Admin Dashboard',
      path: '/admin-dashboard',
      icon: 'LayoutDashboard',
      permission: 'admin',
    },
    {
      label: 'Attendance',
      path: '/attendance-tracking',
      icon: 'Clock',
      permission: 'admin',
    },
    {
      label: 'Leave',
      path: '/leave-management',
      icon: 'Calendar',
      permission: 'admin',
    },
    {
      label: 'Profile',
      path: '/profile-management',
      icon: 'User',
      permission: 'admin',
    },
  ];

  const navItems = userRole === 'admin' ? adminNavItems : employeeNavItems;

  const isActive = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="dashboard-nav fixed top-0 left-0 right-0 z-100 bg-card border-b border-border shadow-md">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-8">
              <Link to={userRole === 'admin' ? '/admin-dashboard' : '/employee-dashboard'} className="flex items-center gap-3">
                <div className="dashboard-nav-logo w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center transition-smooth hover-lift">
                  <Icon name="Briefcase" size={24} color="#FFFFFF" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-heading font-semibold text-foreground">Dayflow</span>
                  <span className="text-xs font-caption text-muted-foreground">HRMS</span>
                </div>
              </Link>

              <div className="hidden lg:flex items-center gap-2">
                {navItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`flex items-center gap-2 px-6 py-3 rounded-md font-body font-medium transition-smooth hover-lift active-press ${
                      isActive(item?.path)
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <button
                className="p-3 rounded-md text-foreground hover:bg-muted transition-smooth hover-lift active-press"
                aria-label="Notifications"
              >
                <Icon name="Bell" size={20} />
              </button>
              <button
                className="p-3 rounded-md text-foreground hover:bg-muted transition-smooth hover-lift active-press"
                aria-label="Settings"
              >
                <Icon name="Settings" size={20} />
              </button>
            </div>

            <button
              className="lg:hidden p-3 rounded-md text-foreground hover:bg-muted transition-smooth active-press"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border">
            <div className="px-6 py-4 space-y-2">
              {navItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md font-body font-medium transition-smooth active-press ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-border flex gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-foreground hover:bg-muted transition-smooth active-press"
                  aria-label="Notifications"
                >
                  <Icon name="Bell" size={20} />
                  <span className="font-body font-medium">Notifications</span>
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-foreground hover:bg-muted transition-smooth active-press"
                  aria-label="Settings"
                >
                  <Icon name="Settings" size={20} />
                  <span className="font-body font-medium">Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <div className="h-20" />
    </>
  );
};

export default DashboardNav;