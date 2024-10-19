import { renewUserToken } from '@/api/auth/token/renewUserToken';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../useAuth';
import { isTutorialFinished } from '@/stores/signup';
import { useSetAtom } from 'jotai';

export const usePostRenewUserToken = () => {
  const { setAccessToken, setRefreshToken, setUserType } = useAuth();
  const setTotuorial = useSetAtom(isTutorialFinished);
  return useMutation({
    mutationFn: renewUserToken,
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
      setTotuorial(data.isTutorial);
    },
  });
};
