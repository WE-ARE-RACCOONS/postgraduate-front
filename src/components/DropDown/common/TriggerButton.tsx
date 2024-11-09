import styled from 'styled-components';
import { ComponentPropsWithRef, CSSProperties, forwardRef } from 'react';

interface TriggerButtonProps extends ComponentPropsWithRef<'button'> {
  w?: CSSProperties['width'];
  h?: CSSProperties['height'];
  display?: CSSProperties['display'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  gap?: CSSProperties['gap'];
  m?: CSSProperties['margin'];
  p?: CSSProperties['padding'];
  position?: CSSProperties['position'];
  left?: CSSProperties['left'];
  right?: CSSProperties['right'];
  top?: CSSProperties['top'];
  bottom?: CSSProperties['bottom'];
  shape?: 'circle' | 'square';
  isOpen?: boolean;
  border?: CSSProperties['border'];
  color?: CSSProperties['color'];
  bg?: CSSProperties['background'];
}

export const TriggerButton = forwardRef<HTMLButtonElement, TriggerButtonProps>(
  (props, ref) => {
    const { isOpen } = props;
    return (
      <TriggerButtonStyle
        ref={ref}
        {...props}
        aria-label="메뉴"
        aria-expanded={isOpen ? 'true' : 'false'}
        style={{
          outline: 'none',
          appearance: 'none',
        }}
      >
        {props.children}
      </TriggerButtonStyle>
    );
  },
);

const TriggerButtonStyle = styled.button<TriggerButtonProps>`
  width: ${({ w }) => w || 'auto'};
  height: ${({ h }) => h || 'auto'};
  border: ${({ border }) => border || '1px solid #DFE2E4'};
  display: ${({ display }) => display || 'inline-flex'};
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  align-items: ${({ alignItems }) => alignItems || 'center'};
  margin: ${({ m }) => m || '0'};
  padding: ${({ p }) => p || '0'};
  position: ${({ position }) => position || 'static'};
  left: ${({ left }) => left || 'auto'};
  right: ${({ right }) => right || 'auto'};
  top: ${({ top }) => top || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
  gap: ${({ gap }) => gap || '0'};
  border-radius: ${({ shape }) => (shape === 'circle' ? '50%' : '0')};
  background: ${({ bg }) => bg || 'transparent'};
  color: ${({ color }) => color || 'inherit'};
  cursor: pointer;
`;
