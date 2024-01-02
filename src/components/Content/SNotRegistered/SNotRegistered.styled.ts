import styled from "styled-components";

export const PNRContainer = styled.div`
  width: 19rem;
  height: 13.25rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  #x-icon {
    width: 2.25rem;
    height: 2.25rem;
    opacity: 0.3;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
`

export const PNRTitle = styled.div`
  width: max-content;
  height: 1.625rem;
  font-size: 20px;
  font-weight: 700;
  position: absolute;
  top: 2.94rem;
  left: 50%;
  transform: translateX(-50%);
  line-height: 130%;
`

export const PNRDesc = styled.div`
  width: 14.75rem;
  height: 2.75rem;
  color: #868E96;
  text-align: center;
  line-height: 140%;
  position: absolute;
  top: 5.6rem;
  left: 50%;
  transform: translateX(-50%);
`

export const PNRBtn = styled.button`
  width: 18.44rem;
  height: 3.375rem;
  border-radius: 12px;
  border: 0;
  background-color: #2FC4B2;
  color: #fff;
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 700;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`