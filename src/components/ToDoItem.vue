<script setup>
import { computed } from "vue";

const props = defineProps({
  todo: Object,
});
const emit = defineEmits(["remove-todo"]);

const priorityColor = computed(() => {
  switch (props.todo.priority) {
    case "low":
      return "#c8f7c5";
    case "medium":
      return "#ffe082";
    case "high":
      return "#ff8a80";
    default:
      return "#f0f0f0";
  }
});
</script>

<template>
  <li class="todo-item" v-bind:style="{ backgroundColor: priorityColor }">
    <span class="text">{{ props.todo.text }}</span>
    <button
      class="delete-todo-button"
      v-on:click="emit('remove-todo', props.todo.id)"
    >
      ✖
    </button>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 120px;
  width: 160px;
  border-radius: 6px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.15);
  font-size: 1rem;
  font-style: italic;
  font-weight: 500;
  text-align: center;

  overflow-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
  position: relative;
}

.delete-todo-button {
  position: absolute;
  top: 6px;
  right: 6px;
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #333;
}

.delete-todo-button:hover {
  color: #000;
}
</style>
