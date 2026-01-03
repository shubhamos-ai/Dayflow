import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import DashboardNav from '../../components/ui/DashboardNav';
import { ProfileTabs, ProfileTabPanel } from '../../components/ui/ProfileTabs';
import ProfileHeader from './components/ProfileHeader';
import PersonalDetailsForm from './components/PersonalDetailsForm';
import JobInformationForm from './components/JobInformationForm';
import DocumentsManager from './components/DocumentsManager';

const ProfileManagement = () => {
  const [userData] = useState({
    name: "Sarah Mitchell",
    designation: "Senior Software Engineer",
    department: "Engineering",
    email: "sarah.mitchell@dayflow.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_14da91c34-1763294780479.png",
    profileImageAlt: "Professional headshot of woman with shoulder-length brown hair wearing navy blue blazer against neutral background",
    firstName: "Sarah",
    lastName: "Mitchell",
    dateOfBirth: "1990-05-15",
    gender: "female",
    maritalStatus: "married",
    nationality: "American",
    alternatePhone: "+1 (555) 987-6543",
    address: "1234 Market Street, Apt 567",
    city: "San Francisco",
    state: "California",
    zipCode: "94103",
    country: "United States",
    emergencyContactName: "John Mitchell",
    emergencyContactRelation: "spouse",
    emergencyContactPhone: "+1 (555) 456-7890"
  });

  const [jobData] = useState({
    employeeId: "EMP-2024-1234",
    designation: "Senior Software Engineer",
    department: "engineering",
    reportingManager: "Michael Chen",
    joiningDate: "2021-01-15",
    employmentType: "full-time",
    workLocation: "San Francisco Office",
    workSchedule: "9-to-5",
    probationPeriod: "3",
    confirmationDate: "2021-04-15"
  });

  const [documents] = useState([
  {
    id: 1,
    name: "Passport_Sarah_Mitchell.pdf",
    category: "identity",
    size: "2.4 MB",
    uploadDate: "Jan 15, 2024",
    type: "application/pdf"
  },
  {
    id: 2,
    name: "Degree_Certificate_MIT.pdf",
    category: "education",
    size: "1.8 MB",
    uploadDate: "Jan 15, 2024",
    type: "application/pdf"
  },
  {
    id: 3,
    name: "Employment_Contract_2024.pdf",
    category: "employment",
    size: "856 KB",
    uploadDate: "Jan 15, 2024",
    type: "application/pdf"
  }]
  );

  const handleImageUpdate = (newImageUrl) => {
    console.log("Profile image updated:", newImageUrl);
  };

  const handlePersonalDetailsSave = (formData) => {
    console.log("Personal details saved:", formData);
  };

  const handleJobInfoSave = (formData) => {
    console.log("Job information saved:", formData);
  };

  const handleDocumentUpload = (newDocuments) => {
    console.log("Documents uploaded:", newDocuments);
  };

  const handleDocumentDelete = (docId) => {
    console.log("Document deleted:", docId);
  };

  return (
    <>
      <Helmet>
        <title>Profile Management - Dayflow HRMS</title>
        <meta
          name="description"
          content="Manage your personal information, job details, and documents in Dayflow HRMS" />

      </Helmet>

      <DashboardNav userRole="employee" />

      <div className="min-h-screen bg-background">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        
        <div className="relative max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
          <ProfileHeader userData={userData} onImageUpdate={handleImageUpdate} />

          <ProfileTabs>
            <ProfileTabPanel>
              <PersonalDetailsForm
                userData={userData}
                onSave={handlePersonalDetailsSave} />

            </ProfileTabPanel>

            <ProfileTabPanel>
              <JobInformationForm jobData={jobData} onSave={handleJobInfoSave} />
            </ProfileTabPanel>

            <ProfileTabPanel>
              <DocumentsManager
                documents={documents}
                onUpload={handleDocumentUpload}
                onDelete={handleDocumentDelete} />

            </ProfileTabPanel>
          </ProfileTabs>
        </div>
      </div>
    </>);

};

export default ProfileManagement;