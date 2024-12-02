'use client';

import MenuBar from '@/components/Bar/MenuBar';
import { Suspense, useEffect, useState } from 'react';
import usePrevPath from '@/hooks/usePrevPath';
import styled from 'styled-components';
import SeniorProfile from '@/components/SeniorProfile/SeniorProfile';
import FieldTapBar from '@/components/Bar/FieldTapBar/FieldTapBar';
import { useSeniorListPageSearchParams } from '@/hooks/search-params/useSeniorListSearchParams';

import { DropdownProvider } from '../DropDown/common/useDropdown';
import UnivTapBar from '@/components/Bar/UnivTapBar/UnivTapBar';
import { SeniorListPagination } from '../Pagination/SeniorListPagination';
import SwiperComponent from '@/components/Swiper/Swiper';
import DimmedModal from '@/components/Modal/DimmedModal';
import SearchModal from '@/components/Modal/SearchModal';
import { sfactiveTabAtom, suactiveTabAtom } from '@/stores/tap';
import { useAtomValue } from 'jotai';

import { useGetSeniorListQuery } from '@/hooks/query/useGetSeniorListQuery';

import LogoLayer from '@/components/LogoLayer/LogoLayer';
import Footer from '@/components/Footer';

import useTutorial from '@/hooks/useTutorial';
import { overlay } from 'overlay-kit';
import { SeniorListPerPageCount } from '../SeniorProfile/constant';

export function SeniorList() {
  const { setCurrentPath } = usePrevPath();
  const { isTutorialFinish } = useTutorial();

  const field = useAtomValue(sfactiveTabAtom);
  const postgradu = useAtomValue(suactiveTabAtom);

  const { page, setPage } = useSeniorListPageSearchParams();
  useEffect(() => {
    setCurrentPath();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [field, postgradu]);

  const { data: seniorListData } = useGetSeniorListQuery(
    field,
    postgradu,
    page,
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
            totalPage={
              seniorListData?.totalElements ?? 0 / SeniorListPerPageCount
            }
            displayPage={5}
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
