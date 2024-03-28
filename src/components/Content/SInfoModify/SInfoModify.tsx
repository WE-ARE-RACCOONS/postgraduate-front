import {
  InfoFieldForm,
  InfoFieldTitle,
  SInfoContainer,
  SInfoImgBox,
  SInfoImgInputBox,
  ValidatorBox,
} from './SInfoModify.styled';
import x_icon from '../../../../public/x.png';
import user_icon from '../../../../public/user.png';
import camera_icon from '../../../../public/camera.png';
import Image from 'next/image';
import RoundedImage from '@/components/Image/RoundedImage';
import NicknameForm from '@/components/SingleForm/NicknameForm';
import PhoneNumForm from '@/components/SingleForm/PhoneNumForm';
import { useEffect, useRef, useState } from 'react';
import SingleValidator from '@/components/Validator/SingleValidator';
import ClickedBtn from '@/components/Button/ClickedBtn';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import {
  StaticImageData,
  StaticImport,
} from 'next/dist/shared/lib/get-img-props';
import { useAtom, useAtomValue } from 'jotai';
import { nickname, phoneNum } from '@/stores/signup';
import NextBtn from '@/components/Button/NextBtn';
import ModalBtn from '@/components/Button/ModalBtn';
import { bankNameAtom } from '@/stores/bankName';
import { ModalType } from '@/types/modal/riseUp';
import useModal from '@/hooks/useModal';
import RiseUpModal from '@/components/Modal/RiseUpModal';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import findExCode from '@/utils/findExCode';

function SInfoModify({
  modalHandler,
  bModalHandler,
}: {
  bModalHandler: () => void;
  modalHandler: () => void;
}) {
  const router = useRouter();
  const [flag, setFlag] = useState(false);
  const {
    modal: BModal,
    modalHandler: BModalHandler,
    portalElement: BPotalElement,
  } = useModal('senior-info-portal');
  const [modalType, setModalType] = useState<ModalType>('bank');
  const [submitFlag, setSubmitFlag] = useState(false);
  const [accHolder, setAccHolder] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [bank, setBank] = useAtom(bankNameAtom);
  const [nickName, setNickname] = useAtom(nickname);
  const [fullNum, setPhoneNum] = useAtom(phoneNum);
  const [inputImg, setInputImg] = useState<File | null>(null); // 사용자가 등록한 파일
  const [imgUrl, setImgUrl] = useState<string>(''); // 사용자가 등록한 파일 URL(미리보기용)

  const { getAccessToken, removeTokens } = useAuth();

  useEffect(() => {
    getAccessToken().then((accessTkn) => {
      if (accessTkn) {
        axios
          .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/senior/me/account`, {
            headers: {
              Authorization: `Bearer ${accessTkn}`,
            },
          })
          .then((response) => {
            const res = response.data;

            if (findExCode(res.code)) {
              removeTokens();
              router.replace('/');
              return;
            }

            if (res.code == 'SNR200') {
              setAccHolder(res.data.accountHolder || '');
              setAccNumber(res.data.accountNumber || '');
              setBank(res.data.bank || '');
              setNickname(res.data.nickName || '');
              setPhoneNum(res.data.phoneNumber || '');
              setProfileUrl(res.data.profile || '');
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  }, [submitFlag]);

  useEffect(() => {
    if (inputImg) {
      setImgUrl(URL.createObjectURL(inputImg));
    }
  }, [inputImg]);

  const submitHandler = async () => {
    let submitImgUrl = profileUrl ? profileUrl : '';

    getAccessToken().then(async (accessTkn) => {
      if (inputImg) {
        const formData = new FormData();
        formData.append('profileFile', inputImg);

        if (accessTkn) {
          await axios
            .post(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/image/upload/profile`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${accessTkn}`,
                },
              },
            )
            .then((response) => {
              const res = response.data;

              if (findExCode(res.code)) {
                removeTokens();
                router.replace('/');
                return;
              }

              if (res.code == 'IMG202') {
                submitImgUrl = res.data.profileUrl;
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }

      if (
        nickName &&
        fullNum &&
        accessTkn &&
        bank &&
        submitImgUrl &&
        accNumber &&
        accHolder
      ) {
        setFlag(false);
        axios
          .patch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/senior/me/account`,
            {
              nickName: nickName,
              phoneNumber: fullNum,
              profile: submitImgUrl,
              accountNumber: accNumber,
              bank: bank,
              accountHolder: accHolder,
            },
            {
              headers: {
                Authorization: `Bearer ${accessTkn}`,
              },
            },
          )
          .then((response) => {
            const res = response.data;

            if (findExCode(res.code)) {
              removeTokens();
              router.replace('/');
              return;
            }

            if (res.code == 'SNR201') {
              modalHandler();
              setSubmitFlag(!submitFlag);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        setFlag(true);
        return;
      }
    });
  };

  return (
    <SInfoContainer>
      <h3 style={{ textAlign: 'center', marginTop: '1rem' }}>계정 설정</h3>
      <SInfoImgBox>
        <RoundedImage
          kind="big"
          imgSrc={imgUrl ? imgUrl : profileUrl}
          altMsg="계정 프로필 사진"
        />
        <Image id="camera-icon" src={camera_icon} alt="카메라 아이콘" />
        <SInfoImgInputBox>
          <label
            id="profile-img-label"
            htmlFor="profile-img"
            style={{ cursor: 'pointer' }}
          >
            이미지라벨이미지라벨이미지라벨이미지라벨이미지라벨이미지라벨이미지라벨이미지라벨이미지라벨
          </label>
          <input
            type="file"
            accept="image/*"
            id="profile-img"
            onChange={(e) => {
              setInputImg(
                e.currentTarget.files ? e.currentTarget.files[0] : null,
              );
            }}
          />
        </SInfoImgInputBox>
      </SInfoImgBox>
      <Image
        id="x-icon"
        src={x_icon}
        alt="계정 수정 모달 닫기 버튼"
        onClick={modalHandler}
      />
      <div id="nickname-form-wrapper">
        <NicknameForm defaultValue={nickName} />
      </div>
      <div id="phonenum-form-wrapper">
        <PhoneNumForm defaultValue={fullNum} />
      </div>
      <div id="account-form-wrapper">
        <InfoFieldTitle>계좌번호</InfoFieldTitle>
        <InfoFieldForm
          $width="95%"
          type="text"
          defaultValue={accNumber}
          onChange={(e) => {
            setAccNumber(e.currentTarget.value);
          }}
        />
      </div>
      <div id="bank-and-name-wrapper">
        <div id="bank-form-wrapper">
          <InfoFieldTitle>은행명</InfoFieldTitle>
          <ModalBtn
            $isGet={!bank}
            type="bankInfo"
            btnText={bank ? bank : '\u00A0\u00A0\u00A0\u00A0'}
            modalHandler={bModalHandler}
            onClick={() => {
              setModalType('bank');
            }}
          />
        </div>
        <div id="name-form-wrapper">
          <InfoFieldTitle>예금주</InfoFieldTitle>
          <InfoFieldForm
            $width="100%"
            type="text"
            defaultValue={accHolder}
            onChange={(e) => {
              setAccHolder(e.currentTarget.value);
            }}
          />
        </div>
      </div>
      {flag && (
        <ValidatorBox>
          <SingleValidator
            textColor="#FF3347"
            msg="입력하지 않은 내용이 있습니다."
          />
        </ValidatorBox>
      )}
      <div id="submit-btn-box">
        <NextBtn kind="route" btnText="저장하기" onClick={submitHandler} />
      </div>
    </SInfoContainer>
  );
}

export default SInfoModify;
