'use client';
import Profile from '@/components/Profile';
import ProfileManage from '@/components/Profile/ProfileManage';
import CustomerCenter from '@/components/Profile/ProfileStateChange/CustomerCenter';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import { useAtomValue } from 'jotai';
import { accessTokenAtom } from '@/stores/user';
import NotLmypage from '@/components/NotLogin/NotLmypage/NotLmypage';
import useModal from '@/hooks/useModal';
import { createPortal } from 'react-dom';
import FullModal from '@/components/Modal/FullModal';
import DimmedModal from '@/components/Modal/DimmedModal';

import { userType } from '@/types/user/user';
import SalaryBox from '@/components/Box/SalaryBox';
import { useRouter } from 'next/navigation';
import { certiRegType } from '@/types/profile/profile';

function MyPage() {
  const [nickName, setnickName] = useState<string | null>(null);
  const [profile, setprofile] = useState<string | null>(null);
  const [salaryDate, setSalaryDate] = useState('');
  const [salaryAmount, setSalaryAmount] = useState(0);
  const [certifiReg, setCertifiReg] = useState<certiRegType>('WAITING');
  const [profileReg, setProfileReg] = useState(true);
  const { modal, modalHandler, portalElement } = useModal(
    'login-request-full-portal',
  );
  const {
    modal: seniorChangemodal,
    modalHandler: seiorChangemodalHandler,
    portalElement: seniorChangePortalElement,
  } = useModal('senior-request-portal');
  const { getAccessToken, getUserType } = useAuth();
  const Token = getAccessToken();
  const userType = getUserType();
  const router = useRouter();

  useEffect(() => {
    if (Token) {
      const headers = {
        Authorization: `Bearer ${Token}`,
      };

      if (userType == 'junior') {
        axios
          .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/me`, { headers })
          .then((res) => {
            setnickName(res.data.data.nickName);
            setprofile(res.data.data.profile);
          })
          .catch(function (error) {
            console.log(error);
          });
        return;
      }

      if (userType == 'senior') {
        axios
          .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/senior/me`, { headers })
          .then((res) => {
            setnickName(res.data.data.nickName);
            setprofile(res.data.data.profile);
            setCertifiReg(res.data.data.certificationRegister);
            setProfileReg(res.data.data.profileRegister);
          })
          .catch(function (error) {
            console.log(error);
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
  }, [Token]);

  return (
    <div>
      {Token ? (
        <div>
          <Profile
            profile={profile ? profile : ''}
            nickName={nickName ? nickName : ''}
            userType={userType ? (userType as userType) : 'junior'}
            profileReg={profileReg}
            certifiReg={certifiReg}
          />
          {userType == 'senior' && (
            <>
              <SalaryBox salaryDate={salaryDate} salaryAmount={salaryAmount} />
              <button
                onClick={() => {
                  router.push('/mypage/salary');
                }}
              >
                정산 내역 보기
              </button>
            </>
          )}
          <ProfileManage
            userType={userType ? (userType as userType) : 'junior'}
            certifiReg={certifiReg}
            profileReg={profileReg}
            modalHandler={seiorChangemodalHandler}
          />
        </div>
      ) : (
        <div>
          <NotLmypage modalHandler={modalHandler}></NotLmypage>
        </div>
      )}
      <CustomerCenter />
      {modal && portalElement
        ? createPortal(
            <FullModal modalType="login-request" modalHandler={modalHandler} />,
            portalElement,
          )
        : ''}
      {seniorChangemodal && seniorChangePortalElement
        ? createPortal(
            <DimmedModal
              modalType="notSenior"
              modalHandler={seiorChangemodalHandler}
            />,
            seniorChangePortalElement,
          )
        : ''}
    </div>
  );
}

export default MyPage;
