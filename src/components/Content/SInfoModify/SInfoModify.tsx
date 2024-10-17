import {
  InfoFieldForm,
  InfoFieldTitle,
  SInfoContainer,
  SInfoImgBox,
  SInfoImgInputBox,
} from './SInfoModify.styled';
import x_icon from '../../../../public/x.png';
import camera_icon from '../../../../public/camera.png';
import { useGetSeniorMyAccountQuery } from '@/hooks/query/useGetSeniorMyAccount';
import Image from 'next/image';
import RoundedImage from '@/components/Image/RoundedImage';
import NicknameForm from '@/components/SingleForm/NicknameForm';
import PhoneNumForm from '@/components/SingleForm/PhoneNumForm';
import { useEffect, useState } from 'react';
import { useChangeSeniorAccount } from '@/hooks/mutations/useChangeSeniorAccount';
import { usePostProfileImage } from '@/hooks/mutations/usePostProfileImage';
import { useAtom, useAtomValue } from 'jotai';
import {
  changeNickname,
  newNotDuplicate,
  nickname,
  notDuplicate,
  phoneNum,
  phoneNumValidation,
  remainPhoneNum,
} from '@/stores/signup';
import NextBtn from '@/components/Button/NextBtn';
import ModalBtn from '@/components/Button/ModalBtn';
import { bankNameAtom } from '@/stores/bankName';
import { overlay } from 'overlay-kit';
import { ModalType } from '@/types/modal/riseUp';
import RiseUpModal from '@/components/Modal/RiseUpModal';

function SInfoModify({
  modalHandler,
  bModalHandler,
}: {
  bModalHandler: () => void;
  modalHandler: () => void;
}) {
  const { data } = useGetSeniorMyAccountQuery();
  const { mutate: changeImage } = usePostProfileImage();
  const { mutate: updateSeniorAccount } = useChangeSeniorAccount();

  const [modalType, setModalType] = useState<ModalType>('bank');

  const [accHolder, setAccHolder] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [bank, setBank] = useAtom(bankNameAtom);

  const changeNick = useAtomValue(changeNickname);
  const [inputImg, setInputImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>('');
  const fullNum = useAtomValue(phoneNum);
  const newAvailability = useAtomValue(newNotDuplicate);
  const availability = useAtomValue(notDuplicate);
  const phoneAvailability = useAtomValue(phoneNumValidation);

  useEffect(() => {
    if (inputImg) {
      setImgUrl(URL.createObjectURL(inputImg));
    }
  }, [inputImg]);

  useEffect(() => {
    setAccHolder(data?.data?.accountHolder || '');
    setAccNumber(data?.data?.accountNumber || '');
    setBank(data?.data?.bank || '');
  }, [data]);

  const submitHandler = async () => {
    let submitImgUrl = data?.data?.profile;

    if (inputImg) {
      changeImage(
        {
          profileFile: inputImg,
        },
        {
          onSuccess: ({ data }) => {
            submitImgUrl = data.data.profileUrl;
          },
        },
      );
    }

    updateSeniorAccount({
      nickName: changeNick ? changeNick : data?.data?.nickName || '',
      phoneNumber: fullNum || data?.data?.phoneNumber || '',
      profile: submitImgUrl || '',
      accountNumber: accNumber || data?.data?.accountNumber + '',
      bank: bank || data?.data?.bank + '',
      accountHolder: accHolder || data?.data?.accountHolder + '',
    });
  };

  const isAccountNumberChanged = accNumber !== data?.data?.accountNumber;
  const isAccountHolderChanged = accHolder !== data?.data?.accountHolder;
  const isBankChanged = bank !== data?.data?.bank;

  const isPhoneNumberValid = phoneAvailability;
  const isNicknameAvailable =
    changeNick !== '' && newAvailability && availability;
  const isImageUploaded = inputImg !== null;

  const isFormValid =
    isPhoneNumberValid ||
    isNicknameAvailable ||
    isImageUploaded ||
    isAccountNumberChanged ||
    isAccountHolderChanged ||
    isBankChanged;

  return (
    <SInfoContainer>
      <h3 style={{ textAlign: 'center', marginTop: '1rem' }}>계정 설정</h3>
      <SInfoImgBox>
        <RoundedImage
          kind="big"
          imgSrc={imgUrl ? imgUrl : data?.data?.profile || ''}
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
        <NicknameForm defaultValue={data?.data?.nickName} />
      </div>
      <div id="phonenum-form-wrapper">
        <PhoneNumForm defaultValue={data?.data?.phoneNumber} />
      </div>
      <div id="account-form-wrapper">
        <InfoFieldTitle>계좌번호</InfoFieldTitle>
        <InfoFieldForm
          $width="95%"
          type="text"
          value={accNumber}
          onChange={(e) => {
            setAccNumber(e.currentTarget.value);
          }}
        />
      </div>
      <div id="bank-and-name-wrapper">
        <div id="bank-form-wrapper">
          <InfoFieldTitle>은행명</InfoFieldTitle>
          <ModalBtn
            $isGet={!data?.data?.bank}
            type="bankInfo"
            btnText={bank || '\u00A0\u00A0\u00A0\u00A0'}
            modalHandler={bModalHandler}
            onClick={() => {
              setModalType('bank');
              overlay.open(({ unmount, close }) => {
                return (
                  <RiseUpModal
                    modalHandler={() => {
                      close();
                      unmount();
                    }}
                    modalType="bank"
                  />
                );
              });
            }}
          />
        </div>
        <div id="name-form-wrapper">
          <InfoFieldTitle>예금주</InfoFieldTitle>
          <InfoFieldForm
            $width="100%"
            type="text"
            value={accHolder}
            maxLength={5}
            onChange={(e) => {
              setAccHolder(e.currentTarget.value);
            }}
          />
        </div>
      </div>

      <div id="submit-btn-box">
        <NextBtn
          kind={isFormValid ? 'route' : 'route-non'}
          btnText="저장하기"
          onClick={submitHandler}
        />
      </div>
    </SInfoContainer>
  );
}

export default SInfoModify;
