function ConfirmBtn({ clickHandler } : { clickHandler: () => void }) {
  return(
    <button onClick={clickHandler}>확인</button>
  )
}

export default ConfirmBtn;