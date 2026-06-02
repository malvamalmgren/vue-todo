<script setup lang="ts">
import { ref, computed } from "vue";
import { ClipboardListIcon, ListFilterIcon } from "@lucide/vue";
import LoginForm from "@/components/LoginForm.vue";
import ToDoForm from "@/components/ToDoForm.vue";
import ToDoList from "@/components/ToDoList.vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { NewTodo, Priority, SortKey, Todo } from "@/types/todo";

type LoginCredentials = {
  username: string;
  password: string;
};

const todos = ref<Todo[]>([]);

function addTodo(newTodo: NewTodo): void {
  todos.value.push({
    id: Date.now(),
    text: newTodo.text,
    priority: newTodo.priority,
  });
}

function removeTodo(id: number): void {
  todos.value = todos.value.filter((todo) => todo.id !== id);
}

const loggedIn = ref(false);
const username = ref<string | null>(null);

function login({ username: nextUsername, password }: LoginCredentials): void {
  void password;
  loggedIn.value = true;
  username.value = nextUsername;
}

function logout(): void {
  loggedIn.value = false;
  username.value = null;
}

const sortBy = ref<SortKey>("id");

const todoCountLabel = computed(() => {
  const count = todos.value.length;
  return count === 1 ? "1 task" : `${count} tasks`;
});

const sortedTodos = computed<Todo[]>(() => {
  return [...todos.value].sort((a, b) => {
    if (sortBy.value === "text") {
      return a.text.localeCompare(b.text);
    } else if (sortBy.value === "priority") {
      const priorityOrder: Record<Priority, number> = {
        high: 3,
        medium: 2,
        low: 1,
      };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    } else {
      return b.id - a.id;
    }
  });
});
</script>

<template>
  <div class="min-h-screen bg-muted/35 text-foreground">
    <header class="border-b bg-background/95">
      <div class="mx-auto flex w-full max-w-6xl px-4 py-4 sm:px-6">
        <LoginForm
          v-bind:logged-in="loggedIn"
          v-bind:username="username"
          v-on:login="login"
          v-on:logout="logout"
        />
      </div>
    </header>

    <main
      v-if="loggedIn"
      class="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6"
    >
      <section
        class="rounded-xl border bg-card p-4 text-card-foreground shadow-xs sm:p-6"
      >
        <ToDoForm v-on:add-todo="addTodo" />
      </section>

      <section class="grid gap-4">
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex min-w-0 items-center gap-3">
            <div
              class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
            >
              <ClipboardListIcon class="size-4" aria-hidden="true" />
            </div>
            <div class="min-w-0">
              <h2 class="text-lg font-semibold tracking-normal">Tasks</h2>
              <p class="text-sm text-muted-foreground">{{ todoCountLabel }}</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <ListFilterIcon
              class="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <Label for="sort-select" class="text-sm">Sort by</Label>
            <Select v-model="sortBy">
              <SelectTrigger id="sort-select" class="w-36">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id">Date</SelectItem>
                <SelectItem value="text">Content</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <ToDoList v-bind:todos="sortedTodos" v-on:remove-todo="removeTodo" />
      </section>
    </main>
  </div>
</template>
