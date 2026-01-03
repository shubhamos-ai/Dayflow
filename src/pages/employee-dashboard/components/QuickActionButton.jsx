import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionButton = ({ icon, label, description, path, gradient = false }) => {
  return (
    <Link
      to={path}
      className={`quick-action-button glassmorphism rounded-xl p-6 md:p-8 shadow-md transition-smooth hover-lift active-press group ${
        gradient ? 'gradient-primary text-primary-foreground' : 'hover:bg-muted/50'
      }`}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div
          className={`w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center transition-smooth ${
            gradient
              ? 'bg-white/20 group-hover:bg-white/30' :'bg-gradient-primary group-hover:scale-110'
          }`}
        >
          <Icon
            name={icon}
            size={32}
            color={gradient ? '#FFFFFF' : '#FFFFFF'}
          />
        </div>
        <div>
          <h3 className={`text-lg md:text-xl font-heading font-semibold mb-1 ${gradient ? 'text-primary-foreground' : 'text-foreground'}`}>
            {label}
          </h3>
          <p className={`text-sm font-body ${gradient ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default QuickActionButton;