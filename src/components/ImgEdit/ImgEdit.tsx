'use client';
import React,{useState} from 'react'
import { useRef } from 'react';
import{
  ProfileEditImgBox,

} from './ImgEdit.styled'
function ImgEdit() {
  const [imageUrl, setImageUrl] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const handleImage = async (e: any) => {
    // 내가 받을 파일은 하나기 때문에 index 0값의 이미지를 가짐
	const file = e.target.files[0]
    if(!file) return
    
    // 이미지 화면에 띄우기
    const reader = new FileReader()
    // 파일을 불러오는 메서드, 종료되는 시점에 readyState는 Done(2)이 되고 onLoad 시작
    reader.readAsDataURL(file)
    read.onLoad = (e: any) => {
    	if(reader.readyState === 2) {
        	// 파일 onLoad가 성공하면 2, 진행 중은 1, 실패는 0 반환
          setImageUrl(e.target.result)
        }
    }
  


  return (
    <div>
      <ProfileEditImgBox onClick={() => fileInput.current.click() } >
      <input
        type="file"
        name="cardImg"
        id="card-img--input"
        ref={fileInput}>
      </input>
      </ProfileEditImgBox>
    </div>
  )
}

export default ImgEdit
