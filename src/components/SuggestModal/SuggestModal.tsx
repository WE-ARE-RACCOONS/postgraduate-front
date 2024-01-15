import React from 'react'
import Image from 'next/image'
import x_icon from '../../../public/x_gray.png'
import Router from 'next/navigation'
import useModal from '@/hooks/useModal'
import { createPortal } from 'react-dom'
import {SMFontGray,
} from './SuggestModal.styled'
import NextBtn from '../Button/NextBtn'
import FullModal from '../Modal/FullModal'
import { useRouter } from 'next/router'
interface SuggestModalProps {
    modalHandler: () => void;
    infoHandler?: () => void;
  }
function SuggestModal(props:SuggestModalProps) {
    const seniorAuth =()=>{
        // router.push(`/signup/${socialId}/common-info/auth`)
    }
   const ProfileinfoHandler=()=>{
    if(props.infoHandler){
        props.infoHandler();
    }
    props.modalHandler();
   }
  return (
    <div>
      <Image id="x-icon" src={x_icon} alt="X 버튼" onClick={props.modalHandler} width={21} height={21} style={{marginLeft:'19rem',marginTop:'1rem'}}/>
      <div style={{textAlign:'center',marginTop:'0.25rem'}}>
      <h3>멘토링 진행을 위해서<br/>
        아래 추가 작업이 필요해요!</h3>
        <SMFontGray>
        <div style={{display:'flex'}}>
        1. ‘대학원 인증’하고, <div id ='color'>승인완료</div> 받기
        </div>
        <div style={{display:'flex'}}>
        2. ‘내 프로필' 완성하고, <div id ='color'>작성완료</div> 받기
        </div>
        </SMFontGray>
        <NextBtn  btnText='대학원 인증하기'kind='route' onClick={seniorAuth}/>
        <div style={{marginBottom:'1rem',marginTop:'0.75rem'}}>
        <NextBtn  btnText='내프로필 작성하기'kind='route' onClick={ProfileinfoHandler}/>
        </div>
      </div>
    </div>
    
  )
}

export default SuggestModal
