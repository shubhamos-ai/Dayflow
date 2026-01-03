import React from 'react';
import Icon from '../../../components/AppIcon';

const WeeklyAttendanceSummary = ({ weekData }) => {
  const getDayStatus = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-success text-success-foreground';
      case 'Absent':
        return 'bg-error text-error-foreground';
      case 'Half-day':
        return 'bg-warning text-warning-foreground';
      case 'Leave':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present':
        return 'CheckCircle';
      case 'Absent':
        return 'XCircle';
      case 'Half-day':
        return 'Clock';
      case 'Leave':
        return 'Calendar';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="weekly-attendance-summary glassmorphism rounded-xl p-6 md:p-8 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
          This Week's Attendance
        </h3>
        <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg">
          <Icon name="TrendingUp" size={16} color="var(--color-success)" />
          <span className="text-sm font-body font-medium text-foreground data-text">
            {weekData?.presentDays}/{weekData?.totalDays}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
        {weekData?.days?.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-3 p-4 bg-muted/30 rounded-lg"
          >
            <span className="text-xs md:text-sm font-caption text-muted-foreground">
              {day?.dayName}
            </span>
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg ${getDayStatus(day?.status)} flex items-center justify-center shadow-sm`}>
              <Icon name={getStatusIcon(day?.status)} size={24} />
            </div>
            <span className="text-xs font-caption text-foreground data-text">
              {day?.date}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" />
          </div>
          <div>
            <p className="text-xs font-caption text-muted-foreground">Present</p>
            <p className="text-lg font-heading font-semibold text-foreground data-text">
              {weekData?.presentDays}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-error/10 flex items-center justify-center">
            <Icon name="XCircle" size={16} color="var(--color-error)" />
          </div>
          <div>
            <p className="text-xs font-caption text-muted-foreground">Absent</p>
            <p className="text-lg font-heading font-semibold text-foreground data-text">
              {weekData?.absentDays}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
            <Icon name="Clock" size={16} color="var(--color-warning)" />
          </div>
          <div>
            <p className="text-xs font-caption text-muted-foreground">Half-day</p>
            <p className="text-lg font-heading font-semibold text-foreground data-text">
              {weekData?.halfDays}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
            <Icon name="Calendar" size={16} color="var(--color-secondary)" />
          </div>
          <div>
            <p className="text-xs font-caption text-muted-foreground">Leave</p>
            <p className="text-lg font-heading font-semibold text-foreground data-text">
              {weekData?.leaveDays}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyAttendanceSummary;