'use client';
import ProgressBar from "@/components/Bar/ProgressBar";
import BackHeader from "@/components/Header/BackHeader";
import RoundedImage from "@/components/Image/RoundedImage";
import styled from "styled-components";
import user_icon from '../../../../../public/user.png';
import AuthLabeledText from "@/components/Text/AuthLabeledText";

function MentoringApplyPayPage() {
  return (
    <MAPContainer>
      <BackHeader headerText="멘토링 결제 정보" />
      <ProgressBar activeNum={2} />
      <MAPContent>
        <MAPTitle id="map-title-senior-info">대학원 선배 정보</MAPTitle>
        <MAPBox>
          <MAPInfoWrapper>
            <RoundedImage imgSrc={user_icon} altMsg="대학원생 프로필 이미지" />
            <div id="map-info-text">
              <div id="map-info-postgradu-major">
                <div id="map-info-postgradu">카이스트&nbsp;</div>
                <div id="map-info-major">인공지능융합과</div>
              </div>
              <AuthLabeledText str="김도민님" />
              <div id="map-info-lab">Computer Systems and Intelligence</div>
            </div>
          </MAPInfoWrapper>
        </MAPBox>
      </MAPContent>
    </MAPContainer>
  );
}

const MAPContainer = styled.div`
  width: inherit;
  height: 100%;
  position: relative;
  background-color: #F8F9FA;
  padding-bottom: 4.375rem;
`

const MAPContent = styled.div`
  width: 95%;
  margin: 0 auto;
  margin-top: 1.5rem;

  #map-title-senior-info {
    margin-bottom: 0.5rem;
  }
`

const MAPTitle = styled.div`
  width: 90%;
  height: 1.375rem;
  font-weight: 700;
`

const MAPBox = styled.div`
  width: 100%;
  height: max-content;
  border-radius: 8px;
  background-color: #FFF;
  padding: 1rem;
  border: 1px solid #000;
`

const MAPInfoWrapper = styled.div`
  width: 100%;
  display: flex;

  #map-info-text {
    width: 70%;
    height: 4.07rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 1rem;

    #map-info-postgradu-major {
      width: max-content;
      height: 1.07rem;
      font-size: 12px;
      display: flex;
      color: #868E96;
    }

    #map-info-lab {
      font-size: 12px;
      color: #212529;
    }
  }
`

export default MentoringApplyPayPage;
