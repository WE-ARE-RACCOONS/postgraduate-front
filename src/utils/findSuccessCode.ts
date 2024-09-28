import { successStatusSchema } from '@/api/model';

export default function findSuccessCode(code: string) {
  return successStatusSchema.isValidSync(code);
}
