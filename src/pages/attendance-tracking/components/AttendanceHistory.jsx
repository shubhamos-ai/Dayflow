import React from 'react';
import Icon from '../../../components/AppIcon';


const AttendanceHistory = ({ historyData }) => {
  const getStatusBadge = (status) => {
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

  const formatTime = (time) => {
    if (!time) return '--:--';
    return time;
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="attendance-history bg-card border border-border rounded-xl p-6 lg:p-8 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl lg:text-2xl font-heading font-semibold text-foreground">
          Recent History
        </h3>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md text-primary hover:bg-primary/10 transition-smooth active-press">
          <Icon name="Download" size={18} />
          <span className="text-sm font-body font-medium hidden lg:inline">Export</span>
        </button>
      </div>
      <div className="space-y-3 lg:space-y-4">
        {historyData?.map((record) => (
          <div
            key={record?.id}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-4 lg:p-5 bg-muted/50 rounded-lg transition-smooth hover-lift"
          >
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <Icon name="Calendar" size={20} color="#FFFFFF" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-base lg:text-lg font-body font-medium text-foreground mb-1">
                  {formatDate(record?.date)}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-caption font-medium border ${getStatusBadge(
                      record?.status
                    )}`}
                  >
                    {record?.status?.charAt(0)?.toUpperCase() + record?.status?.slice(1)}
                  </span>
                  {record?.location && (
                    <span className="flex items-center gap-1 text-xs font-caption text-muted-foreground">
                      <Icon name="MapPin" size={14} />
                      {record?.location}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 lg:gap-6 w-full lg:w-auto">
              <div className="flex items-center gap-4 flex-1 lg:flex-initial">
                <div className="text-center lg:text-right">
                  <p className="text-xs font-caption text-muted-foreground mb-1">
                    Check In
                  </p>
                  <p className="text-sm lg:text-base font-body font-medium text-foreground data-text">
                    {formatTime(record?.checkIn)}
                  </p>
                </div>
                <div className="text-center lg:text-right">
                  <p className="text-xs font-caption text-muted-foreground mb-1">
                    Check Out
                  </p>
                  <p className="text-sm lg:text-base font-body font-medium text-foreground data-text">
                    {formatTime(record?.checkOut)}
                  </p>
                </div>
              </div>

              {record?.totalHours && (
                <div className="px-4 py-2 rounded-md bg-primary/10 text-primary text-center lg:text-left">
                  <p className="text-xs font-caption mb-1">Total</p>
                  <p className="text-base font-body font-semibold data-text whitespace-nowrap">
                    {record?.totalHours}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {historyData?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Icon name="Calendar" size={32} color="var(--color-muted-foreground)" />
          </div>
          <p className="text-base font-body font-medium text-foreground mb-2">
            No attendance records found
          </p>
          <p className="text-sm font-caption text-muted-foreground">
            Your attendance history will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default AttendanceHistory;