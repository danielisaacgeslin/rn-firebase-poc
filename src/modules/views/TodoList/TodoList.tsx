import React, { memo, useMemo, useCallback, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';

import { ENV } from '../../../constants';
import { GeneralModel, TodoModel, UserModel } from '../../models';
import { IEntityMap } from '../../../types';
import Todo from './components/Todo';
import styles from './styles';

export interface ITodoListProps {
  currentUser: UserModel.IUser;
  todoMap: IEntityMap<TodoModel.ITodo>;
  fetchTodoList: (query: GeneralModel.IApiQuery) => void;
}

const TodoList = ({ currentUser, todoMap, fetchTodoList }: ITodoListProps) => {
  const todoList = useMemo(() => Object.values(todoMap).sort((a, b) => (a._id > b._id ? -1 : 1)), [todoMap]);

  const keyExtractor = useCallback((item: TodoModel.ITodo): string => item._id, []);
  const renderTodo = useCallback(({ item }: { item: TodoModel.ITodo }) => <Todo todo={item} />, []);

  useEffect(() => {
    fetchTodoList({ page: 1, limit: ENV.PAGINATION.LIMIT, q: {} });
  }, []);

  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoBody}>
        <FlatList testID="todo-list" data={todoList} extraData={todoList} renderItem={renderTodo} keyExtractor={keyExtractor} />
      </View>
    </View>
  );
};

export default memo(TodoList);
