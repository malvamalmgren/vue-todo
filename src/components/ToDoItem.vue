<script setup>
  const props = defineProps({
    todo: Object
  })
  const emit = defineEmits(['remove-todo'])
</script>

<template>
  <li :class="['todo-item', todo.priority]">
    <span class="priority"></span>
    <p class="todo-text">{{ todo.text }}</p>
    <button class="delete-todo-button" @click="emit('remove-todo', todo.id)">Delete</button>
  </li>
</template>

<style scoped>

.todo-item {
  display: grid;
  grid-template-columns: auto minmax(0, 70ch) auto;
  grid-template-areas: "priority text delete";
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  margin-bottom: 12px;
  padding: 0 12px;
}

.todo-text {
  grid-area: text;
  max-width: 70ch;
  font-size: 14px;
  overflow-wrap: break-word; 
}

.priority {
  width: 24px;
  height: 100%;
  transform: translateX(-12px);
  margin-right: 12px;
  border-radius: 12px 0 0 12px;
}

.todo-item.low .priority {
  background-color: #4aa027;
}

.todo-item.medium .priority {
  background-color: #ff9800;
}

.todo-item.high .priority {
  background-color: #f44336;
}

.delete-todo-button {
  display: flex;
  margin-left: 12px;
  background-color: #ff4d4d;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  padding: 4px 8px;
}
.delete-todo-button:hover {
  background-color: #ff1a1a;
}

@media screen and (max-width: 600px) {
  .todo-item {
    grid-template-columns: auto minmax(0, 30ch) auto;
  }
  .todo-text {  
    font-size: 12px;
  }
  .priority {
    width: 12px;
  }
}
</style>
