import React, { memo } from 'react';
import { createAppContainer, NavigationScreenProp } from 'react-navigation';
import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack';
import { TouchableOpacity, Text } from 'react-native';

import TodoListContainer from './views/TodoList';
import TodoFormContainer from './views/TodoForm';
import LoginContainer from './views/Login';

const Back = memo(({ onPress, routeName }: { onPress: (args: any) => void; routeName: string }) => (
  <TouchableOpacity onPress={() => onPress({ routeName, key: Math.random().toString() })}>
    <Text style={{ color: '#00B4EB', fontSize: 16, paddingLeft: 10 }}>Back</Text>
  </TouchableOpacity>
));

(TodoListContainer as any).navigationOptions = (nav): NavigationStackOptions => ({
  title: 'Todo List',
  headerLeft: () => <Back onPress={(...args) => nav.navigation.navigate(...args)} routeName="TodoForm" />
});
(TodoFormContainer as any).navigationOptions = (): NavigationStackOptions => ({
  title: 'CreateTodo',
  headerLeft: () => null
});

const stackNavigator = createStackNavigator(
  {
    Login: LoginContainer,
    TodoForm: TodoFormContainer,
    TodoList: TodoListContainer
  },
  { initialRouteName: 'Login', headerMode: 'float' }
);

export default createAppContainer(stackNavigator);
