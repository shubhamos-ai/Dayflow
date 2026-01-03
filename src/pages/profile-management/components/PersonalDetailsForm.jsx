import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PersonalDetailsForm = ({ userData, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    dateOfBirth: userData?.dateOfBirth || '',
    gender: userData?.gender || '',
    maritalStatus: userData?.maritalStatus || '',
    nationality: userData?.nationality || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    alternatePhone: userData?.alternatePhone || '',
    address: userData?.address || '',
    city: userData?.city || '',
    state: userData?.state || '',
    zipCode: userData?.zipCode || '',
    country: userData?.country || '',
    emergencyContactName: userData?.emergencyContactName || '',
    emergencyContactRelation: userData?.emergencyContactRelation || '',
    emergencyContactPhone: userData?.emergencyContactPhone || '',
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  ];

  const maritalStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
  ];

  const relationOptions = [
    { value: 'spouse', label: 'Spouse' },
    { value: 'parent', label: 'Parent' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'child', label: 'Child' },
    { value: 'friend', label: 'Friend' },
    { value: 'other', label: 'Other' },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData?.emergencyContactName?.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
    if (!formData?.emergencyContactPhone?.trim()) newErrors.emergencyContactPhone = 'Emergency contact phone is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      if (onSave) onSave(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      dateOfBirth: userData?.dateOfBirth || '',
      gender: userData?.gender || '',
      maritalStatus: userData?.maritalStatus || '',
      nationality: userData?.nationality || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      alternatePhone: userData?.alternatePhone || '',
      address: userData?.address || '',
      city: userData?.city || '',
      state: userData?.state || '',
      zipCode: userData?.zipCode || '',
      country: userData?.country || '',
      emergencyContactName: userData?.emergencyContactName || '',
      emergencyContactRelation: userData?.emergencyContactRelation || '',
      emergencyContactPhone: userData?.emergencyContactPhone || '',
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="personal-details-form glassmorphism rounded-xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
          Personal Information
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
            <Icon name="User" size={20} color="var(--color-primary)" />
            Basic Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="First Name"
              type="text"
              placeholder="Enter first name"
              value={formData?.firstName}
              onChange={(e) => handleChange('firstName', e?.target?.value)}
              error={errors?.firstName}
              required
              disabled={!isEditing}
            />
            <Input
              label="Last Name"
              type="text"
              placeholder="Enter last name"
              value={formData?.lastName}
              onChange={(e) => handleChange('lastName', e?.target?.value)}
              error={errors?.lastName}
              required
              disabled={!isEditing}
            />
            <Input
              label="Date of Birth"
              type="date"
              value={formData?.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e?.target?.value)}
              disabled={!isEditing}
            />
            <Select
              label="Gender"
              options={genderOptions}
              value={formData?.gender}
              onChange={(value) => handleChange('gender', value)}
              placeholder="Select gender"
              disabled={!isEditing}
            />
            <Select
              label="Marital Status"
              options={maritalStatusOptions}
              value={formData?.maritalStatus}
              onChange={(value) => handleChange('maritalStatus', value)}
              placeholder="Select marital status"
              disabled={!isEditing}
            />
            <Input
              label="Nationality"
              type="text"
              placeholder="Enter nationality"
              value={formData?.nationality}
              onChange={(e) => handleChange('nationality', e?.target?.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div>
          <h3 className="text-base md:text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
            <Icon name="Phone" size={20} color="var(--color-primary)" />
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter email address"
              value={formData?.email}
              onChange={(e) => handleChange('email', e?.target?.value)}
              error={errors?.email}
              required
              disabled={!isEditing}
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter phone number"
              value={formData?.phone}
              onChange={(e) => handleChange('phone', e?.target?.value)}
              error={errors?.phone}
              required
              disabled={!isEditing}
            />
            <Input
              label="Alternate Phone"
              type="tel"
              placeholder="Enter alternate phone"
              value={formData?.alternatePhone}
              onChange={(e) => handleChange('alternatePhone', e?.target?.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div>
          <h3 className="text-base md:text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
            <Icon name="MapPin" size={20} color="var(--color-primary)" />
            Address Details
          </h3>
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <Input
              label="Street Address"
              type="text"
              placeholder="Enter street address"
              value={formData?.address}
              onChange={(e) => handleChange('address', e?.target?.value)}
              disabled={!isEditing}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Input
                label="City"
                type="text"
                placeholder="Enter city"
                value={formData?.city}
                onChange={(e) => handleChange('city', e?.target?.value)}
                disabled={!isEditing}
              />
              <Input
                label="State/Province"
                type="text"
                placeholder="Enter state"
                value={formData?.state}
                onChange={(e) => handleChange('state', e?.target?.value)}
                disabled={!isEditing}
              />
              <Input
                label="ZIP/Postal Code"
                type="text"
                placeholder="Enter ZIP code"
                value={formData?.zipCode}
                onChange={(e) => handleChange('zipCode', e?.target?.value)}
                disabled={!isEditing}
              />
              <Input
                label="Country"
                type="text"
                placeholder="Enter country"
                value={formData?.country}
                onChange={(e) => handleChange('country', e?.target?.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-base md:text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
            <Icon name="AlertCircle" size={20} color="var(--color-error)" />
            Emergency Contact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Contact Name"
              type="text"
              placeholder="Enter emergency contact name"
              value={formData?.emergencyContactName}
              onChange={(e) => handleChange('emergencyContactName', e?.target?.value)}
              error={errors?.emergencyContactName}
              required
              disabled={!isEditing}
            />
            <Select
              label="Relationship"
              options={relationOptions}
              value={formData?.emergencyContactRelation}
              onChange={(value) => handleChange('emergencyContactRelation', value)}
              placeholder="Select relationship"
              disabled={!isEditing}
            />
            <Input
              label="Contact Phone"
              type="tel"
              placeholder="Enter emergency contact phone"
              value={formData?.emergencyContactPhone}
              onChange={(e) => handleChange('emergencyContactPhone', e?.target?.value)}
              error={errors?.emergencyContactPhone}
              required
              disabled={!isEditing}
            />
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

export default PersonalDetailsForm;