import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { registerUser, clearError } from '../../../store/slices/authSlice';

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error: authError } = useSelector((state) => state?.auth);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    employeeId: '',
    department: '',
    role: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');

  const departmentOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'operations', label: 'Operations' },
    { value: 'it', label: 'Information Technology' },
    { value: 'legal', label: 'Legal' }
  ];

  const roleOptions = [
    { value: 'employee', label: 'Employee' },
    { value: 'admin', label: 'Admin' }
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const checkPasswordStrength = (password) => {
    if (password?.length === 0) return '';
    if (password?.length < 6) return 'weak';
    if (password?.length < 10) return 'medium';
    
    const hasUpperCase = /[A-Z]/?.test(password);
    const hasLowerCase = /[a-z]/?.test(password);
    const hasNumbers = /\d/?.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/?.test(password);
    
    const strengthCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar]?.filter(Boolean)?.length;
    
    if (strengthCount >= 3 && password?.length >= 10) return 'strong';
    if (strengthCount >= 2) return 'medium';
    return 'weak';
  };

  const validateEmployeeId = (id) => {
    const existingIds = ['EMP001', 'EMP002', 'EMP003'];
    return !existingIds?.includes(id?.toUpperCase());
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (authError) {
      dispatch(clearError());
    }

    if (name === 'password') {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({ ...prev, agreeToTerms: e?.target?.checked }));
    if (errors?.agreeToTerms) {
      setErrors(prev => ({ ...prev, agreeToTerms: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.employeeId?.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    } else if (!validateEmployeeId(formData?.employeeId)) {
      newErrors.employeeId = 'This Employee ID is already taken';
    }

    if (!formData?.department) {
      newErrors.department = 'Please select a department';
    }

    if (!formData?.role) {
      newErrors.role = 'Please select a role';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await dispatch(registerUser({
      fullName: formData?.fullName,
      email: formData?.email,
      password: formData?.password,
      employeeId: formData?.employeeId,
      department: formData?.department,
      role: formData?.role
    }));

    if (registerUser?.fulfilled?.match(result)) {
      navigate('/login');
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'bg-error';
      case 'medium': return 'bg-warning';
      case 'strong': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 'weak': return 'Weak password';
      case 'medium': return 'Medium strength';
      case 'strong': return 'Strong password';
      default: return '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full Name"
        type="text"
        name="fullName"
        placeholder="Enter your full name"
        value={formData?.fullName}
        onChange={handleInputChange}
        error={errors?.fullName}
        required
      />
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email address"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
      />
      <div>
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
        />
        {passwordStrength && (
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ 
                    width: passwordStrength === 'weak' ? '33%' : 
                           passwordStrength === 'medium' ? '66%' : '100%' 
                  }}
                />
              </div>
            </div>
            <p className={`text-xs font-caption ${
              passwordStrength === 'weak' ? 'text-error' :
              passwordStrength === 'medium' ? 'text-warning' : 'text-success'
            }`}>
              {getPasswordStrengthText()}
            </p>
          </div>
        )}
      </div>
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Re-enter your password"
        value={formData?.confirmPassword}
        onChange={handleInputChange}
        error={errors?.confirmPassword}
        required
      />
      <Input
        label="Employee ID"
        type="text"
        name="employeeId"
        placeholder="Enter your employee ID"
        value={formData?.employeeId}
        onChange={handleInputChange}
        error={errors?.employeeId}
        description="Use a unique identifier (e.g., EMP1234)"
        required
      />
      <Select
        label="Department"
        placeholder="Select your department"
        options={departmentOptions}
        value={formData?.department}
        onChange={(value) => handleSelectChange('department', value)}
        error={errors?.department}
        searchable
        required
      />
      <Select
        label="Role"
        placeholder="Select your role"
        options={roleOptions}
        value={formData?.role}
        onChange={(value) => handleSelectChange('role', value)}
        error={errors?.role}
        description="Admin role requires approval from HR"
        required
      />
      <div className="flex items-start gap-3">
        <Checkbox
          id="agreeToTerms"
          checked={formData?.agreeToTerms}
          onCheckedChange={handleCheckboxChange}
          className="mt-1"
        />
        <label htmlFor="agreeToTerms" className="text-sm font-body text-muted-foreground cursor-pointer">
          I agree to the{' '}
          <button type="button" className="text-primary hover:underline">
            Terms and Conditions
          </button>
          {' '}and{' '}
          <button type="button" className="text-primary hover:underline">
            Privacy Policy
          </button>
        </label>
      </div>
      {errors?.agreeToTerms && (
        <p className="text-sm text-error font-caption mt-1">{errors?.agreeToTerms}</p>
      )}

      {authError && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-body text-error">
                {authError}
              </p>
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="right"
        className="gradient-primary"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
      <div className="flex items-center justify-center gap-2 pt-4">
        <Icon name="Info" size={16} className="text-muted-foreground" />
        <p className="text-xs font-caption text-muted-foreground">
          Registration may require admin approval for certain roles
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;