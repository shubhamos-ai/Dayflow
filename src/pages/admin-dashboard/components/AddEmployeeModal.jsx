import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddEmployeeModal = ({ onClose, onSubmit, departments, roles }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    employeeId: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.name?.trim()) newErrors.name = 'Name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone is required';
    if (!formData?.department) newErrors.department = 'Department is required';
    if (!formData?.role) newErrors.role = 'Role is required';
    if (!formData?.employeeId?.trim()) newErrors.employeeId = 'Employee ID is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="glassmorphism rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            Add New Employee
          </h2>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
            aria-label="Close modal"
          />
        </div>

        <form onSubmit={handleSubmit} className="p-6 lg:p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter full name"
                value={formData?.name}
                onChange={(e) => handleChange('name', e?.target?.value)}
                error={errors?.name}
                required
              />

              <Input
                label="Employee ID"
                type="text"
                placeholder="e.g., EMP001"
                value={formData?.employeeId}
                onChange={(e) => handleChange('employeeId', e?.target?.value)}
                error={errors?.employeeId}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Email Address"
                type="email"
                placeholder="employee@company.com"
                value={formData?.email}
                onChange={(e) => handleChange('email', e?.target?.value)}
                error={errors?.email}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData?.phone}
                onChange={(e) => handleChange('phone', e?.target?.value)}
                error={errors?.phone}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Department"
                placeholder="Select department"
                options={departments}
                value={formData?.department}
                onChange={(value) => handleChange('department', value)}
                error={errors?.department}
                required
              />

              <Select
                label="Role"
                placeholder="Select role"
                options={roles}
                value={formData?.role}
                onChange={(value) => handleChange('role', value)}
                error={errors?.role}
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-8 pt-6 border-t border-border">
            <Button
              type="submit"
              variant="default"
              iconName="Plus"
              iconPosition="left"
              fullWidth
              className="gradient-primary"
            >
              Add Employee
            </Button>
            <Button
              type="button"
              variant="outline"
              iconName="X"
              iconPosition="left"
              onClick={onClose}
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;