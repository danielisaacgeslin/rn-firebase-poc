import React, { Children } from 'react';
import { fireEvent, render, RenderAPI } from 'react-native-testing-library';
import { createSwitchNavigator, NavigationParams, createAppContainer } from 'react-navigation';

import TodoForm, { ITodoFormProps } from './TodoForm';
import { TodoModel } from '../../models';

const createTestNavigator = (ref: React.RefObject<any>) => ({ children, params }: { children: any; params?: NavigationParams }) => {
  const Navigator = createAppContainer(
    createSwitchNavigator({
      TestScreen: { screen: () => Children.only(children), params } as any,
      TodoList: () => <div>todo list</div> // to test navigation to this screen
    })
  );
  return <Navigator ref={ref} />;
};

describe('TodoForm', () => {
  global.console.warn = () => null;
  global.console.error = () => null;
  let props: ITodoFormProps;
  let wrapper: RenderAPI;
  let TestNavigator;
  let navRef;

  beforeEach(() => {
    navRef = React.createRef();
    TestNavigator = createTestNavigator(navRef);
    props = {
      createTodo: jest.fn()
    };

    wrapper = render(
      <TestNavigator>
        <TodoForm {...props} />
      </TestNavigator>
    );
  });

  it('should render', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should create a todo', () => {
    fireEvent.changeText(wrapper.getByTestId('title-input'), 'title');
    fireEvent.changeText(wrapper.getByTestId('description-input'), 'description');
    fireEvent.press(wrapper.getByTestId('create-button'));
    expect(props.createTodo).toBeCalledWith({ title: 'title', description: 'description', status: TodoModel.Status.PENDING });
  });

  it('should reset form on focus', () => {
    fireEvent.changeText(wrapper.getByTestId('title-input'), 'title');
    fireEvent.changeText(wrapper.getByTestId('description-input'), 'description');
    navRef.current.dispatch('TestScreen2'); // leaving screen and reentering to trigger willFocus
    navRef.current.dispatch('TestScreen'); // leaving screen and reentering to trigger willFocus
    expect(wrapper.getByTestId('title-input').props.value).toEqual('');
    expect(wrapper.getByTestId('description-input').props.value).toEqual('');
  });

  it('should go to list', () => {
    fireEvent.press(wrapper.getByTestId('go-to-list-button'));
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
