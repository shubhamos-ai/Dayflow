import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EmployeeProfileModal = ({ employee, onClose, onEdit }) => {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="glassmorphism rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            Employee Profile
          </h2>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
            aria-label="Close modal"
          />
        </div>

        <div className="p-6 lg:p-8">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0">
              <Image
                src={employee?.avatar}
                alt={employee?.avatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
                {employee?.name}
              </h3>
              <p className="text-lg font-body text-muted-foreground mb-3">
                {employee?.role}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 rounded-md text-sm font-body font-medium bg-primary/10 text-primary data-text">
                  {employee?.employeeId}
                </span>
                <span className={`px-3 py-1 rounded-md text-sm font-body font-medium ${
                  employee?.status === 'Present' ? 'bg-success/10 text-success' :
                  employee?.status === 'Absent' ? 'bg-error/10 text-error' :
                  employee?.status === 'Half-day'? 'bg-warning/10 text-warning' : 'bg-accent/10 text-accent'
                }`}>
                  {employee?.status}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="Briefcase" size={20} className="text-primary" />
                Job Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-caption text-muted-foreground mb-1">Department</p>
                  <p className="font-body font-medium text-foreground">{employee?.department}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-caption text-muted-foreground mb-1">Role</p>
                  <p className="font-body font-medium text-foreground">{employee?.role}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-caption text-muted-foreground mb-1">Email</p>
                  <p className="font-body font-medium text-foreground">{employee?.email}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-caption text-muted-foreground mb-1">Phone</p>
                  <p className="font-body font-medium text-foreground data-text">{employee?.phone}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="Clock" size={20} className="text-primary" />
                Recent Activity
              </h4>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-body text-foreground">{employee?.recentActivity}</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="Calendar" size={20} className="text-primary" />
                Attendance Summary
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-success/5 border border-success/20 rounded-lg text-center">
                  <p className="text-2xl font-heading font-bold text-success mb-1 data-text">
                    {employee?.attendanceSummary?.present}
                  </p>
                  <p className="text-sm font-caption text-muted-foreground">Present</p>
                </div>
                <div className="p-4 bg-error/5 border border-error/20 rounded-lg text-center">
                  <p className="text-2xl font-heading font-bold text-error mb-1 data-text">
                    {employee?.attendanceSummary?.absent}
                  </p>
                  <p className="text-sm font-caption text-muted-foreground">Absent</p>
                </div>
                <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg text-center">
                  <p className="text-2xl font-heading font-bold text-warning mb-1 data-text">
                    {employee?.attendanceSummary?.halfDay}
                  </p>
                  <p className="text-sm font-caption text-muted-foreground">Half-day</p>
                </div>
                <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg text-center">
                  <p className="text-2xl font-heading font-bold text-accent mb-1 data-text">
                    {employee?.attendanceSummary?.leave}
                  </p>
                  <p className="text-sm font-caption text-muted-foreground">Leave</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-8 pt-6 border-t border-border">
            <Button
              variant="default"
              iconName="Edit"
              iconPosition="left"
              onClick={() => onEdit(employee)}
              fullWidth
              className="gradient-primary"
            >
              Edit Profile
            </Button>
            <Button
              variant="outline"
              iconName="X"
              iconPosition="left"
              onClick={onClose}
              fullWidth
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileModal;