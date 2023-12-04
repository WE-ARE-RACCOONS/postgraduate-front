import { certiRegType } from '@/types/profile/profile';
import styled from 'styled-components';

export const SeniorManageContainer = styled.div`
  width: 20rem;
  height: max-content;
`;

export const SeniorManageContentContainer = styled.div`
  width: 20rem;
  height: max-content;
  display: flex;
  flex-direction: column;
`;

export const SeniorManageAuthBox = styled.div`
  width: 20rem;
  height: 1.875rem;
  display: flex;
  justify-content: space-between;
`;

export const SeniorManageAuthValue = styled.div<{ $certifiReg?: certiRegType }>`
  width: max-content;
  height: 1.75rem;

  color: ${(props) => {
    if (props.$certifiReg === 'APPROVE' || props.$certifiReg === 'WAITING') {
      return '#3bf';
    } else if (props.$certifiReg === 'NOT_APPROVE') {
      return '#ff0000';
    } else {
      return '#000';
    }
  }};
`;
