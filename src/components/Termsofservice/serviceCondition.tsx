import Checkbox from '@/checkbox/checkbox';
import React from 'react';
import styled from 'styled-components';

function ServiceCondition({
  onServiceChange,
}: {
  onServiceChange: (service: boolean) => void;
}) {
  const [service, setService] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);
  const [allAgreed, setAllAgreed] = React.useState(false);

  const handleAllAgreedChange = () => {
    const newValue = !allAgreed;
    setAllAgreed(newValue);
    setService(newValue);
    setMarketing(newValue);
    // onServiceChange(service);
  };

  React.useEffect(() => {
    setAllAgreed(service && marketing);
    onServiceChange(service);
  }, [service, marketing]);

  return (
    <Box>
      <Checkbox checked={allAgreed} onChange={handleAllAgreedChange} />
      전체동의
      <Container>
        <Checkbox checked={service} onChange={setService} />
        (필수)이용약관과 개인정보 취급 방침에 동의합니다.
        <Show>보기</Show>
      </Container>
      <Container>
        <Checkbox checked={marketing} onChange={setMarketing} />
        (선택)마케팅 동의.
        <Show>보기</Show>
      </Container>
    </Box>
  );
}
const Container = styled.div`
  display: flex;
  border: 1px solid blue;
  background-color: #bdc3c7;
  justify-content: space-between;
`;
const Show = styled.div`
  border: 1px solid black;
  text-decoration-line: underline;
  padding: 1rem;
`;
const Box = styled.div`
  border: 1px solid red;
`;
export default ServiceCondition;
