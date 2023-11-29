import styled from "styled-components";

export const MBestCaseContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  #x-icon {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }

  #keyword-container {
    width: 20.5rem;
    height: max-content;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`