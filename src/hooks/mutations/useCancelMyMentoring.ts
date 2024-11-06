import { cancleMentoring } from '@/api/mentoring/cancelMentoring';
import { useMutation } from '@tanstack/react-query';
export const useCancelMyMentoring = () => {
  return useMutation({
    mutationFn: cancleMentoring,
    onSuccess: () => {},
  });
};
