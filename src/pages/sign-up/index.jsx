import React from 'react';
import AuthLayout from '../../components/ui/AuthLayout';
import SignUpForm from './components/SignUpForm';

const SignUp = () => {
  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join Dayflow HRMS and streamline your workforce management"
      showLoginLink={true}
    >
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;