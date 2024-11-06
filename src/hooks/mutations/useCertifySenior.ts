import { useMutation } from '@tanstack/react-query';
import { certifySenior } from '@/api/senior/certifySenior';

export const useCertifySenior = () => {
  return useMutation({
    mutationFn: certifySenior,
  });
};
