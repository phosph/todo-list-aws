import styled from 'styled-components';
import { useGetListQuery } from '../store/Store/Store';
import { AddNewTask } from './AddNewTask';
import { TodoTask } from './TodoTask';

const ListItem = styled.li``;
const ListContainer = styled.ul`
  padding: 0;
`;

interface Props {
  className?: string;
}

export function TodoListRaw({ className }: Props) {
  const { data: list } = useGetListQuery();

  return (
    <section className={className}>
      <h1>TodoList</h1>
      <ListContainer>
        {list?.map((task) => (
          <ListItem key={task.id}>
            <TodoTask task={task}></TodoTask>
          </ListItem>
        ))}
      </ListContainer>
      <AddNewTask />
    </section>
  );
}

export const TodoList = styled(TodoListRaw)`
  & {
    max-width: 900px;
    margin: 0 auto;
  }

  ${ListContainer} {
    list-style: none;

    ${ListItem} {
      &:not(:first-child) {
        margin-top: 16px;
      }
    }
  }
`;
