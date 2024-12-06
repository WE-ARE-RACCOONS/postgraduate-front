import { seniorSignup } from '@/api/senior/seniorSignup';
import { useMutation } from '@tanstack/react-query';

export const useSeniorSignup = () => {
  return useMutation({
    mutationFn: seniorSignup,
  });
};
