import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout from '../../components/ui/AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import { loginUser, clearError } from '../../store/slices/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error: authError } = useSelector((state) => state?.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData?.password?.trim()) {
      newErrors.password = "Password is required";
    } else if (formData?.password?.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (authError) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await dispatch(loginUser({
      email: formData?.email,
      password: formData?.password
    }));

    if (loginUser?.fulfilled?.match(result)) {
      const userRole = result?.payload?.user?.role;
      if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/employee-dashboard');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access your HRMS dashboard"
      showSignUpLink={true}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="email"
          name="email"
          label="Email Address"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          disabled={isLoading}
          className="mb-4"
        />

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
            className="mb-2"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-[42px] text-muted-foreground hover:text-foreground transition-smooth"
            aria-label={showPassword ? "Hide password" : "Show password"}
            disabled={isLoading}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
            />
            <span className="text-sm font-body text-muted-foreground">
              Remember me
            </span>
          </label>
          <button
            type="button"
            className="text-sm font-body text-primary hover:underline transition-smooth"
          >
            Forgot password?
          </button>
        </div>

        {(errors?.submit || authError) && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-body text-error whitespace-pre-line">
                  {authError || errors?.submit}
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
          iconName="LogIn"
          iconPosition="right"
          className="gradient-primary"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground font-caption">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            size="default"
            fullWidth
            iconName="Mail"
            iconPosition="left"
            disabled={isLoading}
          >
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            size="default"
            fullWidth
            iconName="Briefcase"
            iconPosition="left"
            disabled={isLoading}
          >
            Microsoft
          </Button>
        </div>
      </form>
      <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-start gap-3">
          <Icon name="Shield" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-caption text-muted-foreground">
              Your data is protected with 256-bit SSL encryption and complies with HR data protection regulations.
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;