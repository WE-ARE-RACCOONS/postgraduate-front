import React from 'react'
import {TapStyle} from './FieldTapBar.styled'
function FieldTapBar() {
    const [fpActiveTab, setFpActiveTab] = useAtom(activeTabAtom);
    const handleTabClick = (tabIndex: tapType) => {
        setFpActiveTab(tabIndex);
      };    

    
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TapStyle onClick={() => handleTabClick('AI')}>인공지능</TapStyle>
        <TapStyle onClick={() => handleTabClick('AO')}>
          반도체
        </TapStyle>
        <TapStyle onClick={() => handleTabClick('AP')}>바이오</TapStyle>
        <TapStyle onClick={() => handleTabClick('AQ')}>에너지</TapStyle>
        <TapStyle onClick={() => handleTabClick('ATHOR')}>다른분야</TapStyle>
      </div>
    </div>
  );
  )
}

export default FieldTapBar
