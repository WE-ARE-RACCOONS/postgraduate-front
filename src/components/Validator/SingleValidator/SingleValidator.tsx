import { SingleValidatorContainer } from "./SingleValidator.styled";

function SingleValidator({ msg } : { msg: string }) {
  return (
    <SingleValidatorContainer>{msg}</SingleValidatorContainer>
  )
}

export default SingleValidator;