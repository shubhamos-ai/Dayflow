import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import DashboardNav from '../../components/ui/DashboardNav';
import AttendanceCard from '../../components/ui/AttendanceCard';
import WeeklyCalendar from './components/WeeklyCalendar';
import AttendanceSummary from './components/AttendanceSummary';
import AttendanceHistory from './components/AttendanceHistory';
import DateRangeFilter from './components/DateRangeFilter';

const AttendanceTracking = () => {
  const [userRole, setUserRole] = useState('employee');
  const [currentStatus, setCurrentStatus] = useState('checked-out');
  const [filterDates, setFilterDates] = useState({ startDate: '', endDate: '' });

  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'employee';
    setUserRole(role);
  }, []);

  const weekData = [
    {
      id: 1,
      dayName: 'Mon',
      date: '30',
      status: 'present',
      hours: '8h 30m',
    },
    {
      id: 2,
      dayName: 'Tue',
      date: '31',
      status: 'present',
      hours: '9h 15m',
    },
    {
      id: 3,
      dayName: 'Wed',
      date: '01',
      status: 'present',
      hours: '8h 45m',
    },
    {
      id: 4,
      dayName: 'Thu',
      date: '02',
      status: 'half-day',
      hours: '4h 20m',
    },
    {
      id: 5,
      dayName: 'Fri',
      date: '03',
      status: 'present',
      hours: '8h 00m',
    },
    {
      id: 6,
      dayName: 'Sat',
      date: '04',
      status: 'leave',
      hours: null,
    },
    {
      id: 7,
      dayName: 'Sun',
      date: '05',
      status: 'leave',
      hours: null,
    },
  ];

  const summaryData = {
    totalHours: '38h 50m',
    daysPresent: 4,
    attendancePercentage: 80,
    daysAbsent: 0,
    period: 'December 2025',
    totalWorkingDays: 5,
  };

  const historyData = [
    {
      id: 1,
      date: '2026-01-02',
      status: 'half-day',
      checkIn: '09:15 AM',
      checkOut: '01:30 PM',
      totalHours: '4h 15m',
      location: 'Office - Floor 3',
    },
    {
      id: 2,
      date: '2026-01-01',
      status: 'present',
      checkIn: '08:45 AM',
      checkOut: '05:30 PM',
      totalHours: '8h 45m',
      location: 'Office - Floor 3',
    },
    {
      id: 3,
      date: '2025-12-31',
      status: 'present',
      checkIn: '09:00 AM',
      checkOut: '06:15 PM',
      totalHours: '9h 15m',
      location: 'Office - Floor 3',
    },
    {
      id: 4,
      date: '2025-12-30',
      status: 'present',
      checkIn: '08:30 AM',
      checkOut: '05:00 PM',
      totalHours: '8h 30m',
      location: 'Office - Floor 3',
    },
    {
      id: 5,
      date: '2025-12-27',
      status: 'present',
      checkIn: '09:10 AM',
      checkOut: '05:45 PM',
      totalHours: '8h 35m',
      location: 'Remote',
    },
  ];

  const handleCheckIn = (timestamp) => {
    console.log('Checked in at:', timestamp);
    setCurrentStatus('checked-in');
  };

  const handleCheckOut = (timestamp) => {
    console.log('Checked out at:', timestamp);
    setCurrentStatus('checked-out');
  };

  const handleFilterApply = (dates) => {
    setFilterDates(dates);
    console.log('Filter applied:', dates);
  };

  return (
    <>
      <Helmet>
        <title>Attendance Tracking - Dayflow HRMS</title>
        <meta
          name="description"
          content="Track your daily attendance, view weekly patterns, and manage your work hours with comprehensive reporting and analytics."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <DashboardNav userRole={userRole} />

        <main className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 lg:py-8">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
              Attendance Tracking
            </h1>
            <p className="text-sm lg:text-base font-body text-muted-foreground">
              Manage your daily attendance and view comprehensive time reports
            </p>
          </div>

          <div className="space-y-6 lg:space-y-8">
            <AttendanceCard
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
              currentStatus={currentStatus}
            />

            <WeeklyCalendar weekData={weekData} />

            <AttendanceSummary summaryData={summaryData} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="lg:col-span-2">
                <AttendanceHistory historyData={historyData} />
              </div>
              <div className="lg:col-span-1">
                <DateRangeFilter onFilterApply={handleFilterApply} />
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-border">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <p className="text-sm font-caption text-muted-foreground text-center lg:text-left">
                Attendance data is updated in real-time and synced across all devices
              </p>
              <p className="text-xs font-caption text-muted-foreground">
                Powered by <span className="text-primary font-medium">SHUBHAMOS</span>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AttendanceTracking;