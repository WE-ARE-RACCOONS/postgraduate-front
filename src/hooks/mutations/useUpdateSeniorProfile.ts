import { useMutation } from '@tanstack/react-query';
import { updateSeniorProfile } from '@/api/senior/updateSeniorProfile';

export const useUpdateSeniorProfile = () => {
  return useMutation({
    mutationFn: updateSeniorProfile,
  });
};
