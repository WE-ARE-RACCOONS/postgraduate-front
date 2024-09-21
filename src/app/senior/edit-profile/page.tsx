'use client';
import ClickedBtn from '@/components/Button/ClickedBtn';
import ModalBtn from '@/components/Button/ModalBtn';
import BackHeader from '@/components/Header/BackHeader';
import RiseUpModal from '@/components/Modal/RiseUpModal';
import ProfileForm from '@/components/SingleForm/ProfileForm';

import { getDefaultStore } from 'jotai';
import { TextFormEl } from '@/components/SingleForm/TextForm/TextForm.styled';
import TextForm from '@/components/SingleForm/TextForm';
import SingleValidator from '@/components/Validator/SingleValidator';
import {
  PROFILE_PLACEHOLDER,
  PROFILE_TITLE,
} from '@/constants/form/cProfileForm';
import useAuth from '@/hooks/useAuth';
import {
  sAbleTime,
  sChatLink,
  sFieldAtom,
  sKeywordAtom,
  sLabAtom,
  sMultiIntroduce,
  sRecommendedFor,
  sSingleIntroduce,
  selectedFieldAtom,
  selectedKeywordAtom,
  totalFieldAtom,
  totalKeywordAtom,
} from '@/stores/senior';
import findExCode from '@/utils/findExCode';
import axios from 'axios';
import { useAtom, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useFullModal from '@/hooks/useFullModal';
import styled from 'styled-components';
import { overlay } from 'overlay-kit';
import { editProfileSchema } from '@/app/senior/edit-profile/edit-profile-schema';
import { useForm, FormProvider } from 'react-hook-form';
import { seniorProfileFetch } from '@/api/user/profile/getSeniorProfile';

import { updateSeniorProfile } from '@/api/user/profile/updateSeniorProfile';
import { yupResolver } from '@hookform/resolvers/yup';
import { getImgProps } from 'next/dist/shared/lib/get-img-props';

function EditProfilePage() {
  const { getAccessToken, removeTokens } = useAuth();

  const { openModal: openSeniorMentoringTimeModal } = useFullModal({
    modalType: 'senior-mentoring-time',
  });

  const editProfileMethod = useForm({
    resolver: yupResolver(editProfileSchema),
    mode: 'onBlur',
  });

  const {
    register,
    trigger,
    setValue,
    control,
    handleSubmit,
    resetField,
    setError,
    watch,
    formState: { errors },
  } = editProfileMethod;
  const [flag, setFlag] = useState(false);
  const [singleIntro, setSingleIntro] = useAtom(sSingleIntroduce);
  const [multiIntro, setMultiIntro] = useAtom(sMultiIntroduce);
  const [recommended, setRecommended] = useAtom(sRecommendedFor);
  const [chatLink, setChatLink] = useAtom(sChatLink);
  const [sField, setSfield] = useAtom(sFieldAtom);
  const [totalField, setTotalField] = useAtom(totalFieldAtom);
  const [selectedField, setSelectedField] = useAtom(selectedFieldAtom);
  const [totalKeyword, setTotalKeyword] = useAtom(totalKeywordAtom);
  const [selectedKeyword, setSelectedKeyword] = useAtom(selectedKeywordAtom);
  const [sLab, setSlab] = useAtom(sLabAtom);
  const [sKeyword, setSkeyword] = useAtom(sKeywordAtom);
  const [timeData, setTimeData] = useAtom(sAbleTime);
  const router = useRouter();

  const clickHandler = (removeIdx: number) => {
    setTimeData(timeData.filter((_, idx) => idx !== removeIdx));
  };

  const formatField = (fields: string) => {
    return fields.replaceAll(',', ', ');
  };

  const formatKeyword = (keywords: string) => {
    const splittedKeywords = keywords.split(',');
    const resultArray = splittedKeywords.map((str) => '#' + str);
    return resultArray.join(', ');
  };

  useEffect(() => {
    /*const redirectToLogin = async () => {
      const token = await getAccessToken();
      if (!token) {
        const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
        const REDIRECT_URI = `${window.location.origin}/login/oauth2/code/kakao`;
        const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
        window.location.href = link;
        return null;
      }
      return token;
    };*/

    const fetchData = async () => {
      //  const token = await redirectToLogin();

      const token = await getAccessToken();
      if (!token) return;

      try {
        const { data } = await seniorProfileFetch();
        const seniorProfileData = data.data;

        const tempFields = [...totalField];

        seniorProfileData.field.forEach((el) => {
          if (!tempFields.includes(el)) {
            tempFields.push(el);
          }
        });

        setTimeData(seniorProfileData.times || []);
        setTotalField(tempFields);
        setSelectedField(seniorProfileData.field);
        setTotalKeyword(seniorProfileData.keyword);
        setSelectedKeyword(seniorProfileData.keyword);
        setSfield(seniorProfileData.field.join(','));
        setSkeyword(seniorProfileData.keyword.join(','));
        setChatLink(seniorProfileData.chatLink || '');
        setMultiIntro(seniorProfileData.info || '');
        setSingleIntro(seniorProfileData.oneLiner || '');
        setRecommended(seniorProfileData.target || '');
        setSlab(seniorProfileData.lab);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async () => {
    const isValid = await trigger();

    if (isValid) {
      await updateSeniorProfile({
        lab: sLab,
        keyword: sKeyword,
        info: multiIntro,
        target: recommended,
        chatLink: chatLink,
        field: sField,
        oneLiner: singleIntro,
        times: timeData,
      });
      setFlag(true);
    }
  };
  const openRiseUpModal = (modalType: 'field' | 'keyword') => {
    overlay.open(({ unmount }) => {
      if (sField === '') {
        trigger('field');
      }
      if (modalType === 'keyword' && sKeyword === '') {
        trigger('keyword');
      }

      return (
        <FormProvider {...editProfileMethod}>
          <RiseUpModal
            modalHandler={() => {
              unmount();
              if (modalType === 'keyword') {
                setValue('keyword', '');
              }
              if (modalType === 'field') {
                setValue('field', '');
              }
            }}
            modalType={modalType}
          />
        </FormProvider>
      );
    });
  };
  console.log(errors), watch('singleIntro');

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(() => handleClick());
        }}
      >
        <BackHeader headerText="프로필 정보" />
        <EditPContainer>
          <div style={{ marginLeft: '1rem' }}>
            <BtnBox>
              <MBtnFont>
                <div className="title-with-modify">연구실 이름</div>
                {errors.lab?.message && (
                  <div id="warn-msg">&nbsp; {errors.lab.message}</div>
                )}
              </MBtnFont>
              <TextFormEl
                placeholder={sLab ? sLab : '모바일 임베디드 시스템 연구실'}
                defaultValue={sLab}
                {...register('lab')}
                onBlur={(e) => {
                  setSlab(e.target.value);
                  trigger('lab');
                }}
              />
            </BtnBox>
            <BtnBox>
              <MBtnFont>
                <div className="title-with-modify">
                  연구 분야
                  {!sField && (
                    <div id="warn-msg">&nbsp;{errors?.field?.message}</div>
                  )}
                </div>
              </MBtnFont>
              <ModalBtn
                type="seniorInfo"
                btnText={
                  sField ? formatField(sField) : '인공지능, 반도체, 바이오'
                }
                modalHandler={() => openRiseUpModal('field')}
              />
            </BtnBox>
            <BtnBox>
              <MBtnFont>
                <div className="title-with-modify">
                  연구 주제
                  {!sKeyword && (
                    <div id="warn-msg">&nbsp;{errors?.keyword?.message}</div>
                  )}
                </div>
              </MBtnFont>
              <ModalBtn
                type="seniorInfo"
                btnText={
                  sKeyword
                    ? formatKeyword(sKeyword)
                    : '#인공지능, #반도체, #바이오'
                }
                modalHandler={() => openRiseUpModal('keyword')}
              />
            </BtnBox>
          </div>

          <ProfileForm
            flag={!!errors?.singleIntro?.message}
            maxLength={100}
            lineType="single"
            title={PROFILE_TITLE.singleIntroduce}
            placeholder={PROFILE_PLACEHOLDER.singleIntroduce}
            formType="singleIntro"
            loadStr={singleIntro}
            onChange={(e) => setSingleIntro(e.target.value)}
            register={register('singleIntro')}
            errorMessage={errors?.singleIntro?.message}
          />

          <ProfileForm
            flag={!!errors.multiIntro?.message}
            lineType="multi"
            title={PROFILE_TITLE.multiIntroduce}
            placeholder={PROFILE_PLACEHOLDER.multiIntroduce}
            maxLength={1000}
            formType="multiIntro"
            loadStr={multiIntro}
            onChange={(e) => setMultiIntro(e.target.value)}
            register={register('multiIntro')}
            errorMessage={errors?.multiIntro?.message}
          />

          <ProfileForm
            flag={!!errors.recommended?.message}
            lineType="multi"
            title={PROFILE_TITLE.recommendedFor}
            placeholder={PROFILE_PLACEHOLDER.recommendedFor}
            maxLength={1000}
            formType="recommendedFor"
            loadStr={recommended ? recommended : ''}
            onChange={(e) => setRecommended(e.target.value)}
            register={register('recommended')}
            errorMessage={errors?.recommended?.message}
          />

          <EPMentoring>
            <div>
              <div id="mentoring-title">연락 방법</div>
            </div>
            <input
              defaultValue={chatLink ? chatLink : ''}
              type="text"
              id="add-chat-link-form"
              placeholder={PROFILE_PLACEHOLDER.addChatLink}
              {...register('chatLink')}
              onChange={(e) => {
                setChatLink(e.currentTarget.value);
              }}
            />
          </EPMentoring>
          <SetData>
            <div
              style={{
                marginLeft: '1rem',
              }}
            >
              <div id="setData-title">가능한 멘토링 일정</div>
              {errors.timeData?.message && (
                <div id="setData-warn">{errors.timeData.message}</div>
              )}
            </div>
            <SetDataBox>
              {timeData && timeData.length > 0 ? (
                <>
                  {timeData &&
                    timeData.map((el, idx) => (
                      <IntroCardTimeBox key={idx}>
                        {el.day}요일 {el.startTime} ~ {el.endTime}
                        <div
                          id="delete"
                          onClick={() => clickHandler(idx)}
                          style={{ cursor: 'pointer' }}
                        >
                          삭제
                        </div>
                      </IntroCardTimeBox>
                    ))}

                  <div
                    id="setData-btn"
                    onClick={openSeniorMentoringTimeModal}
                    style={{ cursor: 'pointer' }}
                  >
                    추가
                  </div>
                </>
              ) : (
                <SetDataForm {...register('timeData')}>
                  <div id="setDataF-msg">
                    가능한 일정을 3개 이상 알려주세요.
                  </div>
                  <div id="setData-btn" onClick={openSeniorMentoringTimeModal}>
                    + 추가하기
                  </div>
                </SetDataForm>
              )}
            </SetDataBox>
          </SetData>
          <div style={{ marginTop: '3.94rem', marginLeft: '1rem' }}>
            {chatLink && timeData.length >= 3 ? (
              <ClickedBtn
                btnText="저장"
                kind="save"
                clickHandler={handleClick}
              />
            ) : (
              <ClickedBtn
                btnText="저장"
                kind="save-non"
                clickHandler={handleClick}
              />
            )}
          </div>
        </EditPContainer>
      </form>
    </div>
  );
}

export default EditProfilePage;

const EditPContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const SetDataBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  #setData-btn {
    display: flex;
    padding: 0.3125rem 0.625rem;
    align-items: center;
    width: 50px;
    height: 40px;
    gap: 0.25rem;
    justify-content: center;
    border-radius: 0.25rem;
    background: #495565;
    color: #fff;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    line-height: 1.125rem; /* 150% */
    letter-spacing: -0.0375rem;
  }
`;
const IntroCardTimeBox = styled.div`
  margin-left: 1rem;
  width: 91%;
  height: 2.5rem;
  border-radius: 4px;
  background-color: #f8f9fa;
  font-size: 15px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  #delete {
    color: #ff5757;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 1.05rem */
    letter-spacing: -0.03125rem;
  }
