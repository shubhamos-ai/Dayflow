import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AttendanceCard = ({ onCheckIn, onCheckOut, currentStatus = 'checked-out' }) => {
  const [status, setStatus] = useState(currentStatus);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now);
    setStatus('checked-in');
    if (onCheckIn) onCheckIn(now);
  };

  const handleCheckOut = () => {
    const now = new Date();
    setCheckOutTime(now);
    setStatus('checked-out');
    if (onCheckOut) onCheckOut(now);
  };

  const formatTime = (date) => {
    if (!date) return '--:--';
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getCurrentDate = () => {
    return new Date()?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="attendance-card bg-card border border-border rounded-xl p-8 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
            Today's Attendance
          </h3>
          <p className="text-sm font-caption text-muted-foreground">
            {getCurrentDate()}
          </p>
        </div>
        <div
          className={`px-4 py-2 rounded-md font-body font-medium text-sm ${
            status === 'checked-in' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
          }`}
        >
          {status === 'checked-in' ? 'Active' : 'Inactive'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
            <Icon name="LogIn" size={24} color="var(--color-success)" />
          </div>
          <div>
            <p className="text-sm font-caption text-muted-foreground mb-1">
              Check In
            </p>
            <p className="text-xl font-heading font-semibold text-foreground data-text">
              {formatTime(checkInTime)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="w-12 h-12 rounded-lg bg-error/10 flex items-center justify-center">
            <Icon name="LogOut" size={24} color="var(--color-error)" />
          </div>
          <div>
            <p className="text-sm font-caption text-muted-foreground mb-1">
              Check Out
            </p>
            <p className="text-xl font-heading font-semibold text-foreground data-text">
              {formatTime(checkOutTime)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        {status === 'checked-out' ? (
          <Button
            variant="default"
            size="lg"
            fullWidth
            iconName="LogIn"
            iconPosition="left"
            onClick={handleCheckIn}
            className="gradient-primary"
          >
            Check In
          </Button>
        ) : (
          <Button
            variant="destructive"
            size="lg"
            fullWidth
            iconName="LogOut"
            iconPosition="left"
            onClick={handleCheckOut}
          >
            Check Out
          </Button>
        )}
      </div>

      {status === 'checked-in' && checkInTime && (
        <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center gap-2 text-success">
            <Icon name="CheckCircle" size={20} />
            <p className="text-sm font-body font-medium">
              You checked in at {formatTime(checkInTime)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceCard;