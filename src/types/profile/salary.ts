export interface SalaryProps {
  data: SalaryData | null;
}

export interface SalaryData {
  profile: string;
  date: string;
  nickName: string;
  term: string;
  salaryAmount: string;
  salaryDate: string;
}
