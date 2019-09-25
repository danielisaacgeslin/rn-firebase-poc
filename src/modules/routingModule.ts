import { createAppContainer } from 'react-navigation';
import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack';

import TodoListContainer from './views/TodoList';
import TodoFormContainer from './views/TodoForm';
import LoginContainer from './views/Login';

(TodoListContainer as any).navigationOptions = (): NavigationStackOptions => ({ title: 'Todo List' });
(TodoFormContainer as any).navigationOptions = (): NavigationStackOptions => ({ title: 'CreateTodo' });

const stackNavigator = createStackNavigator(
  {
    Login: LoginContainer,
    TodoForm: TodoFormContainer,
    TodoList: TodoListContainer
  },
  { initialRouteName: 'Login', headerMode: 'float' }
);

export default createAppContainer(stackNavigator);
