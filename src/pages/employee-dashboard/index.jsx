import React, { useState, useEffect } from 'react';
import DashboardNav from '../../components/ui/DashboardNav';
import ProfileCard from './components/ProfileCard';
import QuickActionButton from './components/QuickActionButton';
import ActivityItem from './components/ActivityItem';
import WeeklyAttendanceSummary from './components/WeeklyAttendanceSummary';
import AttendanceCard from '../../components/ui/AttendanceCard';

const EmployeeDashboard = () => {
  const [currentStatus, setCurrentStatus] = useState('checked-out');

  const employeeData = {
    name: "Sarah Mitchell",
    employeeId: "EMP-2024-1847",
    department: "Engineering",
    designation: "Senior Software Engineer",
    email: "sarah.mitchell@dayflow.com",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_12474730f-1763296027036.png",
    profileImageAlt: "Professional headshot of a woman with long brown hair wearing a navy blue blazer and white shirt, smiling warmly at the camera in an office setting",
    attendanceStatus: "Present"
  };

  const recentActivities = [
  {
    type: "leave",
    title: "Leave Request Submitted",
    description: "Annual leave for Dec 20-22, 2025 is pending approval",
    status: "Pending",
    time: "2 hours ago"
  },
  {
    type: "attendance",
    title: "Check-in Recorded",
    description: "You checked in at 09:15 AM today",
    status: "Approved",
    time: "5 hours ago"
  },
  {
    type: "payroll",
    title: "Salary Credited",
    description: "December 2025 salary has been processed",
    status: "Approved",
    time: "2 days ago"
  },
  {
    type: "document",
    title: "Document Uploaded",
    description: "Tax declaration form submitted successfully",
    status: "Approved",
    time: "3 days ago"
  }];


  const weeklyAttendanceData = {
    totalDays: 7,
    presentDays: 5,
    absentDays: 0,
    halfDays: 1,
    leaveDays: 1,
    days: [
    { dayName: "Mon", date: "12/30", status: "Present" },
    { dayName: "Tue", date: "12/31", status: "Present" },
    { dayName: "Wed", date: "01/01", status: "Leave" },
    { dayName: "Thu", date: "01/02", status: "Present" },
    { dayName: "Fri", date: "01/03", status: "Present" },
    { dayName: "Sat", date: "01/04", status: "Half-day" },
    { dayName: "Sun", date: "01/05", status: "Present" }]

  };

  const handleCheckIn = (time) => {
    setCurrentStatus('checked-in');
    console.log('Checked in at:', time);
  };

  const handleCheckOut = (time) => {
    setCurrentStatus('checked-out');
    console.log('Checked out at:', time);
  };

  useEffect(() => {
    document.title = "Employee Dashboard - Dayflow HRMS";
  }, []);

  return (
    <div className="employee-dashboard min-h-screen bg-background">
      <DashboardNav userRole="employee" />
      <main className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-2">
            Welcome Back, Sarah! 👋
          </h1>
          <p className="text-base md:text-lg font-body text-muted-foreground">
            Here's what's happening with your work today
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          <div className="lg:col-span-2">
            <ProfileCard employee={employeeData} />
          </div>
          <div className="lg:col-span-1">
            <AttendanceCard
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
              currentStatus={currentStatus} />

          </div>
        </div>

        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4 md:mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <QuickActionButton
              icon="Clock"
              label="Attendance"
              description="View your attendance history"
              path="/attendance-tracking"
              gradient={false} />

            <QuickActionButton
              icon="Calendar"
              label="Apply Leave"
              description="Request time off"
              path="/attendance-tracking"
              gradient={true} />

            <QuickActionButton
              icon="DollarSign"
              label="Payroll"
              description="View salary details"
              path="/profile-management"
              gradient={false} />

            <QuickActionButton
              icon="User"
              label="My Profile"
              description="Manage your information"
              path="/profile-management"
              gradient={false} />

          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2">
            <WeeklyAttendanceSummary weekData={weeklyAttendanceData} />
          </div>

          <div className="lg:col-span-1">
            <div className="glassmorphism rounded-xl p-6 md:p-8 shadow-md">
              <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-6">
                Recent Activity
              </h3>
              <div className="space-y-2">
                {recentActivities?.map((activity, index) =>
                <ActivityItem key={index} activity={activity} />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border text-center">
          <p className="text-sm font-caption text-muted-foreground">
            Powered by <span className="text-primary font-medium">SHUBHAMOS</span> • {new Date()?.getFullYear()} Dayflow HRMS
          </p>
        </div>
      </main>
    </div>);

};

export default EmployeeDashboard;