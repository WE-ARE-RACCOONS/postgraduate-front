import instance from '@/api/api';
import { ResponseModel } from '@/api/model';

interface UpdateSeniorProfileRequest {
  lab: 'string';
  keyword: 'string';
  info: 'string';
  target: 'string';
  chatLink: 'string';
  field: 'string';
  oneLiner: 'string';
  times: [
    {
      day: 'string';
      startTime: 'string';
      endTime: 'string';
    },
  ];
}

interface UpdateSeniorProfileResponse extends ResponseModel {
  data: {
    seniorId: number;
  };
}

export const updateSeniorProfile = async ({
  lab,
  keyword,
  info,
  target,
  chatLink,
  field,
  oneLiner,
  times,
}: UpdateSeniorProfileRequest) => {
  return await instance.patch<UpdateSeniorProfileResponse>(
    '/senior/me/profile',
    {
      lab,
      keyword,
      info,
      target,
      chatLink,
      field,
      oneLiner,
      times,
    },
  );
};
