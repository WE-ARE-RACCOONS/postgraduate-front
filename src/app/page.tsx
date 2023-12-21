'use client';
import MenuBar from '../components/Bar/MenuBar';
import Login from '../components/kakao/login';
import { useEffect, useState } from 'react';
import usePrevPath from '../hooks/usePrevPath';
import styled from 'styled-components';
import SeniorProfile from '../components/SeniorProfile/SeniorProfile';
import FieldTapBar from '../components/Bar/FieldTapBar/FieldTapBar';
import UnivTapBar from '../components/Bar/UnivTapBar/UnivTapBar';
import SwiperComponent from '../components/Swiper/Swiper';
import { createPortal } from 'react-dom';
import useModal from '../hooks/useModal';
import DimmedModal from '../components/Modal/DimmedModal';
import Image from 'next/image';
import search from '../../public/search.png'
import logo from '../../public/logo.png'
import SearchModal from '../components/Modal/SearchModal';
import useAuth from '../hooks/useAuth';
import { sfactiveTabAtom, suactiveTabAtom } from '../stores/tap';
import axios from 'axios';
import { useAtomValue } from 'jotai';
export default function Home() {
  const { setCurrentPath } = usePrevPath();
  const [data, setData] = useState([]);
  const field = useAtomValue(sfactiveTabAtom);
  const postgradu = useAtomValue(suactiveTabAtom);
  useEffect(() => {
    setCurrentPath();
  }, []);
  useEffect(() => {
    if (field && postgradu) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/senior/field?field=${field}&postgradu=${postgradu}`,
        )
        .then((res) => {
          setData(res.data.data.seniorSearchResponses);
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
        <Logo>
        <Image
          id="logo"
          src={logo}
          alt="로고"
          width={36}
          height={24}
          priority
          onClick={searchModalHandler}
          style={{marginRight:'0.13rem'}}
        />
        <div className='none-name'>대학원</div>
        <div className='bold-name'>김선배</div>
        </Logo>
        <div style={{display:'flex'}}>
        <Image
          id="search"
          src={search}
          alt="검색"
          sizes="(max-width: 600px) 2.rem"
          priority
          onClick={searchModalHandler}
        />
        <Login />
        </div>
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
        {data && data.length > 0 ? (
          data.map((el, idx) => (
            <div key={idx}>
              <SeniorProfile data={el} />
            </div>
          ))
        ) : (
          <div>해당하는 선배가 없어요</div>
        )}
      </HomeProfileLayer>
      <MenuBarWrapper>
        <MenuBar modalHandler={modalHandler} />
      </MenuBarWrapper>
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
`;
const Logo = styled.div`
  display: flex;
  .none-name{
    font-size: 1.3rem;
  }
  .bold-name{
    font-size: 1.3rem;
    font-weight: 700;
  }
`;
const HomeTopLayer = styled.div`
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;
const HomeBannerLayer = styled.div`
  height: 6.7rem;
  padding: 0 1rem;
`;
const HomeFieldLayer = styled.div`
overflow-x: auto;
  white-space: nowrap;
`;
const HomeUnivLayer = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  padding: 1rem 0.9rem;
`;
const HomeProfileLayer = styled.div`
  height: inherit;
  padding: 1rem;
`;
const MenuBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: inherit;
  z-index: 1;
`;
