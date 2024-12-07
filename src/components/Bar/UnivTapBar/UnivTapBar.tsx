'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { TapStyle, TabBackdrop, TabHeader } from './UnivTapBar.styled';
import { smtapType } from '@/types/tap/tap';
import { suactiveTabAtom, sfactiveTabAtom } from '@/stores/tap';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Dropdown } from '@/components/comon/DropDown/common';
import { SMTAB } from '@/constants/tab/ctap';
import { pageNumAtom } from '@/stores/home';
import { useDropdownContext } from '@/components/comon/DropDown/common/useDropdown';
import { DropdownItem } from '@/components/comon/DropDown/common/DropdownItem';

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
    <Dropdown.Container>
      {!dropdownContext.isOpen ? (
        <div
          style={{
            width: '350px',
            position: 'relative',
            display: 'flex',
            margin: '0 auto',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              maxWidth: '325px',
              overflowX: 'scroll',
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
          </div>
          <Dropdown.Header>
            <Dropdown.Trigger
              shape="circle"
              $position="absolute"
              $right={0}
              $top={0}
            >
              <Image
                width={28}
                style={{
                  cursor: 'pointer',
                }}
                height={28}
                src="/arrow-down.svg"
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
                  : fuActiveTab === 'others'
                  ? '다른학교'
                  : fuActiveTab}
              </span>
            </TabHeader>

            <Dropdown.Trigger
              shape="circle"
              $position="absolute"
              $right={'0.28rem'}
              $top={'0.78rem'}
            >
              <Image
                width={28}
                height={28}
                style={{
                  cursor: 'pointer',
                }}
                src="/arrow-up.png"
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
  );
}

export default UnivTapBar;
