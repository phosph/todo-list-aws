import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useAddNewTaskMutation } from '../store/Store/Store';

const AddButton = styled.button`
  border-radius: 8px;
  border: none;
  color: white;
  padding: 8px 16px;
  width: 100%;
  font-size: 16px;
  background-color: rgb(12, 185, 12);
  cursor: pointer;

  &:hover {
    background-color: rgb(12, 145, 12);
  }
  &:active {
    background-color: rgb(12, 105, 12);
  }
`;

export function AddNewTask() {
  const [showInput, setShownInput] = useState(false);
  const [newName, setNewName] = useState('');

  const onInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setNewName(event.target.value),
    []
  );

  const toggleShowInput = useCallback(() => setShownInput((s) => !s), []);

  const [addNewItem, { isLoading }] = useAddNewTaskMutation();

  const onAddNewItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNewItem({ content: newName, status: false });
    setShownInput(false);
    setNewName('');
  };

  return showInput ? (
    <div>
      <form onSubmit={onAddNewItem}>
        <input type="text" value={newName} onChange={onInput} />
        <button type="submit">add</button>
        <button type="button" onClick={toggleShowInput}>
          cancel
        </button>
      </form>
    </div>
  ) : (
    <AddButton type="button" onClick={toggleShowInput} disabled={isLoading}>
      Add new Item
    </AddButton>
  );
}
