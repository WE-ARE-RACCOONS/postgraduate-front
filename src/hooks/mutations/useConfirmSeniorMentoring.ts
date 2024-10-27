import { confirmSeniorMentoring } from '@/api/mentoring/\bconfirmSeniorMentoring';
import { useMutation } from '@tanstack/react-query';

export const useConfirmSeniorMentoring = () => {
  return useMutation({
    mutationFn: confirmSeniorMentoring,
  });
};
