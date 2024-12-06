import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/logo.png';
import InstaGram from '../../../public/instagram.png';
import { TEMRS_LINK } from '@/constants/terms/terms';
import styled from 'styled-components';

const FooterLink = styled(Link)`
  text-decoration: none;
  color: #323958;
  font-size: 11px;
  font-weight: 600;
`;

const FooterLinkWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  flex: 1;
  font-size: 11px;
  > div {
    display: flex;
    gap: 14px;
  }
`;

const HorizontalLine = styled.hr`
  width: 100%;
  display: block;
  margin: 0 auto;
  border: none;
  border-top: 1px solid #dfe2e4;
`;

const FooterWrapper = styled.footer`
  width: 100%;
  position: relative;
  bottom: 0;
  height: auto;
  background-color: #edeef1;
  color: #323958;
  line-height: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
`;

const FooterTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  h1 {
    font-weight: 400;
    font-size: 13px;
    span {
      font-weight: 700;
    }
  }
`;

const FooterItemTitle = styled.span`
  font-size: 11px;
  font-weight: 600;
`;

const FooterItemContent = styled.p`
  font-weight: 400;
  font-size: 11px;
  margin-bottom: 8px;
  display: inline;
  margin-left: 8px;
`;

const FooterInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FooterContactSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Footer() {
  return (
    <FooterWrapper>
      <FooterTitle>
        <Image
          src={Logo}
          alt="대학원 김선배 로고 이미지"
          width={14}
          height={14}
        />
        <h1>
          대학원 <span>김선배</span>
        </h1>
      </FooterTitle>
      <FooterInfoSection>
        <div>
          <FooterItemTitle>주소</FooterItemTitle>
          <FooterItemContent>
            서울시 송파로 중대로 207,2층 201-A1145호
          </FooterItemContent>
        </div>
        <div>
          <FooterItemTitle>대표</FooterItemTitle>
          <FooterItemContent>
            채명식 (사업자등록번호 678-53-00677)
          </FooterItemContent>
        </div>
        <FooterContactSection>
          <div>
            <FooterItemTitle>마케팅 제휴 문의</FooterItemTitle>
            <FooterItemContent>grad.kimseonbae@gmail.com</FooterItemContent>
          </div>
          <Image
            src={InstaGram}
            alt="인스타그램 링크 이미지"
            width={14}
            height={14}
          />
        </FooterContactSection>
      </FooterInfoSection>

      <HorizontalLine />

      <FooterLinkWrapper>
        <div>
          <FooterLink href={TEMRS_LINK.termsOfUse} target="_blank">
            이용약관
          </FooterLink>
          <FooterLink href={TEMRS_LINK.privacyStatement} target="_blank">
            개인정보처리방침
          </FooterLink>
        </div>
        <div>© kimseonbae, All Rights Reserved.</div>
      </FooterLinkWrapper>
    </FooterWrapper>
  );
}

export default Footer;
