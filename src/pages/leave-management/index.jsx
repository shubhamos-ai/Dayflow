import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import DashboardNav from '../../components/ui/DashboardNav';
import LeaveApplicationForm from './components/LeaveApplicationForm';
import LeaveCalendar from './components/LeaveCalendar';
import LeaveHistoryTable from './components/LeaveHistoryTable';
import LeaveBalanceCard from './components/LeaveBalanceCard';

const LeaveManagement = () => {
  const [userRole, setUserRole] = useState('employee');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'employee';
    const userName = localStorage.getItem('userName') || 'Current User';
    setUserRole(role);
    setSelectedEmployee({ name: userName, id: localStorage.getItem('userId') });
  }, []);

  const leaveBalances = [
    { type: 'Annual', total: 20, used: 8, remaining: 12, color: 'primary' },
    { type: 'Sick', total: 10, used: 3, remaining: 7, color: 'success' },
    { type: 'Personal', total: 5, used: 2, remaining: 3, color: 'accent' },
    { type: 'Emergency', total: 3, used: 0, remaining: 3, color: 'warning' },
  ];

  const mockLeaveHistory = [
    {
      id: 1,
      employeeName: 'Sarah Mitchell',
      leaveType: 'Annual',
      startDate: '2026-01-15',
      endDate: '2026-01-17',
      days: 3,
      reason: 'Family vacation',
      status: 'Approved',
      appliedDate: '2026-01-01',
      approvedBy: 'Michael Chen',
      approverComments: 'Approved. Enjoy your vacation!',
    },
    {
      id: 2,
      employeeName: 'Sarah Mitchell',
      leaveType: 'Sick',
      startDate: '2025-12-20',
      endDate: '2025-12-20',
      days: 1,
      reason: 'Medical appointment',
      status: 'Approved',
      appliedDate: '2025-12-19',
      approvedBy: 'Michael Chen',
      approverComments: 'Get well soon!',
    },
    {
      id: 3,
      employeeName: 'Sarah Mitchell',
      leaveType: 'Personal',
      startDate: '2026-02-10',
      endDate: '2026-02-11',
      days: 2,
      reason: 'Personal matters',
      status: 'Pending',
      appliedDate: '2026-01-03',
      approvedBy: null,
      approverComments: null,
    },
    {
      id: 4,
      employeeName: 'Sarah Mitchell',
      leaveType: 'Annual',
      startDate: '2025-11-25',
      endDate: '2025-11-26',
      days: 2,
      reason: 'Thanksgiving holiday',
      status: 'Rejected',
      appliedDate: '2025-11-15',
      approvedBy: 'Michael Chen',
      approverComments: 'Already at capacity for this period.',
    },
  ];

  const handleLeaveSubmit = (leaveData) => {
    console.log('Leave application submitted:', leaveData);
    const newRequest = {
      id: leaveRequests?.length + 1,
      ...leaveData,
      employeeName: selectedEmployee?.name,
      status: 'Pending',
      appliedDate: new Date()?.toISOString()?.split('T')?.[0],
      approvedBy: null,
      approverComments: null,
    };
    setLeaveRequests([...leaveRequests, newRequest]);
  };

  const handleApprove = (requestId, comments) => {
    console.log('Approving request:', requestId, comments);
  };

  const handleReject = (requestId, comments) => {
    console.log('Rejecting request:', requestId, comments);
  };

  return (
    <>
      <Helmet>
        <title>Leave Management - Dayflow HRMS</title>
        <meta
          name="description"
          content="Manage leave requests, view leave balance, and track time-off in Dayflow HRMS"
        />
      </Helmet>

      <DashboardNav userRole={userRole} />

      <div className="min-h-screen bg-background">
        <div className="absolute inset-0 gradient-primary opacity-5" />

        <div className="relative max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-2">
              Leave Management
            </h1>
            <p className="text-base md:text-lg font-body text-muted-foreground">
              Apply for time-off and track your leave requests
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <LeaveApplicationForm onSubmit={handleLeaveSubmit} />
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="glassmorphism rounded-xl p-6 md:p-8 shadow-md">
                <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-6">
                  Leave Balance
                </h2>
                <div className="space-y-4">
                  {leaveBalances?.map((balance) => (
                    <LeaveBalanceCard key={balance?.type} balance={balance} />
                  ))}
                </div>
              </div>

              <LeaveCalendar leaveRequests={mockLeaveHistory} />
            </div>
          </div>

          <LeaveHistoryTable
            requests={mockLeaveHistory}
            userRole={userRole}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </div>
      </div>
    </>
  );
};

export default LeaveManagement;