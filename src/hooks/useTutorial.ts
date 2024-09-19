import { useSetAtom, useAtom } from 'jotai';
import useAuth from '@/hooks/useAuth';
import { useTour } from '@reactour/tour';
import { isTutorialFinished } from '@/stores/signup';
import instance from '@/api/api';
import { useEffect } from 'react';

function useTutorial() {
  const [isTutorialFinish, setTutorialFinished] = useAtom(isTutorialFinished);
  const { setIsOpen: setTutorialStepOpen } = useTour();
  const { getUserType, getAccessToken } = useAuth();

  const setTutorialFinish = async () => {
    const userType = getUserType();
    const accessToken = await getAccessToken();

    if (!userType || userType !== 'junior' || isTutorialFinish) {
      return;
    }

    setTutorialStepOpen(true);
    setTutorialFinished(true);
    await instance.patch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/me/tutorial`,
    );
  };

  useEffect(() => {
    setTutorialFinish();
  }, []);

  return { isTutorialFinish };
}

export default useTutorial;
