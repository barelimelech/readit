import React, { useState } from 'react';
import Profile from './Profile';
import ProfileUpdate from './EditProfile';

const ProfileContainer = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (newName, newEmail) => {
    setName(newName);
    setEmail(newEmail);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <ProfileUpdate onSaveProfile={handleSave} />
      ) : (
        <Profile onEditProfile={handleEdit} />
      )}
    </div>
  );
};

export default ProfileContainer;
