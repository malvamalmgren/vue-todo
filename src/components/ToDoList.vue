<script setup lang="ts">
import ToDoItem from "./ToDoItem.vue";
import type { Todo } from "@/types/todo";

defineProps<{
  todos: Todo[];
}>();

const emit = defineEmits<{
  "remove-todo": [id: number];
  "toggle-pinned": [id: number];
}>();
</script>

<template>
  <div
    v-if="todos.length === 0"
    class="rounded-xl border border-dashed bg-background p-8 text-center text-sm text-muted-foreground"
  >
    No tasks yet.
  </div>

  <ul
    v-else
    class="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <ToDoItem
      v-for="todo in todos"
      v-bind:key="todo.id"
      v-bind:todo="todo"
      v-on:remove-todo="emit('remove-todo', todo.id)"
      v-on:toggle-pinned="emit('toggle-pinned', todo.id)"
    />
  </ul>
</template>
