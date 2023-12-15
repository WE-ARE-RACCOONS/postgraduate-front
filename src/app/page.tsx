'use client';
import MenuBar from '@/components/Bar/MenuBar';
import Login from '@/components/kakao/login';
import { useEffect, useState } from 'react';
import usePrevPath from '@/hooks/usePrevPath';
import styled from 'styled-components';
import SeniorProfile from '@/components/SeniorProfile/SeniorProfile';
import FieldTapBar from '@/components/Bar/FieldTapBar/FieldTapBar';
import UnivTapBar from '@/components/Bar/UnivTapBar/UnivTapBar';
import SwiperComponent from '@/components/Swiper/Swiper';
import { createPortal } from 'react-dom';
import useModal from '@/hooks/useModal';
import DimmedModal from '@/components/Modal/DimmedModal';
import Image from 'next/image';
import search from '../../public/search.png';
import SearchModal from '@/components/Modal/SearchModal';
import useAuth from '@/hooks/useAuth';
import { sfactiveTabAtom, suactiveTabAtom } from '@/stores/tap';
import axios from 'axios';
import { useAtomValue } from 'jotai';
export default function Home() {
  const { setCurrentPath } = usePrevPath();
  const { getAccessToken } = useAuth();
  const [data, setData] = useState('');
  const field = useAtomValue(sfactiveTabAtom);
  const postgradu = useAtomValue(suactiveTabAtom);
  useEffect(() => {
    setCurrentPath();
  }, []);
  useEffect(() => {
    const Token = getAccessToken();
    const headers = {
      Authorization: `Bearer ${Token}`,
    };

    if (field && postgradu) {
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/senior/field?field=${field}&postgradu=${postgradu}`, { headers })
        .then((res) => {
          setData(res.data.data.seniorSearchResponses);
          console.log(res.data.data.seniorSearchResponses);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [field, postgradu]);
  const { modal, modalHandler, portalElement } = useModal(
    'login-request-portal',
  );
  const {
    modal: searchModal,
    modalHandler: searchModalHandler,
    portalElement: searchPortalElement,
  } = useModal('search-portal');

  return (
    <HomeLayer>
      <HomeTopLayer>
        <Image
          id="search"
          src={search}
          alt="검색"
          sizes="(max-width: 600px) 3.rem"
          priority
          onClick={searchModalHandler}
        />
        <Login />
      </HomeTopLayer>
      <HomeBannerLayer>
        <SwiperComponent />
      </HomeBannerLayer>
      <HomeFieldLayer>
        <FieldTapBar />
      </HomeFieldLayer>
      <HomeUnivLayer>
        <UnivTapBar />
      </HomeUnivLayer>
      <HomeProfileLayer>
        {data && data
          ? data.map((el, idx) => {
            <div key={idx}>
             <SeniorProfile data={el} />
             </div>
            })
          : '해당하는 선배가 없어요'}
        {/* <SeniorProfile /> */}
      </HomeProfileLayer>
      <MenuBar modalHandler={modalHandler} />
      {modal && portalElement
        ? createPortal(
            <DimmedModal modalType="notuser" modalHandler={modalHandler} />,
            portalElement,
          )
        : ''}
      {searchModal && searchPortalElement
        ? createPortal(
            <SearchModal modalHandler={searchModalHandler} />,
            searchPortalElement,
          )
        : ''}
    </HomeLayer>
  );
}

const HomeLayer = styled.div`
  width: inherit;
  height: inherit;
  border: 1px solid blue;
`;
const HomeTopLayer = styled.div`
  border: 1px solid black;
  height: 4rem;
`;
const HomeBannerLayer = styled.div`
  border: 1px solid black;
  height: 6.7rem;
`;
const HomeFieldLayer = styled.div`
  border: 1px solid black;
  height: 4.9rem;
`;
const HomeUnivLayer = styled.div`
  border: 1px solid black;
  height: 4.1rem;
`;
const HomeProfileLayer = styled.div`
  border: 1px solid black;
`;
