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

export type ActionState = {
  status: boolean;
  error: string;
} | null;

type AddAction = { type: "ADD"; payload: TodoData };
type ToggleAction = {
  type: "TOGGLE";
  payload: { id: number; isCompleted: boolean };
};

export type OptimisticAction = AddAction | ToggleAction;
