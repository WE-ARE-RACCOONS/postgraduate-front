import { tapType } from '@/types/tap/tap';
import { withAuthInstance } from '../api';
import { ResponseModel } from '../model';
import { MentoringData } from '@/types/mentoring/mentoring';

interface GetSeniorMentoringActiveTabResponse extends ResponseModel {
  data: {
    seniorMentoringInfos: MentoringData[];
  };
}

export const getSeniorMentoringActiveTab = async ({
  activeTab,
}: {
  activeTab: tapType;
}) => {
  try {
    return (
      await withAuthInstance.get<GetSeniorMentoringActiveTabResponse>(
        `/mentoring/senior/me/${activeTab}`,
      )
    ).data.data.seniorMentoringInfos;
  } catch (e) {
    throw e;
  }
};
