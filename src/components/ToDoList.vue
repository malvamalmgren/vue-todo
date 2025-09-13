<script setup>
import ToDoItem from './ToDoItem.vue'

const props = defineProps({
  todos: Array
})
const emit = defineEmits(['remove-todo'])
</script>

<template>
  <ul id="todo-list">
    <ToDoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @remove-todo="emit('remove-todo', todo.id)"
    />
  </ul>
</template>

<style scoped>
  
</style>
