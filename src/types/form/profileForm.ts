/** '한 줄' | '여러 줄' 명시하는 부분 */
export type lineType = 'single' | 'multi';

export interface ProfileFormProps {
  lineType: lineType;
  title: string;
  maxLength?: number; // lineType이 'multi'인 경우에만 들어옴
  placeholder: string;
}