import { withAuthInstance } from '../api';
import { ResponseModel } from '../model';

interface CancelMentoringResponse extends ResponseModel {
  data: string;
}

export const cancleMentoring = async (mentoringId: number) => {
  try {
    return await withAuthInstance.patch<CancelMentoringResponse>(
      `/mentoring/me/${mentoringId}/cancel`,
    );
  } catch (e) {
    throw e;
  }
};
