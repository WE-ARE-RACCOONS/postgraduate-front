import styled from 'styled-components';

export const IntroCardContainer = styled.div`
  width: 100%;
  margin: 28px auto;
  height: max-content;
  min-height: 7.25rem;
  margin-top: 15px;
  background-color: #f8f9fb;

  position: relative;
  padding: 1.2rem 1rem;
`;

export const IntroCardTextBox = styled.div<{ $isFull: boolean }>`
  width: 100%;
  height: max-content;
  min-height: 6.5rem;
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  border-color: ${(props) =>
    props.$isFull ? 'transparent' : 'rgba(47, 196, 178, 0.3)'};
  background-color: #fff;
  letter-spacing: -0.5px;
  font-size: 15px;
  margin-bottom: 2.5rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 130%;
`;

export const IntroCardTextDesc = styled.div`
  width: max-content;
  height: 1rem;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const IntroCardTimeBox = styled.div`
  width: 100%;
  height: 2.5rem;
  border-radius: 4px;
  background-color: #f8f9fa;
  font-size: 15px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
`;
