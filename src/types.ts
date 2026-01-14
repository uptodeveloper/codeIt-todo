export interface TodoData {
  id: number;
  name: string;
  isCompleted: boolean;
  memo?: string | null;
  imageUrl?: string | null;
}

export interface TodoItemProps extends TodoData {
  onToggle: (id: number, isCompleted: boolean) => void;
}
