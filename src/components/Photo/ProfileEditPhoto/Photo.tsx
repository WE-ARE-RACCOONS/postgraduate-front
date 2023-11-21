import React from 'react';

interface ProfileEdiitPhotoProps {
  handler: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileEdiitPhoto : React.FC<ProfileEdiitPhotoProps>= ({ handler }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.currentTarget.files ? e.currentTarget.files[0]: '');
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handler(imageUrl);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        handleChange(e);
      }}
    />
  );
}

export default ProfileEdiitPhoto;
