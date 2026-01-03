import React from 'react';
import Icon from '../../../components/AppIcon';

const WeeklyCalendar = ({ weekData }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-success/10 text-success border-success/20';
      case 'absent':
        return 'bg-error/10 text-error border-error/20';
      case 'half-day':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'leave':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return 'CheckCircle';
      case 'absent':
        return 'XCircle';
      case 'half-day':
        return 'Clock';
      case 'leave':
        return 'Calendar';
      default:
        return 'Circle';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'present':
        return 'Present';
      case 'absent':
        return 'Absent';
      case 'half-day':
        return 'Half Day';
      case 'leave':
        return 'Leave';
      default:
        return 'Not Marked';
    }
  };

  return (
    <div className="weekly-calendar bg-card border border-border rounded-xl p-6 lg:p-8 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl lg:text-2xl font-heading font-semibold text-foreground">
          Weekly Overview
        </h3>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="Calendar" size={20} />
          <span className="text-sm font-caption">Current Week</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3 lg:gap-4">
        {weekData?.map((day) => (
          <div
            key={day?.id}
            className={`p-4 lg:p-5 rounded-lg border-2 transition-smooth hover-lift ${getStatusColor(
              day?.status
            )}`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-between w-full lg:flex-col lg:gap-2">
                <div className="text-center">
                  <p className="text-xs font-caption text-current opacity-80 mb-1">
                    {day?.dayName}
                  </p>
                  <p className="text-2xl lg:text-3xl font-heading font-bold text-current">
                    {day?.date}
                  </p>
                </div>
                <Icon name={getStatusIcon(day?.status)} size={24} className="lg:hidden" />
              </div>

              <Icon
                name={getStatusIcon(day?.status)}
                size={32}
                className="hidden lg:block"
              />

              <div className="text-center w-full">
                <p className="text-sm font-body font-medium text-current mb-1">
                  {getStatusLabel(day?.status)}
                </p>
                {day?.hours && (
                  <p className="text-xs font-caption text-current opacity-70 data-text">
                    {day?.hours}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-wrap gap-4 lg:gap-6 justify-center lg:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-sm font-body text-muted-foreground">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <span className="text-sm font-body text-muted-foreground">Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span className="text-sm font-body text-muted-foreground">Half Day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <span className="text-sm font-body text-muted-foreground">Leave</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendar;