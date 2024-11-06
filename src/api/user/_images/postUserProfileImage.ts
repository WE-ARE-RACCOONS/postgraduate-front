import { withAuthInstance } from '@/api/api';
import { ResponseModel } from '@/api/model';

interface PostUserProfileImageResponse extends ResponseModel {
  data: {
    profileUrl: string;
  };
}

interface PostUserProfileImageRequest {
  profileFile: File;
}

export const postUserProfileImage = async ({
  profileFile,
}: PostUserProfileImageRequest) => {
  const formData = new FormData();
  formData.append('profileFile', profileFile);

  return await withAuthInstance.post<PostUserProfileImageResponse>(
    '/image/upload/profile',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};
