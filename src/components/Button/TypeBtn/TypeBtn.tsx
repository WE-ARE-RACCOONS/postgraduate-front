import { TypeBtnProps } from '@/types/button/typeBtn';
import { TypeBtnIcon } from './TypeBtn.styled';
import { useAtom } from 'jotai';
import { userTypeAtom } from '@/stores/signup';

function TypeBtn(props: TypeBtnProps) {
  const [userType, setUserType] = useAtom(userTypeAtom);

  const handleClick = () => {
    setUserType(props.userType);
  };

  return (
    <div>
      <TypeBtnIcon
        $choice={userType == props.userType ? true : false}
        onClick={handleClick}
      >
        {props.iconText}
      </TypeBtnIcon>
      <div>
        {props.typeDesc.split('\n').map((txt, idx) => (
          <div key={idx}>
            {txt}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TypeBtn;
