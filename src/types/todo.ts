export type Priority = "low" | "medium" | "high";

export type Todo = {
  id: number;
  text: string;
  priority: Priority;
  createdAt: number;
  pinned: boolean;
};

export type NewTodo = Pick<Todo, "text" | "priority">;

export type SortKey = "id" | "text" | "priority";

export const priorityOptions: Array<{ value: Priority; label: string }> = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];
