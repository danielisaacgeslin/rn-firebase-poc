import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TodoListContainer from './views/TodoList';
import TodoFormContainer from './views/TodoForm';
import LoginContainer from './views/Login';

(TodoListContainer as any).navigationOptions = { title: 'Todo List' };

const stackNavigator = createStackNavigator(
  {
    Login: LoginContainer,
    TodoForm: TodoFormContainer,
    TodoList: TodoListContainer,
  },
  { initialRouteName: 'Login', headerMode: 'float' }
);

export default createAppContainer(stackNavigator);
