'use client';
import BackHeader from '@/components/Header/BackHeader';
import Photo from '@/components/Photo';
import SingleValidator from '@/components/Validator/SingleValidator';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import auth from '../../../../public/auth.png';
import Image from 'next/image';
import cancel from '../../../../public/cancel.png';
import useAuth from '@/hooks/useAuth';
import { useCertifySeniorImage } from '@/hooks/mutations/useCertifySeniorImage';
import { useCertifySenior } from '@/hooks/mutations/useCertifySenior';
import findSuccessCode from '@/utils/findSuccessCode';
import findExCode from '@/utils/findExCode';

function SeniorAuthPage() {
  const [uploadFlag, setUploadFlag] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const { getAccessToken, getUserType } = useAuth();
  const [accessTkn, setAccessTkn] = useState<string | null | undefined>('');
  const [userType, setUserType] = useState('');

  const router = useRouter();
  const fileName = photo?.name;

  const { mutate: certifySeniorImage } = useCertifySeniorImage();
  const { mutate: certifySenior } = useCertifySenior();

  useEffect(() => {
    getAccessToken().then((tkn) => {
      if (!tkn) {
        // 알림톡으로 들어와서 토큰 없을 시, 로그인으로 이동
        const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
        const REDIRECT_URI =
          window.location.origin + '/login/oauth2/code/kakao';
        const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
        window.location.href = link;
        return;
      }

      setAccessTkn(tkn);
    });
    const userT = getUserType();
    if (userT) setUserType(userT);
  }, []);

  const handleClick = async () => {
    if (photo) {
      certifySeniorImage(
        { seniorCertificationImage: photo },
        {
          onSuccess: (data) => {
            certifySenior(
              { reAuthImage: data.data.profileUrl },
              {
                onSuccess: (data) => {
                  if (findSuccessCode(data.code)) {
                    router.push('/auth-done');
                  } else if (findExCode(data.code)) {
                    alert(data.message);
                  }
                },
              },
            );
          },
        },
      );
    }
    if (!photo) {
      setUploadFlag(true);
      return;
    }
  };

  const handleCancelClick = () => {
    setPhoto(null);
  };

  return (
    <div>
      <div>
        <BackHeader headerText="인증하기" />
      </div>
      <div style={{ marginLeft: '1rem' }}>
        <h3 style={{ marginTop: '1.25rem' }}>대학원생임을 인증해주세요!</h3>
        <AuthFont>
          대학원 선배 회원으로 가입하면 멘토링을 진행할 수 있어요
        </AuthFont>
        <br />
        <AuthImgBox>
          <Image width={233} height={100} alt="auth-img" src={auth} />
        </AuthImgBox>
        <AuthComment>
          <li id="auth-msg">
            대학원생임을 증명할 수 있는 사진을 첨부해주세요.
          </li>
          <div id="auth-msg-color">
            (대학원 학생증, 대학원 합격증, 연구실멤버 확인 캡쳐본 등)
          </div>
          <li id="auth-msg">
            첨부한 사진은 대학원 선배 회원 승인 후에 폐기됩니다.
          </li>
          <li id="auth-msg">영업일 기준 48시간 안에 승인여부를 알려드려요.</li>
        </AuthComment>
        {photo ? (
          <APhotoIn>
            {fileName}
            <Image
              src={cancel}
              alt="cancel"
              style={{ width: '16px', height: '16px', objectFit: 'cover' }}
              onClick={handleCancelClick}
            />
          </APhotoIn>
        ) : (
          <Photo type="auth" handler={setPhoto} />
        )}
        {uploadFlag && (
          <div style={{ marginTop: '0.3rem' }}>
            <SingleValidator
              textColor="#FF3347"
              msg="카메라 버튼을 눌러 사진을 첨부해주세요"
            />
          </div>
        )}
      </div>
      <AuthBtn $getPhoto={!!photo} onClick={handleClick}>
        다음으로
      </AuthBtn>
    </div>
  );
}

export default SeniorAuthPage;

const AuthFont = styled.div`
  color: #212529;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.225rem */
  letter-spacing: -0.03125rem;
`;

const APhotoIn = styled.div`
  justify-content: space-between;
  padding: 1rem 1rem;
  display: flex;
  margin-top: 0.75rem;
  width: 95%;
  height: 2.875rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  background: #f8f9fa;
  color: #868e96;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.05rem */
  letter-spacing: -0.03125rem;
`;

const AuthComment = styled.div`
  padding: 0.7rem 1rem;
  margin-top: 2.3rem;
  width: 95%;
  height: 7.9375rem;
  flex-shrink: 0;
  border-radius: 1rem;
  background: #f8f9fa;

  #auth-msg {
    color: #868e96;
    font-family: Pretendard;
    font-size: 0.85rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.225rem */
    letter-spacing: -0.03125rem;
    padding: 0.3rem 0;
  }

  #auth-msg-color {
    margin-left: 1.25rem;
    color: #2fc4b2;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.05rem */
    letter-spacing: -0.03125rem;
  }
`;

const AuthBtn = styled.button<{ $getPhoto: boolean }>`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 1rem;
  margin-top: 6rem;
  border: none;
  display: flex;
  width: 92%;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.75rem;
  background: ${(props) => (props.$getPhoto ? '#2FC4B2' : '#DEE2E6')};
  cursor: ${(props) => (props.$getPhoto ? 'pointer' : 'default')};
`;

const AuthImgBox = styled.div`
  height: 4.625rem;
  width: inherit;
  text-align: center;
`;
