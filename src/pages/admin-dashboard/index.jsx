import React, { useState, useMemo } from 'react';
import DashboardNav from '../../components/ui/DashboardNav';
import MetricsCard from './components/MetricsCard';
import FilterControls from './components/FilterControls';
import EmployeeTable from './components/EmployeeTable';
import EmployeeProfileModal from './components/EmployeeProfileModal';
import AddEmployeeModal from './components/AddEmployeeModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AdminDashboard = () => {
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    role: '',
    status: ''
  });

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const mockEmployees = [
  {
    id: 1,
    name: "Sarah Johnson",
    employeeId: "EMP001",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15b51d2e4-1763293833337.png",
    avatarAlt: "Professional headshot of woman with blonde hair in navy blazer smiling at camera",
    email: "sarah.johnson@dayflow.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    role: "Senior Software Engineer",
    status: "Present",
    recentActivity: "Checked in at 9:00 AM today",
    attendanceSummary: { present: 22, absent: 0, halfDay: 1, leave: 2 }
  },
  {
    id: 2,
    name: "Michael Chen",
    employeeId: "EMP002",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13a48293d-1763296098326.png",
    avatarAlt: "Professional headshot of Asian man with short black hair in gray suit",
    email: "michael.chen@dayflow.com",
    phone: "+1 (555) 234-5678",
    department: "Marketing",
    role: "Marketing Manager",
    status: "Present",
    recentActivity: "Checked in at 8:45 AM today",
    attendanceSummary: { present: 23, absent: 0, halfDay: 0, leave: 2 }
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    employeeId: "EMP003",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1de57631c-1763294258585.png",
    avatarAlt: "Professional headshot of Hispanic woman with long brown hair in white blouse",
    email: "emily.rodriguez@dayflow.com",
    phone: "+1 (555) 345-6789",
    department: "Human Resources",
    role: "HR Specialist",
    status: "Leave",
    recentActivity: "On paid leave until 01/05/2026",
    attendanceSummary: { present: 20, absent: 0, halfDay: 0, leave: 5 }
  },
  {
    id: 4,
    name: "David Kim",
    employeeId: "EMP004",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d9c01fc7-1763293980541.png",
    avatarAlt: "Professional headshot of Korean man with glasses in dark blue suit",
    email: "david.kim@dayflow.com",
    phone: "+1 (555) 456-7890",
    department: "Engineering",
    role: "DevOps Engineer",
    status: "Present",
    recentActivity: "Checked in at 9:15 AM today",
    attendanceSummary: { present: 21, absent: 1, halfDay: 1, leave: 2 }
  },
  {
    id: 5,
    name: "Jessica Williams",
    employeeId: "EMP005",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17faa8e7a-1763295754680.png",
    avatarAlt: "Professional headshot of African American woman with curly hair in burgundy blazer",
    email: "jessica.williams@dayflow.com",
    phone: "+1 (555) 567-8901",
    department: "Sales",
    role: "Sales Executive",
    status: "Half-day",
    recentActivity: "Checked in at 9:00 AM, left at 1:00 PM",
    attendanceSummary: { present: 20, absent: 0, halfDay: 3, leave: 2 }
  },
  {
    id: 6,
    name: "Robert Taylor",
    employeeId: "EMP006",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cef3e3c2-1763295620422.png",
    avatarAlt: "Professional headshot of Caucasian man with brown hair in charcoal suit",
    email: "robert.taylor@dayflow.com",
    phone: "+1 (555) 678-9012",
    department: "Finance",
    role: "Financial Analyst",
    status: "Present",
    recentActivity: "Checked in at 8:30 AM today",
    attendanceSummary: { present: 24, absent: 0, halfDay: 0, leave: 1 }
  },
  {
    id: 7,
    name: "Amanda Martinez",
    employeeId: "EMP007",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d9f45209-1763294258604.png",
    avatarAlt: "Professional headshot of woman with red hair in teal blouse smiling warmly",
    email: "amanda.martinez@dayflow.com",
    phone: "+1 (555) 789-0123",
    department: "Design",
    role: "UX Designer",
    status: "Absent",
    recentActivity: "No check-in recorded today",
    attendanceSummary: { present: 19, absent: 3, halfDay: 1, leave: 2 }
  },
  {
    id: 8,
    name: "James Anderson",
    employeeId: "EMP008",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_140473dbf-1763294158373.png",
    avatarAlt: "Professional headshot of man with beard in navy blue shirt",
    email: "james.anderson@dayflow.com",
    phone: "+1 (555) 890-1234",
    department: "Engineering",
    role: "Frontend Developer",
    status: "Present",
    recentActivity: "Checked in at 9:30 AM today",
    attendanceSummary: { present: 22, absent: 1, halfDay: 0, leave: 2 }
  }];


  const departments = [
  { value: '', label: 'All Departments' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Human Resources', label: 'Human Resources' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Design', label: 'Design' }];


  const roles = [
  { value: '', label: 'All Roles' },
  { value: 'Senior Software Engineer', label: 'Senior Software Engineer' },
  { value: 'Marketing Manager', label: 'Marketing Manager' },
  { value: 'HR Specialist', label: 'HR Specialist' },
  { value: 'DevOps Engineer', label: 'DevOps Engineer' },
  { value: 'Sales Executive', label: 'Sales Executive' },
  { value: 'Financial Analyst', label: 'Financial Analyst' },
  { value: 'UX Designer', label: 'UX Designer' },
  { value: 'Frontend Developer', label: 'Frontend Developer' }];


  const statuses = [
  { value: '', label: 'All Statuses' },
  { value: 'Present', label: 'Present' },
  { value: 'Absent', label: 'Absent' },
  { value: 'Half-day', label: 'Half-day' },
  { value: 'Leave', label: 'Leave' }];


  const filteredEmployees = useMemo(() => {
    return mockEmployees?.filter((employee) => {
      const matchesSearch = !filters?.search ||
      employee?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      employee?.employeeId?.toLowerCase()?.includes(filters?.search?.toLowerCase());

      const matchesDepartment = !filters?.department || employee?.department === filters?.department;
      const matchesRole = !filters?.role || employee?.role === filters?.role;
      const matchesStatus = !filters?.status || employee?.status === filters?.status;

      return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
    });
  }, [filters, mockEmployees]);

  const metrics = {
    totalEmployees: mockEmployees?.length,
    presentToday: mockEmployees?.filter((e) => e?.status === 'Present')?.length,
    pendingLeaves: 3,
    attendanceRate: 87.5
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      department: '',
      role: '',
      status: ''
    });
  };

  const handleViewProfile = (employee) => {
    setSelectedEmployee(employee);
    setShowProfileModal(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowProfileModal(true);
  };

  const handleDeleteEmployee = (employee) => {
    alert(`Delete functionality for ${employee?.name} would be implemented here`);
  };

  const handleAddEmployee = (formData) => {
    alert(`New employee ${formData?.name} would be added here`);
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav userRole="admin" />
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-base lg:text-lg font-body text-muted-foreground">
            Comprehensive workforce management and organizational oversight
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8 lg:mb-12">
          <MetricsCard
            title="Total Employees"
            value={metrics?.totalEmployees}
            subtitle="Active workforce"
            icon="Users"
            iconBgColor="bg-gradient-primary"
            trend="up"
            trendValue="+2 this month" />

          <MetricsCard
            title="Present Today"
            value={metrics?.presentToday}
            subtitle={`${(metrics?.presentToday / metrics?.totalEmployees * 100)?.toFixed(1)}% attendance`}
            icon="CheckCircle"
            iconBgColor="bg-success"
            trend="up"
            trendValue="+5%" />

          <MetricsCard
            title="Pending Leaves"
            value={metrics?.pendingLeaves}
            subtitle="Awaiting approval"
            icon="Clock"
            iconBgColor="bg-warning" />

          <MetricsCard
            title="Attendance Rate"
            value={`${metrics?.attendanceRate}%`}
            subtitle="This month"
            icon="TrendingUp"
            iconBgColor="bg-accent"
            trend="up"
            trendValue="+2.5%" />

        </div>

        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2">
                Employee Management
              </h2>
              <p className="text-sm lg:text-base font-body text-muted-foreground">
                View and manage all employees in your organization
              </p>
            </div>
            <Button
              variant="default"
              size="lg"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setShowAddModal(true)}
              className="gradient-primary lg:w-auto">

              Add Employee
            </Button>
          </div>

          <FilterControls
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            resultsCount={filteredEmployees?.length}
            departments={departments}
            roles={roles}
            statuses={statuses} />

        </div>

        <div className="glassmorphism rounded-xl shadow-md overflow-hidden">
          <EmployeeTable
            employees={filteredEmployees}
            onViewProfile={handleViewProfile}
            onEditEmployee={handleEditEmployee}
            onDeleteEmployee={handleDeleteEmployee} />

        </div>

        {filteredEmployees?.length === 0 &&
        <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Icon name="Users" size={48} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
              No employees found
            </h3>
            <p className="text-base font-body text-muted-foreground mb-6">
              Try adjusting your filters or add a new employee
            </p>
            <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setShowAddModal(true)}
            className="gradient-primary">

              Add Employee
            </Button>
          </div>
        }
      </div>
      {showProfileModal &&
      <EmployeeProfileModal
        employee={selectedEmployee}
        onClose={() => {
          setShowProfileModal(false);
          setSelectedEmployee(null);
        }}
        onEdit={handleEditEmployee} />

      }
      {showAddModal &&
      <AddEmployeeModal
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddEmployee}
        departments={departments?.filter((d) => d?.value)}
        roles={roles?.filter((r) => r?.value)} />

      }
      <footer className="mt-16 py-8 border-t border-border">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8">
          <p className="text-center text-sm font-caption text-muted-foreground">
            Powered by <span className="text-primary font-medium">SHUBHAMOS</span> &copy; {new Date()?.getFullYear()} Dayflow HRMS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>);

};

export default AdminDashboard;