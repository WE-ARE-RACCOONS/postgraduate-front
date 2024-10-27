//mentoring/senior/me/${props.mentoringId}

import { ResponseModel } from '../model';

interface GetSeniorMentoringListResponse extends ResponseModel {
  data: {
    profile: string;
    nickName: string;
    topic: string;
    question: string;
    dates: string[];
    term: number;
  };
}
import { withAuthInstance } from '../api';

export const getSeniorMentoringList = async ({
  mentoringId,
}: {
  mentoringId: number;
}) => {
  try {
    return (
      await withAuthInstance.get<GetSeniorMentoringListResponse>(
        `/mentoring/senior/me/${mentoringId}`,
      )
    ).data.data;
  } catch (e) {
    throw e;
  }
};
