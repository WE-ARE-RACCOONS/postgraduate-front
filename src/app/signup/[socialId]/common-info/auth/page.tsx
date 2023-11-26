'use client';
import Photo from '@/components/Photo';
import SingleValidator from '@/components/Validator/SingleValidator';
import { photoUrlAtom } from '@/stores/senior';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

function AuthPage() {
  const [uploadFlag, setUploadFlag] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const setphotoUrl = useSetAtom(photoUrlAtom);
  const currentPath = usePathname();
  const pathArr = currentPath.split('/');
  const socialId = pathArr[2];
  const router = useRouter();

  const handleClick = () => {
    if (photo) {
      setUploadFlag(false);
      const formData = new FormData();
      formData.append('certificationFile', photo);
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/image/upload/certification`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then((response) => {
          const res = response.data;

          if (res.code == 'IMG202') {
            setphotoUrl(res.data.profileUrl);
            router.push(`/signup/${socialId}/common-info/senior-info`);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (!photo) {
      setUploadFlag(true);
      return;
    }
  };

  return (
    <div>
      <h3>대학원생임을 인증해주세요!</h3>
      <div>대학원 선배 회원으로 가입하면 멘토링을 진행할 수 있어요</div>
      <br />
      <div>
        대학원생임을 증명할 수 있는 사진을 첨부해주세요.
        <br />
        e.g. 대학원 학생증, 대학원 합격증, 연구실멤버 확인 캡쳐본
      </div>
      <Photo handler={setPhoto} />
      <div>첨부한 사진은 대학원 선배 회원 승인 후에 폐기됩니다.</div>
      {uploadFlag && (
        <SingleValidator
          textColor="#FF0000"
          msg="카메라 버튼을 눌러 사진을 첨부해주세요"
        />
      )}
      <div>영업일 기준 48시간 안에 승인 여부를 알려드려요.</div>
      <button onClick={handleClick}>다음</button>
    </div>
  );
}

export default AuthPage;
