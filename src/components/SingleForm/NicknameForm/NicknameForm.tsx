function NicknameForm() {
  return(
    <div>
      <input type="text" name="user-nickname" id="user-nickname" placeholder="닉네임을 입력해주세요." />
      <button>중복확인</button>
    </div>
  )
}

export default NicknameForm;