'use client';
import MenuBar from '@/components/Bar/MenuBar';
import Login from '@/components/kakao/login';
import { useEffect } from 'react';
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
export default function Home() {
  const { setCurrentPath } = usePrevPath();
  const { modal, modalHandler, portalElement } = useModal(
    'login-request-portal',
  );
  const { modal : searchModal, modalHandler: searchModalHandler, portalElement:searchPortalElement } = useModal(
    'search-portal',
  );
  useEffect(() => {
    setCurrentPath();
  }, []);

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
        {/* {data && data!.length !== 0
          ? data!.map((el, idx) => {
              return <SeniorProfile key={idx} data={el} />;
            })
          : '해당하는 선배가 없어요'} */}
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
