import React from 'react';
import { render, RenderAPI } from 'react-native-testing-library';

import TodoList, { ITodoListProps } from './TodoList';
import { ENV } from '../../../constants';
import { getUser_1 } from '../../../test/entities';
import { TodoModel } from '../../models';

describe('TodoList', () => {
  let props: ITodoListProps;
  let wrapper: RenderAPI;

  beforeEach(() => {
    props = {
      currentUser: getUser_1(),
      todoMap: {
        '1': { _id: '1', title: '1', description: '1', status: TodoModel.Status.PENDING },
        '3': { _id: '3', title: '3', description: '3', status: TodoModel.Status.PENDING }
      },
      fetchTodoList: jest.fn()
    };
    wrapper = render(<TodoList {...props} />);
  });

  it('should render', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
    expect(props.fetchTodoList).toBeCalledWith({ page: 1, limit: ENV.PAGINATION.LIMIT, q: {} });
  });
});
