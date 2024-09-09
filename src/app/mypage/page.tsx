'use client';
import Profile from '../../components/Profile';
import ProfileManage from '../../components/Profile/ProfileManage';
import CustomerCenter from '../../components/Profile/ProfileStateChange/CustomerCenter';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useAtom } from 'jotai';
import NotLmypage from '../../components/NotLogin/NotLmypage/NotLmypage';
import useModal from '../../hooks/useModal';
import { createPortal } from 'react-dom';
import DimmedModal from '../../components/Modal/DimmedModal';
import { userType } from '../../types/user/user';
import SalaryBox from '../../components/Box/SalaryBox';
import { mySeniorId } from '../../stores/senior';
import LogoLayer from '@/components/LogoLayer/LogoLayer';
import SearchModal from '@/components/Modal/SearchModal';
import AccountShowBtn from '@/components/Button/AccountShowBtn/AccountShowBtn';
import MenuBar from '@/components/Bar/MenuBar';
import RiseUpModal from '@/components/Modal/RiseUpModal';
import findExCode from '@/utils/findExCode';
import Footer from '@/components/Footer';
import { certifiRegAtom, profileRegAtom } from '@/stores/signup';
import { useRouter } from 'next/navigation';
import useFullModal from '@/hooks/useFullModal';

function MyPage() {
  const [nickName, setnickName] = useState<string | null>(null);
  const [profile, setprofile] = useState<string | null>(null);
  const [salaryDate, setSalaryDate] = useState('');
  const [salaryAmount, setSalaryAmount] = useState(0);
  const [certifiReg, setCertifiReg] = useAtom(certifiRegAtom);
  const [profileReg, setProfileReg] = useAtom(profileRegAtom);
  const [senior, setSenior] = useAtom(mySeniorId);

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
    modal: searchModal,
    modalHandler: searchModalHandler,
    portalElement: searchPortalElement,
  } = useModal('search-portal');
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

  const { openModal: openLoginRequestModal } = useFullModal({
    modalType: 'login-request',
  });

  const { getAccessToken, getUserType, removeTokens } = useAuth();
  const [accessTkn, setAccessTkn] = useState('');
  const [userType, setUserType] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userT = getUserType();
    if (userT) setUserType(userT);
    getAccessToken().then((userTkn) => {
      if (userTkn) setAccessTkn(userTkn);
    });
  }, []);

  useEffect(() => {
    if (accessTkn) {
      const headers = {
        Authorization: `Bearer ${accessTkn}`,
      };

      if (userType == 'junior') {
        axios
          .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/me`, { headers })
          .then((res) => {
            if (findExCode(res.data.code)) {
              removeTokens();
              location.reload();
              return;
            }

            setnickName(res.data.data.nickName);
            setprofile(res.data.data.profile);
          })
          .catch(function (error) {
            console.error(error);
          });
        return;
      }

      if (userType == 'senior') {
        axios
          .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/senior/me`, { headers })
          .then((res) => {
            if (findExCode(res.data.code)) {
              removeTokens();
              location.reload();
              return;
            }

            setnickName(res.data.data.nickName);
            setprofile(res.data.data.profile);
            setCertifiReg(res.data.data.certificationRegister);
            setProfileReg(res.data.data.profileRegister);
            setSenior(res.data.data.seniorId);
          })
          .catch(function (error) {
            console.error(error);
          });

        axios
          .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/salary`, { headers })
          .then((res) => {
            if (res.data.code == 'SLR200') {
              setSalaryDate(res.data.data.salaryDate);
              setSalaryAmount(res.data.data.salaryAmount);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }, [accessTkn, userType]);

  return (
    <div
      style={{ backgroundColor: '#F8F9FA', width: 'inherit', height: '100vh' }}
    >
      <LogoLayer modalHandler={searchModalHandler} />
      {accessTkn ? (
        <div style={{ backgroundColor: '#F8F9FA', marginTop: '1rem' }}>
          <Profile
            profile={profile ? profile : ''}
            nickName={nickName ? nickName : ''}
            userType={userType ? (userType as userType) : 'junior'}
            profileReg={profileReg}
            certifiReg={certifiReg}
            modalHandler={suggestModalHandler}
          />
          {userType == 'senior' && (
            <div style={{ backgroundColor: 'white' }}>
              <SalaryBox salaryDate={salaryDate} salaryAmount={salaryAmount} />
              <div style={{ marginTop: '0.5rem' }}>
                <AccountShowBtn />
              </div>
            </div>
          )}
          <ProfileManage
            userType={userType ? (userType as userType) : 'junior'}
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
          paddingBottom: userType == 'senior' ? '4rem' : '',
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
      {searchModal && searchPortalElement
        ? createPortal(
            <SearchModal modalHandler={searchModalHandler} />,
            searchPortalElement,
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

      {BModal && BPotalElement
        ? createPortal(
            <RiseUpModal modalHandler={BModalHandler} modalType={'bank'} />,
            BPotalElement,
          )
        : null}
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
