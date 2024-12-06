import { confirmSeniorMentoring } from '@/api/mentoring/confirmSeniorMentoring';
import { useMutation } from '@tanstack/react-query';

export const useConfirmSeniorMentoring = () => {
  return useMutation({
    mutationFn: confirmSeniorMentoring,
  });
};
