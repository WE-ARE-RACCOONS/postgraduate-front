import { changeSeniorAccont } from '@/api/user/info/changeSeniorAccount';
import { useMutation } from '@tanstack/react-query';

export const useChangeSeniorAccount = () => {
  return useMutation({
    mutationFn: changeSeniorAccont,
    onError: (e) => console.log(e),
  });
};
