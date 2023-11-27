import { SelectedBtnProps } from '@/types/button/selectedBtn';
import { StyledSelectedBtn } from './SelectedBtn.styled';
import { useEffect, useState } from 'react';

function SelectedBtn(props: SelectedBtnProps) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (props.selected.includes(props.btnText)) setSelected(true);
  }, []);

  const handleClick = () => {
    if (selected == true) {
      props.selectHandler(
        props.selected.filter((item) => item !== props.btnText),
      );
    }

    if (selected == false) {
      props.selectHandler([...props.selected, props.btnText]);
    }

    setSelected(!selected);
  };

  return (
    <StyledSelectedBtn $selected={selected} onClick={handleClick}>
      {props.btnText}
    </StyledSelectedBtn>
  );
}

export default SelectedBtn;
