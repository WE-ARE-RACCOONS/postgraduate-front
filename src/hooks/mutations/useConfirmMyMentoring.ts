import { confirmMentoring } from '@/api/mentoring/confirmMentoring';
import { useMutation } from '@tanstack/react-query';

export const useConfirmMyMentoring = () => {
  return useMutation({
    mutationFn: confirmMentoring,
  });
};
