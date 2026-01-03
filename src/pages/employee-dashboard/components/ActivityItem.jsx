import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'leave':
        return { name: 'Calendar', color: 'var(--color-warning)' };
      case 'attendance':
        return { name: 'Clock', color: 'var(--color-success)' };
      case 'payroll':
        return { name: 'DollarSign', color: 'var(--color-primary)' };
      case 'document':
        return { name: 'FileText', color: 'var(--color-secondary)' };
      default:
        return { name: 'Bell', color: 'var(--color-muted-foreground)' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-warning';
      case 'Approved':
        return 'text-success';
      case 'Rejected':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const icon = getActivityIcon(activity?.type);

  return (
    <div className="activity-item flex items-start gap-4 p-4 rounded-lg hover:bg-muted/30 transition-smooth">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
        <Icon name={icon?.name} size={20} color={icon?.color} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm md:text-base font-body text-foreground mb-1">
          {activity?.title}
        </p>
        <p className="text-xs md:text-sm font-caption text-muted-foreground">
          {activity?.description}
        </p>
        {activity?.status && (
          <span className={`inline-block mt-2 text-xs font-body font-medium ${getStatusColor(activity?.status)}`}>
            {activity?.status}
          </span>
        )}
      </div>
      <div className="flex-shrink-0 text-xs font-caption text-muted-foreground whitespace-nowrap">
        {activity?.time}
      </div>
    </div>
  );
};

export default ActivityItem;