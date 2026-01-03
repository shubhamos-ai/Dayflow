import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from './pages/admin-dashboard';
import AttendanceTracking from './pages/attendance-tracking';
import Login from './pages/login';
import ProfileManagement from './pages/profile-management';
import SignUp from './pages/sign-up';
import EmployeeDashboard from './pages/employee-dashboard';
import LeaveManagement from './pages/leave-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employee-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['employee', 'admin']}>
              <EmployeeDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/attendance-tracking" 
          element={
            <ProtectedRoute allowedRoles={['employee', 'admin']}>
              <AttendanceTracking />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile-management" 
          element={
            <ProtectedRoute allowedRoles={['employee', 'admin']}>
              <ProfileManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/leave-management" 
          element={
            <ProtectedRoute allowedRoles={['employee', 'admin']}>
              <LeaveManagement />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
