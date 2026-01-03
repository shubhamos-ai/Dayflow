import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ userData, onImageUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(userData?.profileImage);

  const handleImageSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader?.result);
      };
      reader?.readAsDataURL(file);
      setIsEditing(true);
    }
  };

  const handleSaveImage = () => {
    if (onImageUpdate && selectedImage) {
      onImageUpdate(previewUrl);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setPreviewUrl(userData?.profileImage);
    setSelectedImage(null);
    setIsEditing(false);
  };

  return (
    <div className="profile-header glassmorphism rounded-xl p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
        <div className="relative flex-shrink-0">
          <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
            <Image
              src={previewUrl}
              alt={userData?.profileImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <label
            htmlFor="profile-image-upload"
            className="absolute bottom-2 right-2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer shadow-md hover-lift transition-smooth active-press"
          >
            <Icon name="Camera" size={20} />
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
            {userData?.name}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-4">
            {userData?.designation} • {userData?.department}
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6">
            <div className="flex items-center gap-2 text-sm md:text-base text-foreground">
              <Icon name="Mail" size={18} color="var(--color-primary)" />
              <span className="font-body">{userData?.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base text-foreground">
              <Icon name="Phone" size={18} color="var(--color-primary)" />
              <span className="font-body">{userData?.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base text-foreground">
              <Icon name="MapPin" size={18} color="var(--color-primary)" />
              <span className="font-body">{userData?.location}</span>
            </div>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
          <Button
            variant="default"
            size="default"
            iconName="Check"
            iconPosition="left"
            onClick={handleSaveImage}
            className="gradient-primary"
          >
            Save Profile Picture
          </Button>
          <Button
            variant="outline"
            size="default"
            iconName="X"
            iconPosition="left"
            onClick={handleCancelEdit}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;