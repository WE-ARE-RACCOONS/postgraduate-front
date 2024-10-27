import { withAuthInstance } from '../api';
import { ResponseModel } from '../model';

interface SeniorConfirmMentoringResponse extends ResponseModel {
  data: boolean;
}

//mentoring/senior/me/${props.mentoringId}/expected

export const confirmSeniorMentoring = async ({
  date,
  mentoringId,
}: {
  date: string;
  mentoringId: number;
}) => {
  try {
    return (
      await withAuthInstance.patch<SeniorConfirmMentoringResponse>(
        `/mentoring/senior/me/${mentoringId}/expected`,
        {
          date,
        },
      )
    ).data;
  } catch (e) {
    throw e;
  }
};
