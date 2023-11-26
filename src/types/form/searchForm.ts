export type SearchFormType = 'postgradu' | 'major';

export interface SearchFormProps {
  clickHandler: () => void;
  formType: SearchFormType;
}