`;
const SetDataForm = styled.div`
  margin-left: 1rem;
  margin-top: 0.5rem;
  padding: 0 0.75rem;
  width: 93%;
  height: 44px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  background: white;
  border: 1px solid #dcdfe4;
  #setDataF-msg {
    color: #a6abb0;
    font-family: 'Noto Sans JP';
    font-size: 0.875rem;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
const SetData = styled.div`
  margin-top: 2.75rem;
  #setData-warn {
    color: #f16464;
    font-family: 'Noto Sans JP';
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 0.5rem;
  }
  #setData-title {
    color: #212529;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 1.4rem */
    letter-spacing: -0.03125rem;
  }
`;
const MBtnFont = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  color: #212529;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 0.31rem;
  line-height: normal;

  #font-color {
    color: #00a0e1;
    font-family: Noto Sans JP;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  #warn-msg {
    color: #f16464;
    font-family: 'Noto Sans JP';
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .title-with-modify {
    display: flex;
  }
  .modify-btn {
    border: 0;
    color: #00a0e1;
    font-family: Pretendard;
    border-bottom: 1px solid #00a0e1;
    background-color: transparent;
    font-size: 14px;
    cursor: pointer;
  }
`;
const EPTitle = styled.div`
  margin-left: 1rem;
  color: #212529;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 1.75rem */
  letter-spacing: -0.03125rem;
`;
const BtnBox = styled.div`
  margin-top: 1.8rem;
  margin-bottom: 1.8rem;
`;
const EPMentoring = styled.div`
  margin-left: 1rem;
  #add-chat-link-form {
    width: 95%;
    height: 44px;
    flex-shrink: 0;
    border-radius: 0.5rem;
    border: 1px solid #dcdfe4;
    background: #fff;
    font-size: 13px;
    padding: 0.87rem 0.96rem;

    &::placeholder {
      color: #adb5bd;
      font-family: 'Noto Sans JP';
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  #mentoring-title {
    margin-top: 3.13rem;
    color: #212529;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 1.4rem */
    letter-spacing: -0.03125rem;
    margin-bottom: 0.44rem;
  }
  #mentoring-sub {
    color: #212529;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.225rem */
    letter-spacing: -0.03125rem;
    margin-bottom: 0.56rem;
  }
`;
