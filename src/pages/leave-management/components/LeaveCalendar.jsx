import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LeaveCalendar = ({ leaveRequests }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-success text-success-foreground';
      case 'Pending':
        return 'bg-warning text-warning-foreground';
      case 'Rejected':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const isLeaveDay = (day) => {
    const dateStr = `${currentMonth?.getFullYear()}-${String(currentMonth?.getMonth() + 1)?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
    return leaveRequests?.find((req) => {
      const start = new Date(req?.startDate);
      const end = new Date(req?.endDate);
      const current = new Date(dateStr);
      return current >= start && current <= end;
    });
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days?.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days?.push(i);
  }

  return (
    <div className="leave-calendar glassmorphism rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {monthNames?.[month]} {year}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 rounded-md hover:bg-muted transition-smooth"
            aria-label="Previous month"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-md hover:bg-muted transition-smooth"
            aria-label="Next month"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames?.map((day) => (
          <div key={day} className="text-center text-xs font-body font-semibold text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days?.map((day, index) => {
          const leaveData = day ? isLeaveDay(day) : null;
          return (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center text-sm font-body rounded-md transition-smooth ${
                !day
                  ? ''
                  : leaveData
                  ? `${getStatusColor(leaveData?.status)} font-semibold`
                  : 'hover:bg-muted cursor-pointer'
              }`}
            >
              {day || ''}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-body font-semibold text-foreground mb-3">Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-success" />
            <span className="text-xs font-body text-muted-foreground">Approved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-warning" />
            <span className="text-xs font-body text-muted-foreground">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-error" />
            <span className="text-xs font-body text-muted-foreground">Rejected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveCalendar;