import styled from 'styled-components';

export const ProfileBox = styled.div`
background-color: white;
  display: flex;
  height: 5rem;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
`;
export const ProfileInfo = styled.div`
  width: 30rem;
  margin-left: 1rem;
`;
export const ImageBox = styled.div`
  width: 3.375rem;
height: 3.375rem;
flex-shrink: 0;
`;
export const ProfileName = styled.div`
  display: flex;
  align-items: center;
`;
export const ProfileNickname = styled.div`
  color: #212529;
font-family: Pretendard;
font-size: 1.125rem;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 1.575rem */
letter-spacing: -0.03125rem;
`;
export const ProfileButton = styled.div`
margin-left: 0.7rem;
  display: inline-flex;
height: 1.375rem;
padding: 0.0625rem 0.5rem;
align-items: center;
flex-shrink: 0;
border-radius: 0.25rem;
background: #E8FFFC;
color: #2FC4B2;
text-align: center;
font-family: Pretendard;
font-size: 0.625rem;
font-style: normal;
font-weight: 700;
line-height: 1.125rem; /* 180% */
letter-spacing: -0.0375rem;
`;
export const ProfileWarn = styled.div`
  border: 1px solid black;
`;
