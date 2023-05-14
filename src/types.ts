export type Todolist = {
  id: string;
  title: string;
};

export type TodoItem = {
  id: string;
  todolistId: string;
  createdAt: Date;
  title: string;
  text: string;
  deadline?: string;
  completed: boolean;
};

export type FilterTodo = {
  text: string;
  status: FilterStatus;
};

export enum FilterStatus {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}
