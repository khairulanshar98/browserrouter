import * as React from 'react';

export interface Todo {
  id: string
  task: string
  description: string
  isComplete: boolean
  createdAt: number
  completedAt: number
}

export interface Todos {
  records: Todo[]
  record: Todo | undefined
}
export enum ActionType {
  CREATE = 'ADD_TASK',
  COMPLETE = 'COMPLETE_TASK',
  CURRENT = 'CURRENT_TASK',
  CLEAR = 'CLEAR_TASK',
}

export interface IAction {
  type: ActionType,
  data?: Todo
}
export const initialTodos: Todos = { records: [], record: undefined };

export const reducer = (state: Todos, action: IAction): Todos => {
  //Object.freeze(state);
  const data: Todos = { ...state };
  switch (action.type) {
    case ActionType.CREATE:
      if (action.data)
        data.records.push(action.data);
      return data;
    case ActionType.COMPLETE:
      if (action.data) {
        const index = data.records.findIndex(todo => action.data && todo.id === action.data.id);
        data.records[index].isComplete = true;
        data.records[index].completedAt = new Date().getTime();
      }
      return data;
    case ActionType.CURRENT:
      data.record = action.data;
      return data;
    case ActionType.CLEAR:
      data.record = undefined;
      return data;
    default:
      throw new Error();
  }
};


export const todoContext = React.createContext<[Todos, React.Dispatch<IAction>]>([initialTodos, (() => 0)]);
export const TodoListProvider: React.FC = (props) => {
  const [todos, dispatch] = React.useReducer(reducer, initialTodos);
  return (
    <todoContext.Provider value={[todos, dispatch]}>
      {props.children}
    </todoContext.Provider>
  );
}