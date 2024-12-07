import styled from 'styled-components';
import {
  WISH_SENIOR_MENTOR_MSG,
  WISH_SENIOR_PROVIDER_FIELD_LIST,
  WISH_SENIOR_FIELD_ETC,
} from '../../constant';
import { WishSeniorSubTitle, WishSeniorTitle, NextBtnBox } from '../(template)';
import { parseAsJson, useQueryState } from 'nuqs';
import NextBtn from '@/components/comon/Button/NextBtn';
import * as y from 'yup';

const schema = y.object({
  type: y.string(),
  value: y.string(),
});

export function WishSeniorField({
  onClick,
}: {
  onClick: (field: string) => void;
}) {
  const [field, setField] = useQueryState(
    'field',
    parseAsJson(schema.validateSync),
  );

  const handleFieldChange = (type: string, value: string) => {
    setField({ type, value });
  };

  return (
    <Container>
      <WishSeniorTitle>{WISH_SENIOR_MENTOR_MSG.FIELD.TITLE}</WishSeniorTitle>
      <br />
      <WishSeniorSubTitle>
        {WISH_SENIOR_MENTOR_MSG.FIELD.SUB_TITLE}
      </WishSeniorSubTitle>

      <WishSeniorFieldList>
        {WISH_SENIOR_PROVIDER_FIELD_LIST.map((option) => (
          <WishSeniorFieldRadioWrapper key={option}>
            <WishSeniorFieldRadioInput
              type="radio"
              value={option}
              name="field"
              id={option}
              checked={field?.type === option}
              onChange={() => handleFieldChange(option, '')}
              onClick={() => handleFieldChange(option, '')}
            />
            <WishSeniorFieldRadioIcon
              onClick={() => handleFieldChange(option, '')}
              $isChecked={field?.type === option}
            />
            <label htmlFor={option}>{option}</label>
          </WishSeniorFieldRadioWrapper>
        ))}
        <WishSeniorFieldRadioWrapper
          style={{
            border: field?.type === WISH_SENIOR_FIELD_ETC ? 'none' : '',
          }}
        >
          <WishSeniorFieldRadioInput
            type="radio"
            value={WISH_SENIOR_FIELD_ETC}
            name="field"
            id={'ETC'}
            checked={field?.type === WISH_SENIOR_FIELD_ETC}
            onChange={() => handleFieldChange(WISH_SENIOR_FIELD_ETC, '')}
          />

          {field?.type === WISH_SENIOR_FIELD_ETC ? (
            <EtcInput
              type="text"
              autoFocus
              value={field?.value}
              onChange={(e) =>
                handleFieldChange(WISH_SENIOR_FIELD_ETC, e.target.value)
              }
              placeholder="직접 입력"
            />
          ) : (
            <>
              <WishSeniorFieldRadioIcon
                onClick={() => handleFieldChange(WISH_SENIOR_FIELD_ETC, '')}
                $isChecked={field?.type === WISH_SENIOR_FIELD_ETC}
              />
              <label htmlFor="ETC">{WISH_SENIOR_FIELD_ETC}</label>
            </>
          )}
        </WishSeniorFieldRadioWrapper>
      </WishSeniorFieldList>

      <NextBtnBox>
        <NextBtn
          btnText="다음"
          onClick={() => {
            if (field?.type) {
              onClick(field.type);
            } else if (field?.value) {
              onClick(field.value);
            }
          }}
          kind="route"
        />
      </NextBtnBox>
    </Container>
  );
}

const Container = styled.div`
  margin: 1.6rem 1rem;
`;

const WishSeniorFieldList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  gap: 4px;
`;

const WishSeniorFieldRadioWrapper = styled.li`
  list-style-type: none;
  display: flex;
  border: 1px solid #e7e9ed;
  width: 330px;
  background-color: #fafbfb;
  margin: 4px auto;
  padding: 12px;
  gap: 12px;
  border-radius: 8px;
  position: relative;
`;

const WishSeniorFieldRadioInput = styled.input`
  position: absolute;
  visibility: hidden;
  cursor: pointer;
`;

const WishSeniorFieldRadioIcon = styled.span<{ $isChecked: boolean }>`
  height: 16px;
  width: 16px;
  border-radius: 50%;
  border: 1.2px solid
    ${({ $isChecked }) => ($isChecked ? '#2FC4B2' : '#D8DEE0')};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    display: ${({ $isChecked }) => ($isChecked ? 'block' : 'none')};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #2fc4b2;
  }
`;

const EtcInput = styled.input`
  width: 100%;
  border: 1px solid #2fc4b2;
  background: none;
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 4px;
  height: 45px;
`;
