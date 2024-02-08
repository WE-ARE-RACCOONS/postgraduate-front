import styled from "styled-components";

export const CJContainer = styled.div`
  width: 18.5rem;
  height: 14rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  #x-btn {
    width: 1.32rem;
    height: 1.32rem;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
`

export const CJTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  white-space: pre;
  text-align: center;
  position: absolute;
  top: 2.2rem;
  left: 50%;
  transform: translateX(-50%);
`

export const CJDesc = styled.div`
  font-size: 17px;
  white-space: pre;
  text-align: center;
  color: #868E96;
  position: absolute;
  top: 6.1rem;
  left: 50%;
  transform: translateX(-50%);
`

export const CJBtn = styled.button`
  width: 18.5rem;
  height: 3.375rem;
  background-color: #2FC4B2;
  color: #fff;
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 0;
`