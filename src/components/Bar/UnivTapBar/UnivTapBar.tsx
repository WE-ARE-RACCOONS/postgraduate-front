'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import {
  TapStyle,
  TabContainer,
  TabBackdrop,
  TabHeader,
} from './UnivTapBar.styled';
import { smtapType } from '@/types/tap/tap';
import { suactiveTabAtom, sfactiveTabAtom } from '@/stores/tap';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Dropdown } from '@/components/DropDown/common';
import { SMTAB } from '@/constants/tab/ctap';
import { pageNumAtom } from '@/stores/home';
import { useDropdownContext } from '@/components/DropDown/common/useDropdown';
import { DropdownItem } from '@/components/DropDown/common/DropdownItem';

function UnivTapBar() {
  const factiveTab = useAtomValue(sfactiveTabAtom);
  const [fuActiveTab, setFuActiveTab] = useAtom(suactiveTabAtom);
  const setPageNum = useSetAtom(pageNumAtom);
  const dropdownContext = useDropdownContext();

  const handleTabClick = (tabIndex: smtapType) => {
    setFuActiveTab(tabIndex);
    setPageNum(1);
  };

  return (
    <TabContainer>
      <Dropdown.Container>
        {!dropdownContext.isOpen ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              overflowX: 'hidden',
              padding: '1rem',
            }}
          >
            <TapStyle
              selected={fuActiveTab === SMTAB.ALL}
              onClick={() => handleTabClick(SMTAB.ALL)}
              className="tutorial_school"
            >
              전체학교
            </TapStyle>
            <TapStyle
              selected={fuActiveTab === SMTAB.SEO}
              onClick={() => handleTabClick(SMTAB.SEO)}
            >
              서울대
            </TapStyle>
            <TapStyle
              selected={fuActiveTab === SMTAB.YEO}
              onClick={() => handleTabClick(SMTAB.YEO)}
            >
              연세대
            </TapStyle>
            <TapStyle
              selected={fuActiveTab === SMTAB.KO}
              onClick={() => handleTabClick(SMTAB.KO)}
            >
              고려대
            </TapStyle>
            <TapStyle
              selected={fuActiveTab === SMTAB.KY}
              onClick={() => handleTabClick(SMTAB.KY)}
            >
              카이스트
            </TapStyle>
            <TapStyle
              selected={fuActiveTab === SMTAB.OT}
              onClick={() => handleTabClick(SMTAB.OT)}
            >
              다른학교
            </TapStyle>
            <Dropdown.Header>
              <Dropdown.Trigger
                shape="circle"
                position="absolute"
                right={'-0.02rem'}
              >
                <Image
                  width={28}
                  height={28}
                  src="/arrow-down.png"
                  alt="학교 선택 메뉴 버튼"
                />
              </Dropdown.Trigger>
            </Dropdown.Header>
          </div>
        ) : (
          <TabBackdrop>
            <div ref={dropdownContext.dropdownRef}>
              <TabHeader>
                <span style={{ color: '#98999a' }}>
                  {factiveTab === 'all'
                    ? '전체분야'
                    : factiveTab === 'others'
                    ? '다른분야'
                    : factiveTab}
                </span>
                <Image
                  src="/arrow-right.png"
                  alt="오른쪽 버튼"
                  width={20}
                  height={20}
                />
                <span>
                  {fuActiveTab === 'all'
                    ? '전체학교'
                    : factiveTab === 'others'
                    ? '다른학교'
                    : fuActiveTab}
                </span>
              </TabHeader>

              <Dropdown.Trigger
                shape="circle"
                position="absolute"
                right={'0.28rem'}
                top={'0.78rem'}
              >
                <Image
                  width={28}
                  height={28}
                  src="/arrow-down.png"
                  alt="학교 선택 메뉴 버튼"
                />
              </Dropdown.Trigger>
              <Dropdown.List>
                <DropdownItem
                  isActive={fuActiveTab === SMTAB.ALL}
                  onClick={() => handleTabClick(SMTAB.ALL)}
                  className="tutorial_school"
                >
                  전체학교
                </DropdownItem>
                <DropdownItem
                  isActive={fuActiveTab === SMTAB.SEO}
                  onClick={() => handleTabClick(SMTAB.SEO)}
                >
                  서울대
                </DropdownItem>
                <DropdownItem
                  isActive={fuActiveTab === SMTAB.YEO}
                  onClick={() => handleTabClick(SMTAB.YEO)}
                >
                  연세대
                </DropdownItem>
                <DropdownItem
                  isActive={fuActiveTab === SMTAB.KO}
                  onClick={() => handleTabClick(SMTAB.KO)}
                >
                  고려대
                </DropdownItem>
                <DropdownItem
                  isActive={fuActiveTab === SMTAB.KY}
                  onClick={() => handleTabClick(SMTAB.KY)}
                >
                  카이스트
                </DropdownItem>
                <DropdownItem
                  isActive={fuActiveTab === SMTAB.OT}
                  onClick={() => handleTabClick(SMTAB.OT)}
                >
                  다른학교
                </DropdownItem>
              </Dropdown.List>
            </div>
          </TabBackdrop>
        )}
      </Dropdown.Container>
    </TabContainer>
  );
}

export default UnivTapBar;
