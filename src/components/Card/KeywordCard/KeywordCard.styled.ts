import styled from 'styled-components';

export const KeywordCardContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  height: auto;
  border-radius: 16px;
  background: #f8f8f8;
  position: relative;

  #keyword-card-lab-name {
    width: 100%;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 10px;
  }
`;

export const KeywordCardArrayBox = styled.div`
  width: 100%;
  min-width: 330px;
  border-radius: 15px;
  height: auto;
  padding: 1.2rem;
  background: #fff;
  min-height: 4.125rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
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
