//mentoring/me/${mentoringId}/done
import { ResponseModel } from '../model';
import { withAuthInstance } from '../api';
import findExCode from '@/utils/findExCode';

interface ConfirmMentoringResponse extends ResponseModel {
  data: string;
}

export const confirmMentoring = async ({
  mentoringId,
}: {
  mentoringId: number;
}) => {
  try {
    const response = await withAuthInstance.patch<ConfirmMentoringResponse>(
      `/mentoring/me/${mentoringId}/done`,
    );
    if (findExCode(response.data.code)) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (e) {
    throw e;
  }
};
