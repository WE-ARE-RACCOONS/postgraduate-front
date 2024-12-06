import { useMutation } from '@tanstack/react-query';
import { joinAsSenior } from '@/api/senior/joinAsSenior';

export const useJoinAsSenior = () => {
  return useMutation({
    mutationFn: joinAsSenior,
  });
};
