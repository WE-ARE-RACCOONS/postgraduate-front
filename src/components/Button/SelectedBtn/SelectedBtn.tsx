import { SelectedBtnProps } from '@/types/button/selectedBtn';
import { StyledSelectedBtn } from './SelectedBtn.styled';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import selected_x from '../../../../public/selected-cancel.png';

function SelectedBtn(props: SelectedBtnProps) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (props.selected.includes(props.btnText.replace('#', '')))
      setSelected(true);
  }, []);

  const handleClick = () => {
    if (selected == true) {
      props.selectHandler(
        props.selected.filter(
          (item) => item !== props.btnText.replace('#', ''),
        ),
      );
    }

    if (selected == false) {
      props.selectHandler([...props.selected, props.btnText.replace('#', '')]);
    }

    setSelected(!selected);
  };

  return (
    <StyledSelectedBtn $selected={selected} onClick={handleClick}>
      {props.btnText}
      {selected && (
        <Image id="selected-x-btn" src={selected_x} alt="선택 취소 버튼" />
      )}
    </StyledSelectedBtn>
  );
}

export default SelectedBtn;
