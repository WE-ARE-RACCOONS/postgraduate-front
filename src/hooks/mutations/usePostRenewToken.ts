import { updateRoleToJunior } from '@/api/senior/updateRoleToJunior';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../useAuth';
import { isTutorialFinished } from '@/stores/signup';
import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai';

export const usePostRenewUserToken = () => {
  const router = useRouter();
  const { setAccessToken, setRefreshToken, setUserType } = useAuth();
  const setTotuorial = useSetAtom(isTutorialFinished);
  return useMutation({
    mutationFn: updateRoleToJunior,
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
      router.push('/');
    },
  });
};
