import { withOutAuthInstance } from '@/api/api';
import { ResponseModel } from '@/api/model';

interface GetSeniorListRequest {
  field: string;
  postgradu: string;
  page: number;
}

interface SeniorItem {
  seniorId: number;
  certification: boolean;
  profile: string;
  nickName: string;
  postgradu: string;
  major: string;
  lab: string;
  professor: string;
  keyword: string[];
}

interface GetSeniorListResponse extends ResponseModel {
  data: {
    seniorSearchResponses: SeniorItem[];
    totalElements: number;
  };
}
export const getSeniorList = async ({
  field,
  page,
  postgradu,
}: GetSeniorListRequest) => {
  try {
    return (
      await withOutAuthInstance.get<GetSeniorListResponse>('/senior/field', {
        params: {
          field,
          page,
          postgradu,
        },
      })
    ).data.data;
  } catch (e) {
    throw e;
  }
};
