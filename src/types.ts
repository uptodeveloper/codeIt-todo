export interface TodoData {
  id: number;
  name: string;
  isCompleted: boolean;
}

export interface TodoItemProps extends TodoData {
  onToggle: (id: number, isCompleted: boolean) => void;
}
