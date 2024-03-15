import styled from 'styled-components';

export const KeywordCardContainer = styled.div`
  width: 100%;
  height: max-content;
  min-height: 7.25rem;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0px 0px 8px 0px rgba(73, 85, 101, 0.2);
  position: relative;
  padding-bottom: 8rem;

  #keyword-card-lab-name {
    width: max-content;
    height: 1.25rem;
    font-size: 14px;
    font-weight: 700;
    position: absolute;
    top: 1.2rem;
    left: 1rem;
  }
`;

export const KeywordCardArrayBox = styled.div`
  width: 90%;
  height: max-content;
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  position: absolute;
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
  background-color: rgba(47, 196, 178, 0.1);
`;
