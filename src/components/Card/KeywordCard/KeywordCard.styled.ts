import styled from 'styled-components';

export const KeywordCardContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  height: auto;
  border-radius: 16px;
  background-color: #fff;
  position: relative;
  padding: 1.2rem 1rem;

  #keyword-card-lab-name {
    width: max-content;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 24px;
  }
`;

export const KeywordCardArrayBox = styled.div`
  width: 90%;
  height: auto;
  min-height: 4.125rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  top: 3rem;
  left: 1rem;
`;

export const KeywordCardEl = styled.div`
  width: max-content;
  height: 1.75rem;
  line-height: 1.125rem;
  padding: 0.32rem 0.625rem;
  align-items: center;
  font-size: 12px;
  white-space: nowrap;
  border-radius: 4px;
  background-color: rgba(124, 143, 141, 0.1);
`;
