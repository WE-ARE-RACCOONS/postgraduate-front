import { TypeBtnProps } from '@/types/button/typeBtn';
import { TypeBtnIcon,TypeBtnIconBox,TypeBtnFont } from './TypeBtn.styled';
import { useAtom } from 'jotai';
import { userTypeAtom } from '@/stores/signup';

function TypeBtn(props: TypeBtnProps) {
  const [userType, setUserType] = useAtom(userTypeAtom);

  const handleClick = () => {
    setUserType(props.userType);
  };

  return (
    <TypeBtnIconBox $choice={userType == props.userType ? true : false}
    onClick={handleClick} >
      <TypeBtnIcon>
        <img src={props.iconSrc} alt={props.iconAlt} style={{width:'8rem',height:'8rem'}}/>
      </TypeBtnIcon>
      <TypeBtnFont>
        {props.typeDesc}
        <div style={{display:'flex'}}>
        <div id = 'tb-color'>
        {props.typeDescColor}
        </div>
        {props.typeDescS}
        </div>
      </TypeBtnFont>
    </TypeBtnIconBox>
  );
}

export default TypeBtn;
