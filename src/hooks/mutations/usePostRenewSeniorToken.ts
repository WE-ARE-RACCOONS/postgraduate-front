import { renewSeniorToken } from '@/api/auth/token/renewSeniorToken';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../useAuth';
import { isTutorialFinished } from '@/stores/signup';
import { useAtom } from 'jotai';

export const usePostRenewSeniorToken = () => {
  const { setUserType, setAccessToken, setRefreshToken } = useAuth();
  const [_, setToturialFinish] = useAtom(isTutorialFinished);

  return useMutation({
    mutationFn: renewSeniorToken,
    onSuccess: ({ data }) => {
      setAccessToken({
        token: data.accessToken,
        expires: data.accessExpiration,
      });
      setRefreshToken({
        token: data.refreshToken,
        expires: data.refreshExpiration,
      });
      setUserType(data.role);
      setToturialFinish(data.isTutorial);
    },
  });
};
