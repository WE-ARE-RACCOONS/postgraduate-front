import { ResponseModel } from '../model';
import { withAuthInstance } from '../api';
import { MentoringData } from '@/types/mentoring/mentoring';
import { tapType } from '@/types/tap/tap';

interface GetMyMentoringActiveTabResponse extends ResponseModel {
  data: {
    mentoringInfos: MentoringData[];
  };
}

export const getMyMentoringActiveTab = async ({
  activeTab,
}: {
  activeTab: tapType;
}) => {
  try {
    return (
      await withAuthInstance.get<GetMyMentoringActiveTabResponse>(
        `/mentoring/me/${activeTab}`,
      )
    ).data.data.mentoringInfos;
  } catch (e) {
    throw e;
  }
};
