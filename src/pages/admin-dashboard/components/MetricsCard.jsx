import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, subtitle, icon, trend, trendValue, iconBgColor }) => {
  return (
    <div className="glassmorphism rounded-xl p-6 lg:p-8 shadow-md hover-lift transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-lg ${iconBgColor} flex items-center justify-center`}>
          <Icon name={icon} size={24} color="#FFFFFF" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs lg:text-sm font-body font-medium ${
            trend === 'up' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
          }`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2 data-text">
          {value}
        </h3>
        <p className="text-sm lg:text-base font-body text-muted-foreground mb-1">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs lg:text-sm font-caption text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;