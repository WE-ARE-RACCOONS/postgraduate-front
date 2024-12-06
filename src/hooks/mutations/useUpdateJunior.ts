import { updateRoleToJunior } from '@/api/senior/updateRoleToJunior';
import { useMutation } from '@tanstack/react-query';

export const useUpdateRoleToJunior = () => {
  return useMutation({
    mutationFn: updateRoleToJunior,
  });
};
