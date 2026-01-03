import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceSummary = ({ summaryData }) => {
  const stats = [
    {
      id: 1,
      label: 'Total Hours',
      value: summaryData?.totalHours,
      icon: 'Clock',
      color: 'primary',
      bgColor: 'bg-primary/10',
      textColor: 'text-primary',
    },
    {
      id: 2,
      label: 'Days Present',
      value: summaryData?.daysPresent,
      icon: 'CheckCircle',
      color: 'success',
      bgColor: 'bg-success/10',
      textColor: 'text-success',
    },
    {
      id: 3,
      label: 'Attendance Rate',
      value: `${summaryData?.attendancePercentage}%`,
      icon: 'TrendingUp',
      color: 'accent',
      bgColor: 'bg-accent/10',
      textColor: 'text-accent',
    },
    {
      id: 4,
      label: 'Days Absent',
      value: summaryData?.daysAbsent,
      icon: 'XCircle',
      color: 'error',
      bgColor: 'bg-error/10',
      textColor: 'text-error',
    },
  ];

  return (
    <div className="attendance-summary bg-card border border-border rounded-xl p-6 lg:p-8 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl lg:text-2xl font-heading font-semibold text-foreground">
          Attendance Summary
        </h3>
        <div className="px-3 py-1 rounded-md bg-muted text-muted-foreground text-sm font-caption">
          {summaryData?.period}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats?.map((stat) => (
          <div
            key={stat?.id}
            className="flex items-center gap-4 p-4 lg:p-5 bg-muted/50 rounded-lg transition-smooth hover-lift"
          >
            <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-lg ${stat?.bgColor} flex items-center justify-center flex-shrink-0`}>
              <Icon name={stat?.icon} size={24} color={`var(--color-${stat?.color})`} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-caption text-muted-foreground mb-1">
                {stat?.label}
              </p>
              <p className={`text-2xl lg:text-3xl font-heading font-bold ${stat?.textColor} data-text`}>
                {stat?.value}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Info" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-sm font-body font-medium text-foreground">
                Current Month Performance
              </p>
              <p className="text-xs font-caption text-muted-foreground">
                Based on {summaryData?.totalWorkingDays} working days
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-full lg:w-48 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-primary transition-smooth"
                style={{ width: `${summaryData?.attendancePercentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-body font-medium text-foreground whitespace-nowrap data-text">
              {summaryData?.attendancePercentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummary;