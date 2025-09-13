<script setup>
import { ref } from 'vue';

const emit = defineEmits(['add-todo'])
const text = ref('')
const priority = ref("")

function submitTodo() {
    if (text.value.trim() !== '') {
        emit('add-todo', { text: text.value, priority: priority.value })
        text.value = ''
        priority.value = ""
        console.log('Submitted:', text.value);
    }
}

const setPriority = (level) => {
  priority.value = level
}
</script>

<template>
    <form id="todo-form" @submit.prevent="submitTodo">
        <input id="todo-input" v-model="text" placeholder="Add task...">
         <!-- Radio buttons -->
    <div class="priority-buttons">
      <button
        id="priority-low"
        type="button"
        @click="setPriority('low')"
        :class="{ active: priority === 'low' }"
      >
        Low
      </button>
      <button
        id="priority-medium"
        type="button"
        @click="setPriority('medium')"
        :class="{ active: priority === 'medium' }"
      >
        Medium
      </button>
      <button
        id="priority-high"
        type="button"
        @click="setPriority('high')"
        :class="{ active: priority === 'high' }"
      >
        High
      </button>
    </div>
        <button id="add-todo-button" type="submit">Add</button>
    </form>
</template>

<style scoped>
    #todo-input {
        gap: 8px;
        padding: 8px;
        border-radius: 8px;
        width: 100%;
    }
    #add-todo-button {
        background-color: #4caf50;
        border: none;
        border-radius: 6px;
        color: white;
        cursor: pointer;
        padding: 4px 8px;
    }
    #add-todo-button:hover {
        background-color: #45a049;
    }
</style>