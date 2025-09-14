<script setup>
import ToDoItem from "./ToDoItem.vue";

const props = defineProps({
  todos: Array,
});
const emit = defineEmits(["remove-todo"]);
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
