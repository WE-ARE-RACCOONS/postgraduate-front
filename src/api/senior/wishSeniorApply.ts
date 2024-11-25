import { withOutAuthInstance } from '../api';
import { ResponseModel } from '../model';

export interface WishSeniorApplyRequest {
  field: string;
  postgradu: string;
  professor: string;
  lab: string;
  phoneNumber: string;
}

interface WishSeniorApplyResponse extends ResponseModel {
  data: {};
}

export const wishSeniorApply = async (
  seniorApplyReq: WishSeniorApplyRequest,
) => {
  try {
    return (
      await withOutAuthInstance.post<WishSeniorApplyResponse>(
        '/wish/apply',
        seniorApplyReq,
      )
    ).data;
  } catch (e) {
    throw e;
  }
};
