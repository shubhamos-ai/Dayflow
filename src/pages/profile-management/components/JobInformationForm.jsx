import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const JobInformationForm = ({ jobData, onSave }) => {
  const [formData, setFormData] = useState({
    employeeId: jobData?.employeeId || '',
    designation: jobData?.designation || '',
    department: jobData?.department || '',
    reportingManager: jobData?.reportingManager || '',
    joiningDate: jobData?.joiningDate || '',
    employmentType: jobData?.employmentType || '',
    workLocation: jobData?.workLocation || '',
    workSchedule: jobData?.workSchedule || '',
    probationPeriod: jobData?.probationPeriod || '',
    confirmationDate: jobData?.confirmationDate || '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const employmentTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'intern', label: 'Intern' },
  ];

  const workScheduleOptions = [
    { value: '9-to-5', label: '9:00 AM - 5:00 PM' },
    { value: '10-to-6', label: '10:00 AM - 6:00 PM' },
    { value: 'flexible', label: 'Flexible Hours' },
    { value: 'shift-based', label: 'Shift-based' },
  ];

  const departmentOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'operations', label: 'Operations' },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (onSave) onSave(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      employeeId: jobData?.employeeId || '',
      designation: jobData?.designation || '',
      department: jobData?.department || '',
      reportingManager: jobData?.reportingManager || '',
      joiningDate: jobData?.joiningDate || '',
      employmentType: jobData?.employmentType || '',
      workLocation: jobData?.workLocation || '',
      workSchedule: jobData?.workSchedule || '',
      probationPeriod: jobData?.probationPeriod || '',
      confirmationDate: jobData?.confirmationDate || '',
    });
    setIsEditing(false);
  };

  const employmentHistory = [
    {
      id: 1,
      position: "Senior Software Engineer",
      period: "Jan 2024 - Present",
      description: "Leading development team for core product features and mentoring junior developers"
    },
    {
      id: 2,
      position: "Software Engineer",
      period: "Jun 2022 - Dec 2023",
      description: "Developed and maintained multiple client-facing applications using React and Node.js"
    },
    {
      id: 3,
      position: "Junior Developer",
      period: "Jan 2021 - May 2022",
      description: "Contributed to frontend development and bug fixes for internal tools"
    }
  ];

  return (
    <div className="job-information-form glassmorphism rounded-xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
          Job Information
        </h2>
        {!isEditing && (
          <Button
            variant="outline"
            size="default"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="space-y-6 md:space-y-8">
        <div>
          <h3 className="text-base md:text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
            <Icon name="Briefcase" size={20} color="var(--color-primary)" />
            Position Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Employee ID"
              type="text"
              placeholder="Enter employee ID"
              value={formData?.employeeId}
              onChange={(e) => handleChange('employeeId', e?.target?.value)}
              disabled
            />
            <Input
              label="Designation"
              type="text"
              placeholder="Enter designation"
              value={formData?.designation}
              onChange={(e) => handleChange('designation', e?.target?.value)}
              disabled={!isEditing}
            />
            <Select
              label="Department"
              options={departmentOptions}
              value={formData?.department}
              onChange={(value) => handleChange('department', value)}
              placeholder="Select department"
              disabled={!isEditing}
            />
            <Input
              label="Reporting Manager"
              type="text"
              placeholder="Enter reporting manager"
              value={formData?.reportingManager}
              onChange={(e) => handleChange('reportingManager', e?.target?.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div>
          <h3 className="text-base md:text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
            <Icon name="Calendar" size={20} color="var(--color-primary)" />
            Employment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Joining Date"
              type="date"
              value={formData?.joiningDate}
              onChange={(e) => handleChange('joiningDate', e?.target?.value)}
              disabled={!isEditing}
            />
            <Select
              label="Employment Type"
              options={employmentTypeOptions}
              value={formData?.employmentType}
              onChange={(value) => handleChange('employmentType', value)}
              placeholder="Select employment type"
              disabled={!isEditing}
            />
            <Input
              label="Work Location"
              type="text"
              placeholder="Enter work location"
              value={formData?.workLocation}
              onChange={(e) => handleChange('workLocation', e?.target?.value)}
              disabled={!isEditing}
            />
            <Select
              label="Work Schedule"
              options={workScheduleOptions}
              value={formData?.workSchedule}
              onChange={(value) => handleChange('workSchedule', value)}
              placeholder="Select work schedule"
              disabled={!isEditing}
            />
            <Input
              label="Probation Period (months)"
              type="number"
              placeholder="Enter probation period"
              value={formData?.probationPeriod}
              onChange={(e) => handleChange('probationPeriod', e?.target?.value)}
              disabled={!isEditing}
            />
            <Input
              label="Confirmation Date"
              type="date"
              value={formData?.confirmationDate}
              onChange={(e) => handleChange('confirmationDate', e?.target?.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div>
          <h3 className="text-base md:text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
            <Icon name="History" size={20} color="var(--color-primary)" />
            Employment History
          </h3>
          <div className="space-y-4">
            {employmentHistory?.map((history) => (
              <div
                key={history?.id}
                className="bg-muted/50 rounded-lg p-4 md:p-6 border border-border"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h4 className="text-base md:text-lg font-heading font-semibold text-foreground">
                    {history?.position}
                  </h4>
                  <span className="text-sm font-caption text-muted-foreground mt-1 sm:mt-0">
                    {history?.period}
                  </span>
                </div>
                <p className="text-sm md:text-base font-body text-foreground">
                  {history?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            size="lg"
            iconName="Save"
            iconPosition="left"
            onClick={handleSave}
            className="gradient-primary"
          >
            Save Changes
          </Button>
          <Button
            variant="outline"
            size="lg"
            iconName="X"
            iconPosition="left"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobInformationForm;