import { useMutation } from '@tanstack/react-query';
import { certifySeniorImage } from '@/api/senior/certifySeniorImage';

export const useCertifySeniorImage = () => {
  return useMutation({
    mutationFn: certifySeniorImage,
  });
};
