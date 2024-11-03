import { TimeObj } from '@/types/scheduler/scheduler';
import { withAuthInstance } from '../api';
import { ResponseModel } from '../model';

interface UpdateSeniorProfileResponse extends ResponseModel {
  data: {
    seniorId: number;
  };
}

interface UpdateSeniorProfileRequest {
  info: string;
  target: string;
  times: TimeObj[];
  oneLiner: string;
}

export const updateSeniorProfile = async ({
  info,
  target,
  times,
  oneLiner,
}: UpdateSeniorProfileRequest) => {
  try {
    return (
      await withAuthInstance.patch<UpdateSeniorProfileResponse>(
        '/senior/profile',
        {
          info,
          target,
          times,
          oneLiner,
        },
      )
    ).data;
  } catch (e) {
    throw e;
  }
};
