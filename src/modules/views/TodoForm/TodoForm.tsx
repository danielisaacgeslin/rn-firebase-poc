import React, { useState, memo, useCallback, useMemo } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigationEvents, useNavigation } from 'react-navigation-hooks';

import { ENV, STYLE } from '../../../constants';
import { TodoModel } from '../../models';
import styles from './styles';

export interface ITodoFormProps {
  createTodo: (todo: TodoModel.ITodo) => void;
}

export interface ITodoFormState {
  title: string;
  description: string;
}

const TodoForm = ({ createTodo }: ITodoFormProps) => {
  const [state, setState] = useState<ITodoFormState>({ title: '', description: '' });
  const { navigate } = useNavigation();

  const isDisabled = useMemo(() => !state.title, [state.title]);
  const onChangetitle = useCallback((title: string) => setState({ ...state, title }), [state, setState]);
  const onChangedescription = useCallback((description: string) => setState({ ...state, description }), [state, setState]);
  const onCreate = useCallback(() => createTodo({ title: state.title, description: state.description, status: TodoModel.Status.PENDING }), [createTodo, state]);
  const goToList = useCallback(() => navigate('TodoList'), [state, setState]);

  useNavigationEvents(event => {
    if (event.type === 'willFocus') setState({ ...state, title: '', description: '' });
  });

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardContainer} keyboardVerticalOffset={ENV.KEYBOARD_VERTICAL_OFFSET}>
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.heading1}>Create a Todo</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>title</Text>
              <TextInput
                placeholder="Enter your title..."
                placeholderTextColor={STYLE.COLOR.OCTANARY}
                style={styles.input}
                underlineColorAndroid="rgba(0, 0, 0, 0)"
                value={state.title}
                onChangeText={onChangetitle}
                testID="title-input"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>description</Text>
              <TextInput
                placeholder="Enter your description..."
                placeholderTextColor={STYLE.COLOR.OCTANARY}
                style={styles.input}
                underlineColorAndroid="rgba(0, 0, 0, 0)"
                value={state.description}
                onChangeText={onChangedescription}
                testID="description-input"
              />
            </View>
          </View>
          <View>
            <Button disabled={isDisabled} onPress={onCreate} title="Create Todo" testID="create-button" />
            <Button onPress={goToList} title="Go to List" type="clear" testID="go-to-list-button" buttonStyle={{ marginTop: 15 }} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default memo(TodoForm);
