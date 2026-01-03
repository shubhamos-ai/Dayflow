import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LeaveApplicationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    document: null,
  });

  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState('');

  const leaveTypeOptions = [
    { value: 'Annual', label: 'Annual Leave' },
    { value: 'Sick', label: 'Sick Leave' },
    { value: 'Personal', label: 'Personal Leave' },
    { value: 'Emergency', label: 'Emergency Leave' },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, document: file }));
      setFileName(file?.name);
    }
  };

  const calculateDays = () => {
    if (formData?.startDate && formData?.endDate) {
      const start = new Date(formData?.startDate);
      const end = new Date(formData?.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.leaveType) newErrors.leaveType = 'Leave type is required';
    if (!formData?.startDate) newErrors.startDate = 'Start date is required';
    if (!formData?.endDate) newErrors.endDate = 'End date is required';
    if (!formData?.reason?.trim()) newErrors.reason = 'Reason is required';

    if (formData?.startDate && formData?.endDate) {
      const start = new Date(formData?.startDate);
      const end = new Date(formData?.endDate);
      if (end < start) {
        newErrors.endDate = 'End date cannot be before start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      const days = calculateDays();
      if (onSubmit) onSubmit({ ...formData, days });
      setFormData({
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: '',
        document: null,
      });
      setFileName('');
      setErrors({});
    }
  };

  const days = calculateDays();

  return (
    <div className="leave-application-form glassmorphism rounded-xl p-6 md:p-8 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
          <Icon name="FileText" size={24} color="#FFFFFF" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
            Apply for Leave
          </h2>
          <p className="text-sm font-body text-muted-foreground">
            Submit your time-off request
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Select
          label="Leave Type"
          placeholder="Select leave type"
          options={leaveTypeOptions}
          value={formData?.leaveType}
          onChange={(value) => handleChange('leaveType', value)}
          error={errors?.leaveType}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={formData?.startDate}
            onChange={(e) => handleChange('startDate', e?.target?.value)}
            error={errors?.startDate}
            required
          />
          <Input
            label="End Date"
            type="date"
            value={formData?.endDate}
            onChange={(e) => handleChange('endDate', e?.target?.value)}
            error={errors?.endDate}
            required
          />
        </div>

        {days > 0 && (
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm font-body font-medium text-foreground">
              <Icon name="Calendar" size={16} className="inline mr-2" />
              Total Days: <span className="text-primary font-semibold">{days} day{days > 1 ? 's' : ''}</span>
            </p>
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Reason <span className="text-destructive">*</span>
          </label>
          <textarea
            className="w-full h-32 px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            placeholder="Please provide a reason for your leave request..."
            value={formData?.reason}
            onChange={(e) => handleChange('reason', e?.target?.value)}
          />
          {errors?.reason && (
            <p className="text-sm text-destructive mt-1">{errors?.reason}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Supporting Document (Optional)
          </label>
          <div className="flex items-center gap-4">
            <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md border-2 border-dashed border-input hover:border-primary transition-smooth cursor-pointer">
              <Icon name="Upload" size={20} color="var(--color-primary)" />
              <span className="text-sm font-body text-muted-foreground">
                {fileName || 'Choose file to upload'}
              </span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            iconName="Send"
            iconPosition="left"
            fullWidth
          >
            Submit Request
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => {
              setFormData({
                leaveType: '',
                startDate: '',
                endDate: '',
                reason: '',
                document: null,
              });
              setFileName('');
              setErrors({});
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LeaveApplicationForm;