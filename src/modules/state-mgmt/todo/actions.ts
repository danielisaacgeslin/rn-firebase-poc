import { GeneralModel, TodoModel } from '../../models';

export enum ActionType {
  SET_LIST_START = '[todo] set list start',
  SET_LIST_SUCCESS = '[todo] set list success',
  CREATE_TODO_START = '[todo] create todo start',
  CREATE_TODO_SUCCESS = '[todo] create todo success'
}

export const actions = {
  setListStart: (query: GeneralModel.IApiQuery) => ({ type: ActionType.SET_LIST_START, payload: { query } }),
  setListSuccess: (todoList: TodoModel.ITodo[]) => ({ type: ActionType.SET_LIST_SUCCESS, payload: { todoList } }),
  createStart: (todo: TodoModel.ITodo) => ({ type: ActionType.CREATE_TODO_START, payload: { todo } }),
  createSuccess: () => ({ type: ActionType.CREATE_TODO_SUCCESS, payload: {} })
};
