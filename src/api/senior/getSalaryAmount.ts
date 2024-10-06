import { withOutAuthInstance } from '@/api/api';
import { ResponseModel } from '@/api/model';

interface GetSalaryAmountResponse extends ResponseModel {
  data: {
    salaryDate: string;
    salaryAmount: number;
  };
}
export const getSalaryAmount = async () => {
  return (
    await withOutAuthInstance.get<GetSalaryAmountResponse>('/salary', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
  ).data;
};
