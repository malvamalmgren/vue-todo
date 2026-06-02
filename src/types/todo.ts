export type Priority = "low" | "medium" | "high";

export type Todo = {
  id: number;
  text: string;
  priority: Priority;
};

export type NewTodo = Omit<Todo, "id">;

export type SortKey = "id" | "text" | "priority";

export const priorityOptions: Array<{ value: Priority; label: string }> = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];
