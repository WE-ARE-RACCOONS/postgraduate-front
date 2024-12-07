'use client';
import Profile from './(components)/Profile';
import ProfileManage from './(components)/Profile/ProfileManage';
import CustomerCenter from './(components)/ProfileStateChange/CustomerCenter';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useGetSalaryAmountQuery } from '@/hooks/query/useGetSalaryAmount';
import { useAtom } from 'jotai';
import NotLmypage from './(components)/NotLogin/NotLmypage/NotLmypage';
import useModal from '../../hooks/useModal';
import { useGetMyInfoQuery } from '@/hooks/query/useGetMyInfo';
import { createPortal } from 'react-dom';
import DimmedModal from '../../components/Modal/DimmedModal';
import { userType } from '../../types/user/user';
import SalaryBox from './(components)/SalaryBox';
import { mySeniorId } from '../../stores/senior';
import LogoLayer from '@/components/common/LogoLayer/LogoLayer';
import SearchModal from '@/components/Modal/SearchModal';
import AccountShowBtn from '@/components/common/Button/AccountShowBtn/AccountShowBtn';
import MenuBar from '@/components/Bar/MenuBar';
import Footer from '@/components/common/Footer';
import { certifiRegAtom, profileRegAtom } from '@/stores/signup';

import useFullModal from '@/hooks/useFullModal';
import { overlay } from 'overlay-kit';
import useDimmedModal from '@/hooks/useDimmedModal';

function MyPage() {
  const [certifiReg, setCertifiReg] = useAtom(certifiRegAtom);
  const [profileReg, setProfileReg] = useAtom(profileRegAtom);
  const [senior, setSenior] = useAtom(mySeniorId);
  const [userT, setUserT] = useState<string | null>(null);

  const { getUserType } = useAuth();
  useEffect(() => {
    setUserT(getUserType());
  }, []);

  const isJunior = getUserType() === 'junior' ? true : false;

  const { data, isLoading, error } = useGetMyInfoQuery({ isJunior });
  const { data: salaryData } = useGetSalaryAmountQuery();

  const {
    modal: BModal,
    modalHandler: BModalHandler,
    portalElement: BPotalElement,
  } = useModal('senior-info-portal');
  const {
    modal: seniorChangemodal,
    modalHandler: seiorChangemodalHandler,
    portalElement: seniorChangePortalElement,
  } = useModal('senior-request-portal');

  const {
    modal: suggestModal,
    modalHandler: suggestModalHandler,
    portalElement: suggesPortalElement,
  } = useModal('suggest-mypage-portal');

  const {
    modal: authModal,
    modalHandler: authHandler,
    portalElement: authPortalElement,
  } = useModal('senior-auth-portal');

  const { openModal: openSeniorInfoModifyModal } = useFullModal({
    modalType: 'senior-info-modify',
  });

  const { openModal: openLoginRequestModal } = useDimmedModal({
    modalType: 'notuser',
  });

  useEffect(() => {
    if (data) {
      setCertifiReg(data?.certificationRegister);
      setProfileReg(data?.profileRegister);
      setSenior(data?.seniorId);
    }
  }, [data]);

  const nickName = data?.nickName;
  const profile = data?.profile;

  return (
    <div
      style={{ backgroundColor: '#F8F9FA', width: 'inherit', height: '100vh' }}
    >
      <LogoLayer
        modalHandler={() => {
          overlay.open(({ unmount }) => {
            return <SearchModal modalHandler={unmount} />;
          });
        }}
      />
      {userT ? (
        <div style={{ backgroundColor: '#F8F9FA', marginTop: '1rem' }}>
          <Profile
            profile={profile || ''}
            nickName={nickName || ''}
            userType={userT as userType}
            profileReg={profileReg}
            certifiReg={certifiReg}
            modalHandler={suggestModalHandler}
          />
          {userT === 'senior' && (
            <div style={{ backgroundColor: 'white' }}>
              <SalaryBox
                salaryDate={salaryData?.data?.salaryDate ?? ''}
                salaryAmount={salaryData?.data?.salaryAmount ?? 0}
              />
              <div style={{ marginTop: '0.5rem' }}>
                <AccountShowBtn />
              </div>
            </div>
          )}
          <ProfileManage
            userType={userT as userType}
            certifiReg={certifiReg}
            profileReg={profileReg}
            modalHandler={seiorChangemodalHandler}
            BmodalHandler={BModalHandler}
            AmodalHandler={authHandler}
            seniorId={senior}
          />
        </div>
      ) : (
        <NotLmypage modalHandler={openLoginRequestModal}></NotLmypage>
      )}
      <div
        style={{
          backgroundColor: '#F8F9FA',
          marginTop: '1rem',
          paddingBottom: userT === 'senior' ? '4rem' : '',
          border: 'none',
        }}
      >
        <CustomerCenter />
        <Footer />
      </div>
      <MenuBar modalHandler={openLoginRequestModal} />
      {seniorChangemodal && seniorChangePortalElement
        ? createPortal(
            <DimmedModal
              modalType="notSenior"
              modalHandler={seiorChangemodalHandler}
            />,
            seniorChangePortalElement,
          )
        : ''}

      {suggestModal && suggesPortalElement
        ? createPortal(
            <DimmedModal
              modalType="mypageSuggest"
              infoHandler={openSeniorInfoModifyModal}
              modalHandler={suggestModalHandler}
            />,
            suggesPortalElement,
          )
        : ''}

      {authModal && authPortalElement
        ? createPortal(
            <DimmedModal
              certifiReg={certifiReg}
              modalType="authAproveMsg"
              modalHandler={authHandler}
            />,
            authPortalElement,
          )
        : null}
    </div>
  );
}

export default MyPage;
