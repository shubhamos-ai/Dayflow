import React from 'react';
import Icon from '../../../components/AppIcon';

const LeaveBalanceCard = ({ balance }) => {
  const percentage = (balance?.used / balance?.total) * 100;

  const colorMap = {
    primary: 'var(--color-primary)',
    success: 'var(--color-success)',
    accent: 'var(--color-accent)',
    warning: 'var(--color-warning)',
  };

  const bgColorMap = {
    primary: 'bg-primary/10',
    success: 'bg-success/10',
    accent: 'bg-accent/10',
    warning: 'bg-warning/10',
  };

  return (
    <div className="leave-balance-card p-4 rounded-lg border border-border hover:shadow-md transition-smooth">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg ${bgColorMap?.[balance?.color]} flex items-center justify-center`}>
            <Icon name="Calendar" size={16} color={colorMap?.[balance?.color]} />
          </div>
          <h3 className="font-body font-semibold text-foreground">{balance?.type}</h3>
        </div>
        <span className="text-sm font-body font-medium text-muted-foreground">
          {balance?.remaining}/{balance?.total}
        </span>
      </div>

      <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            backgroundColor: colorMap?.[balance?.color],
          }}
        />
      </div>

      <div className="flex items-center justify-between text-xs font-body text-muted-foreground">
        <span>Used: {balance?.used}</span>
        <span>Remaining: {balance?.remaining}</span>
      </div>
    </div>
  );
};

export default LeaveBalanceCard;