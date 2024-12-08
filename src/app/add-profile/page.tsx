'use client';

import ProgressBar from '@/components/Bar/ProgressBar';

import { addProfileSchema } from '@/app/add-profile/schema';
import BackHeader from '@/components/common/Header/BackHeader';

import { FieldError, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ProfileForm from '@/components/Form/ProfileForm';
import SingleValidator from '@/components/common/SingleValidator';

import {
  PROFILE_DIRECTION,
  PROFILE_PLACEHOLDER,
  PROFILE_SUB_DIRECTION,
  PROFILE_TITLE,
} from '@/constants/form/cProfileForm';
import {
  sMultiIntroduce,
  sRecommendedFor,
  sSingleIntroduce,
} from '@/stores/senior';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import useFullModal from '@/hooks/useFullModal';

function AddProfilePage() {
  const { openModal } = useFullModal({
    modalType: 'best-case',
  });
  const [singleIntro, setSingleIntro] = useAtom(sSingleIntroduce);
  const [multiIntro, setMultiIntro] = useAtom(sMultiIntroduce);
  const [recommended, setRecommended] = useAtom(sRecommendedFor);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProfileSchema),
    defaultValues: {
      singleIntro,
      multiIntro,
      recommended,
    },
    mode: 'onChange',
  });

  const router = useRouter();

  const hasErrors =
    errors.multiIntro || errors.recommended || errors.singleIntro;

  const handleClick = async () => {
    if (hasErrors) {
      return;
    }
    router.push('/add-time');
  };

  return (
    <AddProfilePageContainer>
      <BackHeader headerText="멘토링 소개" />
      <ProgressBar totalNum={2} activeNum={0} />
      <div style={{ marginTop: '1.25rem', marginLeft: '1rem' }}>
        <h3>{PROFILE_DIRECTION.addProfile}</h3>
        <div id="profile-sub">{PROFILE_SUB_DIRECTION.addProfile}</div>
      </div>
      <ProfileForm
        flag={false ?? errors.singleIntro}
        lineType="single"
        title={PROFILE_TITLE.singleIntroduce}
        placeholder={PROFILE_PLACEHOLDER.singleIntroduce}
        formType="singleIntro"
        maxLength={100}
        loadStr={singleIntro}
        register={register('singleIntro')}
        changeHandler={(e) => setSingleIntro(e)}
      />

      {errors.singleIntro && (
        <SingleValidator
          msg={errors.singleIntro.message ?? ''}
          textColor="#FF3347"
        />
      )}
      <ProfileForm
        flag={false ?? errors.multiIntro}
        lineType="multi"
        title={PROFILE_TITLE.multiIntroduce}
        placeholder={PROFILE_PLACEHOLDER.multiIntroduce}
        maxLength={1000}
        formType="multiIntro"
        loadStr={multiIntro}
        register={register('multiIntro')}
        changeHandler={(e) => setMultiIntro(e)}
      />

      <div style={{ marginLeft: '1rem' }}>
        {errors.multiIntro && (
          <SingleValidator
            msg={'최소 50자 이상 입력해 주세요.'}
            textColor="#FF3347"
          />
        )}
      </div>
      <ProfileForm
        flag={false ?? errors.recommended}
        lineType="multi"
        title={PROFILE_TITLE.recommendedFor}
        placeholder={PROFILE_PLACEHOLDER.recommendedFor}
        maxLength={1000}
        formType="recommendedFor"
        loadStr={recommended}
        register={register('recommended')}
        changeHandler={(e) => setRecommended(e)}
      />
      <div style={{ marginLeft: '1rem' }}>
        {errors.recommended && (
          <SingleValidator
            msg={'최소 50자 이상 입력해 주세요.'}
            textColor="#FF3347"
          />
        )}
      </div>
      <ShowProfBtn onClick={openModal}>프로필 예시 보기</ShowProfBtn>
      <div style={{ display: 'flex', marginTop: '2rem' }}>
        <PrevBtn
          onClick={() => {
            router.push('/mypage');
          }}
        >
          이전
        </PrevBtn>
        <NextAddBtnSet onClick={handleSubmit(handleClick)} hasError={hasErrors}>
          다음
        </NextAddBtnSet>
      </div>
    </AddProfilePageContainer>
  );
}

export default AddProfilePage;

const AddProfilePageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  #profile-sub {
    margin-top: 0.5rem;
    margin-bottom: 1.69rem;
  }
`;
const PrevBtn = styled.button`
  display: flex;
  width: 35%;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.75rem;
  background: #adb5bd;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 1rem;
`;
const ShowProfBtn = styled.button`
  margin-top: 0.5rem;
  display: flex;
  width: 94%;
  height: 2.875rem;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  background: #495565;
  color: #fff;
  text-align: center;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 1rem;
  border: none;
  cursor: pointer;
`;
const NextAddBtnSet = styled.button<{ hasError: FieldError | undefined }>`
  display: flex;
  width: 57%;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  margin-left: 0.4rem;
  border: none;
  background: ${({ hasError }) => (hasError ? '#dee2e6;' : '#2fc4b2')};
  border-radius: 0.75rem;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;
