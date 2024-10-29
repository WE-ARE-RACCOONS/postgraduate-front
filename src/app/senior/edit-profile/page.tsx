'use client';
import ClickedBtn from '@/components/Button/ClickedBtn';
import ModalBtn from '@/components/Button/ModalBtn';
import BackHeader from '@/components/Header/BackHeader';
import RiseUpModal from '@/components/Modal/RiseUpModal';
import ProfileForm from '@/components/SingleForm/ProfileForm';

import Image from 'next/image';
import WhiteAddBtnIcon from '../../../../public/white-add-btn.svg';
import { TextFormEl } from '@/components/SingleForm/TextForm/TextForm.styled';
import {
  PROFILE_PLACEHOLDER,
  PROFILE_TITLE,
} from '@/constants/form/cProfileForm';

import useFullModal from '@/hooks/useFullModal';
import styled from 'styled-components';
import { overlay } from 'overlay-kit';
import { editProfileSchema } from '@/app/senior/edit-profile/edit-profile-schema';
import { useForm, FormProvider } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import useSEdit from '@/hooks/useSEdit';
import { useEffect, useState } from 'react';

function EditProfilePage() {
  const { openModal: openSeniorMentoringTimeModal } = useFullModal({
    modalType: 'senior-mentoring-time',
  });

  const editProfileMethod = useForm({
    resolver: yupResolver(editProfileSchema),
    mode: 'all',
  });

  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = editProfileMethod;

  const {
    singleIntro,
    setSingleIntro,
    multiIntro,
    setMultiIntro,
    recommended,
    setRecommended,
    chatLink,
    setChatLink,
    sField,
    allFieldValid,
    sLab,
    setSlab,
    sKeyword,
    timeData,
    setTimeData,
    checkAllFieldIsValid,
    handleClickConfirmBtn,
  } = useSEdit();

  const [_allFieldState, _setAllFieldState] = useState(checkAllFieldIsValid());
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

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(() => handleClickConfirmBtn());
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
            register={register('singleIntro')}
            changeHandler={(e) => setSingleIntro(e)}
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
            register={register('multiIntro')}
            changeHandler={(e) => setMultiIntro(e)}
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
            register={register('recommended')}
            changeHandler={(e) => {
              setRecommended(e);
            }}
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
                    <Image
                      src={WhiteAddBtnIcon}
                      alt="흰색 더하기 화살표 버튼"
                      width={10}
                      height={10}
                    />
                    추가하기
                  </div>
                </>
              ) : (
                <SetDataForm {...register('timeData')}>
                  <div id="setDataF-msg">
                    가능한 일정을 3개 이상 알려주세요.
                  </div>
                  <div id="setData-btn" onClick={openSeniorMentoringTimeModal}>
                    + 추가
                  </div>
                </SetDataForm>
              )}
            </SetDataBox>
          </SetData>
          <div style={{ marginTop: '3.94rem', marginLeft: '1rem' }}>
            {allFieldValid ? (
              <ClickedBtn
                btnText="저장"
                kind="save"
                clickHandler={handleClickConfirmBtn}
              />
            ) : (
              <ClickedBtn
                btnText="저장"
                kind="save-non"
                clickHandler={() => {}}
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
  margin-top: 10px;
  #setData-btn {
    display: flex;
    margin-top: 14px;
    border-radius: 5px;
    background: #6d747e;
    align-items: center;
    width: 75px;
    height: 28px;
    min-width: 50px;
    height: 40px;
    gap: 0.25rem;
    justify-content: center;

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
  width: 330px;
  margin: 5px auto;
  height: 2.5rem;
  border-radius: 6px;
  color: #464c51;
  background-color: #f8f9fa;
  font-size: 13px;
  padding: 0.75rem;

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
