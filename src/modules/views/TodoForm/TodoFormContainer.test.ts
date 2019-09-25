import { mapStateToProps, mapDispatchToProps } from './TodoFormContainer';
import { getState } from '../../../test/entities';
import { TodoModel } from '../../models';
import { todoState } from '../../state-mgmt/todo';

describe('TodoFormContainer', () => {
  it('should mapStateToProps, ', () => {
    const state = getState();
    expect(mapStateToProps(state)).toEqual({});
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      createTodo: expect.any(Function)
    });
  });

  it('should dispatch createTodo action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.createTodo({ title: 'a', description: 'b', status: TodoModel.Status.PENDING });
    expect(dispatch).toBeCalledWith(todoState.actions.createStart({ title: 'a', description: 'b', status: TodoModel.Status.PENDING }));
  });
});
