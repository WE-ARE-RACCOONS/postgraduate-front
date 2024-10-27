import { withAuthInstance } from '../api';
import { ResponseModel } from '../model';

//senior/certification

interface CertifySeniorResponse extends ResponseModel {
  data: boolean;
}

export const certifySenior = async ({
  reAuthImage,
}: {
  reAuthImage: string;
}) => {
  try {
    return (
      await withAuthInstance.patch<CertifySeniorResponse>(
        '/senior/certification',
        {
          certification: reAuthImage,
        },
      )
    ).data;
  } catch (e) {
    throw e;
  }
};
