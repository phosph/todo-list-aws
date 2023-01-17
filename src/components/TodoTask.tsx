import { useRef } from 'react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Task, useUpdateTaskMutation } from '../store/Store/Store';
import { CheckBox } from './CheckBox';
import autosize from 'autosize';

interface Props {
  task: Task;
  className?: string;
}

export const Input = styled.textarea`
  border: none;
  width: 200%;
  resize: none;
  font-family: inherit;

  &[readOnly] {
    pointer-events: none;
  }
`;

export function TodoTaskRaw({ task, className }: Props) {
  const [updateItem, { isLoading }] = useUpdateTaskMutation();

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const onCheck = () => {
    const itemUpdated: Parameters<typeof updateItem>[0] = {
      ...task,
      status: !task.status,
    };

    updateItem(itemUpdated);
  };

  const [value, setValue] = useState(task.content);

  const onChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  }, []);

  useEffect(() => {
    const _val = value.trim();
    if (task.content === _val) return;

    const timeout = setTimeout(() => {
      const itemUpdated: Parameters<typeof updateItem>[0] = {
        ...task,
        content: _val,
      };
      updateItem(itemUpdated);
    }, 600);
    return () => clearTimeout(timeout);
  }, [task, updateItem, value]);

  useEffect(() => {
    if (inputRef.current) autosize(inputRef.current);
  }, [value]);

  return (
    <article
      className={className}
      data-status={task.status ? 'completed' : 'incompleted'}
    >
      <Input
        onChange={onChange}
        disabled={isLoading}
        ref={inputRef}
        value={value}
        rows={1}
        readOnly={task.status}
      />
      <CheckBox checked={task.status} onCheck={onCheck} />
    </article>
  );
}

export const TodoTask = styled(TodoTaskRaw)`
  & {
    border: 1px solid #0004;
    border-radius: 8px;
    padding: 8px 16px;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
  }

  &[data-status='completed'] {
    text-decoration: line-through;
    opacity: 0.4;
  }

  &[data-status='incompleted'] {
  }

  p {
    margin: 0;
  }

  ${CheckBox} {
    flex-shrink: 0;
  }
`;
