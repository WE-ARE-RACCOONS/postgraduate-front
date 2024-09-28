import { string } from 'yup';

export interface ResponseModel {
  code: SuccessStatusType | ErrorStatusType;
  message: string;
}

/**
 * 성공 코드
 * @see https://www.notion.so/5375748c8c4147ed85f0980d7fc06bcb
 */
export type SuccessStatusType =
  | 'UR200'
  | 'UR201'
  | 'UR202'
  | 'UR203'
  | 'SNR200'
  | 'SNR201'
  | 'SNR202'
  | 'SNR203'
  | 'MT200'
  | 'MT201'
  | 'MT202'
  | 'MT203'
  | 'PM200'
  | 'PM201'
  | 'PM202'
  | 'PM203'
  | 'RV200'
  | 'RV201'
  | 'RV202'
  | 'RV203'
  | 'AU200'
  | 'AU201'
  | 'AU202'
  | 'AU203'
  | 'AU204'
  | 'AU205'
  | 'ACT200'
  | 'ACT201'
  | 'ACT202'
  | 'ACT203'
  | 'IMG200'
  | 'IMG201'
  | 'IMG202'
  | 'IMG203'
  | 'SLR200'
  | 'SLR201'
  | 'SLR202'
  | 'SLR203'
  | 'ADM200'
  | 'ADM201';
/**
 * 에러 코드
 * @see https://www.notion.so/240430-c0e2fd72f06b45028e8e463d6faa32f9
 */
export type ErrorStatusType =
  | 'EX1000'
  | 'EX900'
  | 'EX901'
  | 'EX902'
  | 'EX903'
  | 'EX904'
  | 'EX800'
  | 'EX801'
  | 'EX802'
  | 'EX700'
  | 'EX701'
  | 'EX702'
  | 'EX703'
  | 'EX704'
  | 'EX705'
  | 'EX706'
  | 'EX600'
  | 'EX601'
  | 'EX500'
  | 'EX501'
  | 'EX400'
  | 'EX401'
  | 'EX402'
  | 'EX403'
  | 'EX404'
  | 'EX405'
  | 'EX406'
  | 'EX300'
  | 'EX301'
  | 'EX302'
  | 'EX200'
  | 'EX201'
  | 'EX202';

const allErrorStatusTypes = [
  'EX1000',
  'EX900',
  'EX901',
  'EX902',
  'EX903',
  'EX904',
  'EX800',
  'EX801',
  'EX802',
  'EX700',
  'EX701',
  'EX702',
  'EX703',
  'EX704',
  'EX705',
  'EX706',
  'EX600',
  'EX601',
  'EX500',
  'EX501',
  'EX400',
  'EX401',
  'EX402',
  'EX403',
  'EX404',
  'EX405',
  'EX406',
  'EX300',
  'EX301',
  'EX302',
  'EX200',
  'EX201',
  'EX202',
] as const;

export const errorStatusSchema = string().oneOf(allErrorStatusTypes);
