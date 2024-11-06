import { ResponseModel } from '../model';
import { withAuthInstance } from '../api';

interface GetMyApplyMentoringList extends ResponseModel {
  data: {
    seniorId: string;
    profile: string;
    nickName: string;
    postgradu: string;
    major: string;
    lab: string;
    topic: string;
    question: string;
    dates: string[];
  };
}

export const getMyApplyMentoringList = async (mentoringId: number) => {
  try {
    return (
      await withAuthInstance.get<GetMyApplyMentoringList>(
        `/mentoring/me/${mentoringId}`,
      )
    ).data.data;
  } catch (e) {
    throw e;
  }
};
