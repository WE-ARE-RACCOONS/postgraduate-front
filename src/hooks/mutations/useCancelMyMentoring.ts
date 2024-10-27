import { cancleMentoring } from '@/api/mentoring/cancelMentoring';
import { useMutation } from '@tanstack/react-query';
export const useCancelMyMentoring = () => {
  return useMutation({
    mutationFn: cancleMentoring,
    onSuccess: () => {
      alert('멘토링 취소를 완료하였습니다!');
    },
  });
};
