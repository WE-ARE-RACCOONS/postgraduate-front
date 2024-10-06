import { getSalaryAmount } from '@/api/senior/getSalaryAmount';
import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

export const useGetSalaryAmountQuery = () => {
  const { getUserType } = useAuth();
  return useQuery({
    queryKey: ['mysalary'],
    queryFn: getSalaryAmount,
    enabled: getUserType() === 'senior',
  });
};
