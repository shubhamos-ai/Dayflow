import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthLayout = ({ children, title, subtitle, showSignUpLink = false, showLoginLink = false }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-12">
      <div className="absolute inset-0 gradient-primary opacity-10" />
      
      <div className="relative w-full max-w-md">
        <div className="glassmorphism rounded-xl shadow-xl p-8 lg:p-12">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 shadow-lg">
              <Icon name="Briefcase" size={32} color="#FFFFFF" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground text-center mb-2">
              Dayflow HRMS
            </h1>
            <p className="text-sm font-caption text-muted-foreground text-center">
              Workforce Management Simplified
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm font-body text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>

          {children}

          <div className="mt-8 pt-6 border-t border-border">
            {showSignUpLink && (
              <p className="text-center text-sm font-body text-muted-foreground">
                Don't have an account?{' '}
                <Link
                  to="/sign-up"
                  className="text-primary font-medium hover:underline transition-smooth"
                >
                  Sign up
                </Link>
              </p>
            )}
            {showLoginLink && (
              <p className="text-center text-sm font-body text-muted-foreground">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-primary font-medium hover:underline transition-smooth"
                >
                  Log in
                </Link>
              </p>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs font-caption text-muted-foreground">
              Powered by{' '}
              <span className="text-primary font-medium">SHUBHAMOS</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;