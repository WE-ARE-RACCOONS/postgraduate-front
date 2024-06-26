'use client';
import ClickedBtn from '@/components/Button/ClickedBtn';
import ModalBtn from '@/components/Button/ModalBtn';
import BackHeader from '@/components/Header/BackHeader';
import FullModal from '@/components/Modal/FullModal';
import RiseUpModal from '@/components/Modal/RiseUpModal';
import ProfileForm from '@/components/SingleForm/ProfileForm';
import TextForm from '@/components/SingleForm/TextForm';
import SingleValidator from '@/components/Validator/SingleValidator';
import {
  PROFILE_PLACEHOLDER,
  PROFILE_TITLE,
} from '@/constants/form/cProfileForm';
import useAuth from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';
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
import { ModalType } from '@/types/modal/riseUp';
import findExCode from '@/utils/findExCode';
import axios from 'axios';
import { useAtom, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

function EditProfilePage() {
  const { getAccessToken, removeTokens } = useAuth();
  const [modalType, setModalType] = useState<ModalType>('postgradu');
  const { modal, modalHandler, portalElement } = useModal('senior-info-portal');
  const {
    modal: timeModal,
    modalHandler: timeModalHandler,
    portalElement: timePortalElement,
  } = useModal('senior-mentoring-time-portal');
  const [flag, setFlag] = useState(false);
  const [labFlag, setLabFlag] = useState(false);
  const [fieldFlag, setFieldFlag] = useState(false);
  const [keywordFlag, setKeywordFlag] = useState(false);
  const [singleFlag, setSingleFlag] = useState(false);
  const [multiFlag, setMultiFlag] = useState(false);
  const [recommendFlag, setRecommendFlag] = useState(false);
  const [chatLinkFlag, setChatLinkFlag] = useState(false);
  const [timeFlag, setTimeFlag] = useState(false);
  const [singleIntro, setSingleIntro] = useAtom(sSingleIntroduce);
  const [multiIntro, setMultiIntro] = useAtom(sMultiIntroduce);
  const [recommended, setRecommended] = useAtom(sRecommendedFor);
  const [chatLink, setChatLink] = useAtom(sChatLink);
  const [sField, setSfield] = useAtom(sFieldAtom);
  const [totalField, setTotalField] = useAtom(totalFieldAtom);
  const setSelectedField = useSetAtom(selectedFieldAtom);
  const setTotalKeyword = useSetAtom(totalKeywordAtom);
  const setSelectedKeyword = useSetAtom(selectedKeywordAtom);
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

  function validateLab() {
    if (sLab.length <= 0) setLabFlag(true);
    else setLabFlag(false);
  }

  function validateField() {
    if (sField.length <= 0) setFieldFlag(true);
    else setFieldFlag(false);
  }

  function validateKeyword() {
    if (sKeyword.length <= 0) setKeywordFlag(true);
    else setKeywordFlag(false);
  }

  function validateSingleIntro() {
    if (singleIntro.length < 10) setSingleFlag(true);
    else setSingleFlag(false);
  }

  function validateMultiIntro() {
    if (multiIntro.length < 50) setMultiFlag(true);
    else setMultiFlag(false);
  }

  function validateRecommended() {
    if (recommended.length < 50) setRecommendFlag(true);
    else setRecommendFlag(false);
  }

  function validateChatLink() {
    if (chatLink.length <= 0) setChatLinkFlag(true);
    else setChatLinkFlag(false);
  }

  useEffect(() => {
    validateLab();
  }, [sLab]);
  useEffect(() => {
    validateField();
  }, [sField]);
  useEffect(() => {
    validateKeyword();
  }, [sKeyword]);
  useEffect(() => {
    validateSingleIntro();
  }, [singleIntro]);
  useEffect(() => {
    validateMultiIntro();
  }, [multiIntro]);
  useEffect(() => {
    validateRecommended();
  }, [recommended]);
  useEffect(() => {
    validateChatLink();
  }, [chatLink]);
  useEffect(() => {
    validateTime();
  }, [timeData]);

  function validateTime() {
    if (timeData.length < 3) setTimeFlag(true);
    else setTimeFlag(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      getAccessToken().then(async (token) => {
        if (!token) {
          // 알림톡으로 들어와서 토큰 없을 시, 로그인으로 이동
          const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
          const REDIRECT_URI =
            window.location.origin + '/login/oauth2/code/kakao';
          const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
          window.location.href = link;
          return;
        }

        if (token) {
          try {
            const headers = {
              Authorization: `Bearer ${token}`,
            };

            axios
              .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/senior/me/profile`, {
                headers,
              })
              .then((response) => {
                const res = response.data;

                if (findExCode(res.code)) {
                  removeTokens();
                  location.reload();
                  return;
                }

                const tempFields = [...totalField];
                res.data.field.forEach((el: string) => {
                  if (!tempFields.includes(el)) tempFields.push(el);
                });

                setTimeData(res.data.times ? res.data.times : []);
                setTotalField(tempFields);
                setSelectedField(res.data.field);
                setTotalKeyword(res.data.keyword);
                setSelectedKeyword(res.data.keyword);
                setSfield(res.data.field.join(','));
                setSkeyword(res.data.keyword.join(','));
                setChatLink(res.data.chatLink ? res.data.chatLink : '');
                setMultiIntro(res.data.info ? res.data.info : '');
                setSingleIntro(res.data.oneLiner ? res.data.oneLiner : '');
                setRecommended(res.data.target ? res.data.target : '');
                setSlab(res.data.lab);
              })
              .catch((err) => {
                console.error(err);
              });
          } catch (error) {
            console.error(error);
          }
        }
      });
    };

    fetchData();
  }, []);

  const handleClick = () => {
    const areConditionsMet =
      singleIntro.length >= 10 &&
      multiIntro.length >= 50 &&
      recommended.length >= 50;

    getAccessToken().then((token) => {
      if (
        token &&
        areConditionsMet &&
        chatLink &&
        timeData.length >= 3 &&
        sField &&
        sKeyword &&
        sLab
      ) {
        setFlag(false);
        axios
          .patch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/senior/me/profile`,
            {
              lab: sLab,
              keyword: sKeyword,
              info: multiIntro,
              target: recommended,
              chatLink: chatLink,
              field: sField,
              oneLiner: singleIntro,
              times: timeData,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then((res) => {
            if (findExCode(res.data.code)) {
              removeTokens();
              location.reload();
              return;
            }
            router.back();
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    });

    setFlag(true);
  };

  return (
    <div>
      <BackHeader headerText="프로필 정보" />
      <EditPContainer>
        <EPTitle>프로필 정보</EPTitle>
        <div style={{ marginBottom: '2.62rem', marginLeft: '1rem' }}>
          <BtnBox>
            <MBtnFont>
              <div className="title-with-modify">
                연구실명&nbsp;<div id="font-color">*</div>
              </div>
              {labFlag && (
                <div id="warn-msg">&nbsp;연구실명을 입력해주세요</div>
              )}
            </MBtnFont>
            <TextForm
              placeholder={sLab ? sLab : '연구실 이름을 입력해주세요.'}
              targetAtom="lab"
              max={30}
            />
          </BtnBox>
          <BtnBox>
            <MBtnFont>
              <div className="title-with-modify">
                연구분야&nbsp;<div id="font-color">*</div>
                {fieldFlag && (
                  <div id="warn-msg">&nbsp;최소 1개 이상 선택해주세요</div>
                )}
              </div>
              <button
                className="modify-btn"
                onClick={() => {
                  setModalType('field');
                  modalHandler();
                }}
              >
                수정
              </button>
            </MBtnFont>
            <ModalBtn
              type="seniorInfo"
              btnText={sField ? formatField(sField) : '연구분야*'}
              modalHandler={modalHandler}
              onClick={() => {
                setModalType('field');
              }}
            />
          </BtnBox>
          <BtnBox>
            <MBtnFont>
              <div className="title-with-modify">
                연구주제&nbsp;<div id="font-color">*</div>
                {keywordFlag && (
                  <div id="warn-msg">&nbsp;최소 1개 이상 입력해주세요</div>
                )}
              </div>
              <button
                className="modify-btn"
                onClick={() => {
                  setModalType('keyword');
                  modalHandler();
                }}
              >
                수정
              </button>
            </MBtnFont>
            <ModalBtn
              type="seniorInfo"
              btnText={sKeyword ? formatKeyword(sKeyword) : '연구 주제 키워드*'}
              modalHandler={modalHandler}
              onClick={() => {
                setModalType('keyword');
              }}
            />
          </BtnBox>
        </div>
        <EPTitle>멘토링 정보</EPTitle>
        <ProfileForm
          flag={singleFlag}
          maxLength={100}
          lineType="single"
          title={PROFILE_TITLE.singleIntroduce}
          placeholder={PROFILE_PLACEHOLDER.singleIntroduce}
          formType="singleIntro"
          loadStr={singleIntro}
          changeHandler={setSingleIntro}
        />
        <div style={{ marginLeft: '1rem' }}>
          {singleFlag && (
            <SingleValidator
              msg={'최소 10자 이상 입력해 주세요.'}
              textColor="#FF3347"
            />
          )}
        </div>
        <ProfileForm
          flag={multiFlag}
          lineType="multi"
          title={PROFILE_TITLE.multiIntroduce}
          placeholder={PROFILE_PLACEHOLDER.multiIntroduce}
          maxLength={1000}
          formType="multiIntro"
          loadStr={multiIntro}
          changeHandler={setMultiIntro}
        />
        <div style={{ marginLeft: '1rem' }}>
          {multiFlag && (
            <SingleValidator
              msg={'최소 50자 이상 입력해 주세요.'}
              textColor="#FF3347"
            />
          )}
        </div>
        <ProfileForm
          flag={recommendFlag}
          lineType="multi"
          title={PROFILE_TITLE.recommendedFor}
          placeholder={PROFILE_PLACEHOLDER.recommendedFor}
          maxLength={1000}
          formType="recommendedFor"
          loadStr={recommended ? recommended : ''}
          changeHandler={setRecommended}
        />
        <div style={{ marginLeft: '1rem' }}>
          {recommendFlag && (
            <SingleValidator
              msg={'최소 50자 이상 입력해 주세요.'}
              textColor="#FF3347"
            />
          )}
        </div>
        <EPMentoring>
          <div>
            <div id="mentoring-title">카카오톡 오픈 채팅방 링크</div>
            <div id="mentoring-sub">
              매칭된 후배와 대화할 오픈채팅 방이에요.
              <br />
              비대면 회의 링크나 급한 공지를 전달해요.
            </div>
          </div>
          <input
            defaultValue={chatLink ? chatLink : ''}
            type="text"
            id="add-chat-link-form"
            placeholder={PROFILE_PLACEHOLDER.addChatLink}
            onChange={(e) => {
              setChatLink(e.currentTarget.value);
            }}
          />
        </EPMentoring>
        <SetData>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '1rem',
            }}
          >
            <div id="setData-title">가능 정기일정</div>
            {timeFlag && (
              <div id="setData-warn">최소 3개 이상 일정을 추가해주세요</div>
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '0.5rem',
                  }}
                >
                  <div
                    id="setData-btn"
                    onClick={timeModalHandler}
                    style={{ cursor: 'pointer' }}
                  >
                    추가하기
                  </div>
                </div>
              </>
            ) : (
              <SetDataForm>
                <div id="setDataF-msg">입력된 정기 일정이 없습니다.</div>
                <div id="setData-btn" onClick={timeModalHandler}>
                  + 추가하기
                </div>
              </SetDataForm>
            )}
          </SetDataBox>
        </SetData>
        <div style={{ marginTop: '3.94rem', marginLeft: '1rem' }}>
          {chatLink && timeData.length >= 3 ? (
            <ClickedBtn btnText="저장" kind="save" clickHandler={handleClick} />
          ) : (
            <ClickedBtn
              btnText="저장"
              kind="save-non"
              clickHandler={handleClick}
            />
          )}
        </div>
      </EditPContainer>
      {modal && portalElement
        ? createPortal(
            <RiseUpModal modalHandler={modalHandler} modalType={modalType} />,
            portalElement,
          )
        : null}
      {timeModal && timePortalElement
        ? createPortal(
            <FullModal
              modalType="senior-mentoring-time"
              modalHandler={timeModalHandler}
            />,
            timePortalElement,
          )
        : null}
    </div>
  );
}

export default EditProfilePage;

const EditPContainer = styled.div``;
const SetDataBox = styled.div`
  #setData-btn {
    display: inline-flex;
    padding: 0.3125rem 0.625rem;
    align-items: center;
    gap: 0.25rem;
    border-radius: 0.25rem;
    background: #495565;
    color: #fff;
    font-family: Pretendard;
    font-size: 0.75rem;
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
  padding: 0 0.75rem;
  width: 93%;
  height: 3.1875rem;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  background: #f8f9fa;
  #setDataF-msg {
    color: #adb5bd;
    font-family: 'Noto Sans JP';
    font-size: 1rem;
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
    font-size: 1rem;
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
  font-family: Noto Sans JP;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
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
  margin-top: 1rem;
`;
const EPMentoring = styled.div`
  margin-left: 1rem;
  #add-chat-link-form {
    width: 95%;
    height: 3.1875rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    border: 1px solid #c2cede;
    background: #fff;
    padding: 0.87rem 0.96rem;

    &::placeholder {
      color: #adb5bd;
      font-family: 'Noto Sans JP';
      font-size: 1rem;
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
