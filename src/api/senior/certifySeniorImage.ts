// image/upload/certification
import { ResponseModel } from '../model';
import { withAuthInstance } from '../api';

interface CertifySeniorImageResponse extends ResponseModel {
  data: {
    profileUrl: string;
  };
}

export const certifySeniorImage = async ({
  seniorCertificationImage,
}: {
  seniorCertificationImage: File;
}) => {
  try {
    const formData = new FormData();
    formData.append('certificationFile', seniorCertificationImage);

    const response = await withAuthInstance.post<CertifySeniorImageResponse>(
      '/image/upload/certification',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  } catch (e) {
    throw e;
  }
};
