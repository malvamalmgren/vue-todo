<script setup lang="ts">
import ToDoItem from "./ToDoItem.vue";

type Priority = "low" | "medium" | "high";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};

defineProps<{
  todos: Todo[];
}>();

const emit = defineEmits<{
  "remove-todo": [id: number];
}>();
</script>

<template>
  <ul>
    <ToDoItem
      v-for="todo in todos"
      v-bind:key="todo.id"
      v-bind:todo="todo"
      v-on:remove-todo="emit('remove-todo', todo.id)"
    />
  </ul>
</template>

<style scoped></style>
