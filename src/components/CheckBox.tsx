import type { Ref } from 'react';
import { forwardRef } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  className?: string;
  checked: boolean;
  onCheck: () => unknown;
}

export const CheckBoxRaw = forwardRef(function CheckBox(
  { className, checked, onCheck }: Props,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button
      type="button"
      className={className}
      onClick={onCheck}
      ref={ref}
    ></button>
  );
});

export const CheckBox = styled(CheckBoxRaw)`
  display: inline-block;
  width: 2em;
  height: 2em;
  border: 2px solid #001a;
  border-radius: 4px;
  background: white;
  cursor: pointer;

  ${(props) =>
    props.checked
      ? css`
          & {
            position: relative;

            &::after {
              display: block;
              position: absolute;
              content: '';
              background-image: url('https://www.clipartmax.com/png/middle/172-1725454_check-mark-computer-icons-clip-art-green-checkmark-icon-png.png');
              width: 70%;
              height: 70%;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              opacity: 1;
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
            }
          }
        `
      : ''}
`;
