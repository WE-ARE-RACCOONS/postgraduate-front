import { errorStatusSchema } from '@/api/model';

export default function findExCode(code: string) {
  return errorStatusSchema.isValidSync(code);
}
