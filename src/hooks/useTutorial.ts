import { useAtom } from 'jotai';
import useAuth from '@/hooks/useAuth';
import { useTour } from '@reactour/tour';
import { isTutorialFinished } from '@/stores/signup';
import { withAuthInstance } from '@/api/api';
import { useEffect } from 'react';

function useTutorial() {
  const [isTutorialFinish, setTutorialFinished] = useAtom(isTutorialFinished);
  const { setIsOpen: setTutorialStepOpen } = useTour();
  const { getUserType } = useAuth();

  const setTutorialFinish = async () => {
    const userType = getUserType();

    if (!userType || userType !== 'junior' || isTutorialFinish) {
      return;
    }

    setTutorialStepOpen(true);
    setTutorialFinished(true);
    await withAuthInstance.patch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/me/tutorial`,
    );
  };

  useEffect(() => {
    setTutorialFinish();
  }, []);

  return { isTutorialFinish };
}

export default useTutorial;
