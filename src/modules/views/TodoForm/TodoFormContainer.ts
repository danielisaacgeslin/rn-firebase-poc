import { connect } from 'react-redux';

import { IRootState } from '../../state-mgmt/rootState';
import TodoForm from './TodoForm';
import { TodoModel } from '../../models';
import { todoState } from '../../state-mgmt/todo';

export const mapStateToProps = (state: IRootState) => ({

});

export const mapDispatchToProps = dispatch => ({
  createTodo: (todo: TodoModel.ITodo) => dispatch(todoState.actions.createStart(todo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoForm);
