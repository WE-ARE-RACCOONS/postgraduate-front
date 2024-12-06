import { wishSeniorApply } from '@/api/senior/wishSeniorApply';
import { useMutation } from '@tanstack/react-query';

export const useWishSeniorApply = () => {
  return useMutation({
    mutationFn: wishSeniorApply,
  });
};
