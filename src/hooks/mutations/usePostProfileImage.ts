import { useMutation } from '@tanstack/react-query';
import { postUserProfileImage } from '@/api/user/_images/postUserProfileImage';

export const usePostProfileImage = () => {
  return useMutation({
    mutationFn: postUserProfileImage,
  });
};
