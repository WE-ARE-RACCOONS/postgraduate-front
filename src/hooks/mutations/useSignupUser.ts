import { useMutation } from '@tanstack/react-query';

import { signupUser } from '@/api/auth/signup/signupUser';

export const useSignUpUser = () => {
  return useMutation({
    mutationFn: signupUser,
  });
};
