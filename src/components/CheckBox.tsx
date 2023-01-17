import type { Ref } from 'react';
import { forwardRef } from 'react';
import styled from 'styled-components';

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
`;
