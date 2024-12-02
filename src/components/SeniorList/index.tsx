'use client';

import MenuBar from '@/components/Bar/MenuBar';
import { Suspense, useEffect, useState } from 'react';
import usePrevPath from '@/hooks/usePrevPath';
import { useQueryState, parseAsInteger } from 'nuqs';
import styled from 'styled-components';
import SeniorProfile from '@/components/SeniorProfile/SeniorProfile';
import FieldTapBar from '@/components/Bar/FieldTapBar/FieldTapBar';

import { DropdownProvider } from '../DropDown/common/useDropdown';
import UnivTapBar from '@/components/Bar/UnivTapBar/UnivTapBar';
import { SeniorListPagination } from '../Pagination/SeniorListPagination';
import SwiperComponent from '@/components/Swiper/Swiper';
import DimmedModal from '@/components/Modal/DimmedModal';
import SearchModal from '@/components/Modal/SearchModal';
import { sfactiveTabAtom, suactiveTabAtom } from '@/stores/tap';
import { useAtomValue } from 'jotai';
import { Pagination } from '@mui/material';

import { useGetSeniorListQuery } from '@/hooks/query/useGetSeniorListQuery';
import { SeniorListPerPageCount } from '../SeniorProfile/constant';
import LogoLayer from '@/components/LogoLayer/LogoLayer';
import Footer from '@/components/Footer';

import useTutorial from '@/hooks/useTutorial';
import { overlay } from 'overlay-kit';

export function SeniorList() {
  const { setCurrentPath } = usePrevPath();
  const { isTutorialFinish } = useTutorial();

  const field = useAtomValue(sfactiveTabAtom);
  const postgradu = useAtomValue(suactiveTabAtom);

  const [currentSeniorListPage, setCurrentSeniorListPage] = useQueryState(
    'page',
    parseAsInteger
      .withOptions({ shallow: false, clearOnDefault: true })
      .withDefault(1),
  );

  useEffect(() => {
    setCurrentPath();
  }, []);

  useEffect(() => {
    setCurrentSeniorListPage(1);
  }, [field, postgradu]);

  const { data: seniorListData } = useGetSeniorListQuery(
    field,
    postgradu,
    currentSeniorListPage,
  );

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <HomeLayer>
        <LogoLayer
          modalHandler={() => {
            overlay.open(({ unmount }) => {
              return <SearchModal modalHandler={() => unmount()} />;
            });
          }}
        />
        <HomeBannerLayer>
          <SwiperComponent />
        </HomeBannerLayer>
        <DropdownProvider>
          <HomeFieldLayer>
            <FieldTapBar />
          </HomeFieldLayer>
          <HomeUnivLayer>
            <UnivTapBar />
          </HomeUnivLayer>
        </DropdownProvider>
        <HomeProfileLayer>
          {seniorListData?.seniorSearchResponses?.length ? (
            seniorListData?.seniorSearchResponses?.map((el, idx) => (
              <div key={el.seniorId}>
                <SeniorProfile data={el} />
              </div>
            ))
          ) : (
            <div
              style={{
                minHeight: '22rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              해당하는 선배가 없어요
            </div>
          )}

          <SeniorListPagination
            totalPage={seniorListData?.totalElements ?? 0}
          />
        </HomeProfileLayer>
        <Footer />
        <MenuBarWrapper>
          <MenuBar
            modalHandler={() => {
              overlay.open(({ unmount }) => {
                return (
                  <DimmedModal
                    modalType="notuser"
                    modalHandler={() => unmount()}
                  />
                );
              });
            }}
          />
        </MenuBarWrapper>
      </HomeLayer>
    </Suspense>
  );
}

const HomeLayer = styled.div`
  width: inherit;
  height: inherit;
  padding-bottom: 3.5rem;
`;

const HomeBannerLayer = styled.div`
  height: 6.7rem;
  padding: 0 1rem;
`;
const HomeFieldLayer = styled.div`
  margin: 0 0.5rem;
  overflow-x: auto;
  white-space: nowrap;
`;
const HomeUnivLayer = styled.div`
  border-top: 1px solid #c2cede;
  overflow-x: auto;
  white-space: nowrap;
`;
const HomeProfileLayer = styled.div`
  min-height: 22rem;
  height: inherit;
  padding-bottom: 1rem;
  padding-top: 1rem;
`;
const MenuBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: inherit;
  z-index: 1;
`;

const StyledPagination = styled(Pagination)`
  display: flex;
  width: 345px;
  justify-content: center;
  padding: 0;
  margin: 0 auto;
`;
