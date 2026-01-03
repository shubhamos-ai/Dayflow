import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProfileCard = ({ employee }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-success/10 text-success border-success/20';
      case 'Absent':
        return 'bg-error/10 text-error border-error/20';
      case 'Leave':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="profile-card glassmorphism rounded-xl p-6 md:p-8 shadow-xl">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
            <Image
              src={employee?.profileImage}
              alt={employee?.profileImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-md">
            <Icon name="User" size={20} color="#FFFFFF" />
          </div>
        </div>

        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
            {employee?.name}
          </h2>
          <p className="text-base md:text-lg font-body text-muted-foreground mb-4">
            {employee?.department} • {employee?.designation}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg">
              <Icon name="Hash" size={16} color="var(--color-primary)" />
              <span className="text-sm font-caption text-foreground data-text">
                {employee?.employeeId}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg">
              <Icon name="Mail" size={16} color="var(--color-primary)" />
              <span className="text-sm font-caption text-foreground">
                {employee?.email}
              </span>
            </div>
          </div>

          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor(employee?.attendanceStatus)}`}>
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span className="text-sm font-body font-medium">
              {employee?.attendanceStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;