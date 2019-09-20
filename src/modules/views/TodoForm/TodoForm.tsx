import React, { useState, memo, useCallback, useMemo } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';

import { ENV, STYLE } from '../../../constants';
import styles from './styles';
import { TodoModel } from '../../models';

export interface ITodoFormProps {
  isAndroid?: boolean;
  navigation: NavigationScreenProp<any, any>;
  createTodo: (todo: TodoModel.ITodo) => void;
}

export interface ITodoFormState {
  title: string;
  description: string;
}

const TodoForm = ({ createTodo, isAndroid = ENV.PLATFORM.IS_ANDROID, navigation }: ITodoFormProps) => {
  const [state, setState] = useState<ITodoFormState>({ title: '', description: '' });

  const isDisabled = useMemo(() => !state.title, [state.title]);
  const onChangetitle = useCallback((title: string) => setState({ ...state, title }), [state, setState]);
  const onChangedescription = useCallback((description: string) => setState({ ...state, description }), [state, setState]);
  const onCreate = useCallback(() => createTodo({ title: state.title, description: state.description, status: TodoModel.Status.PENDING }), [createTodo, state]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardContainer} keyboardVerticalOffset={isAndroid ? ENV.KEYBOARD_VERTICAL_OFFSET : 0}>
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
        <Button disabled={isDisabled} onPress={onCreate} title="Create Todo" testID="create-button" />
      </KeyboardAvoidingView>
    </View>
  );
};

export default memo(TodoForm);
