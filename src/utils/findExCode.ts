export default function findExCode(code: string) {
  const targetCode = ['EX200', 'EX201', 'EX300', 'EX903'];

  if (targetCode.includes(code)) return true;
  else return false;
}
