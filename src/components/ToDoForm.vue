<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["add-todo"]);

const text = ref("");
const priority = ref("");

const charsLeft = computed(() => 50 - text.value.length);
const tooLong = computed(() => text.value.length >= 50);

function submitTodo() {
  if (text.value.trim() !== "" && priority.value !== "") {
    emit("add-todo", {
      text: text.value,
      priority: priority.value,
    });
    text.value = "";
    priority.value = "";
  }
}
</script>

<template>
  <form id="todo-form" v-on:submit.prevent="submitTodo">
    <span id="input-and-counter">
      <textarea
        id="todo-input"
        v-model="text"
        maxlength="50"
        placeholder="Add task..."
        rows="2"
        style="resize: vertical"
      ></textarea>
      <p v-if="tooLong" class="warning">⚠️ Max 50 characters reached!</p>
      <p v-else class="counter">{{ charsLeft }} characters left</p>
    </span>
    <select id="priority" v-model="priority">
      <option disabled value="">-- Select priority --</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <button id="add-todo-button" type="submit">Add</button>
  </form>
</template>

<style scoped>
#todo-form {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "input input"
    "priority add-todo-button";
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
}

#input-and-counter {
  grid-area: input;
  display: flex;
  flex-direction: column;
}

#todo-input {
  padding: 8px;
  border-radius: 8px;
  width: 50ch;
  margin-bottom: 4px;
  font-family: monospace;
  box-sizing: border-box;
}

.warning {
  color: red;
  font-size: 0.9rem;
  margin: 0 0 8px;
  height: 1.5rem;
}

.counter {
  font-size: 0.8rem;
  color: #666;
  margin: 0 0 8px;
  height: 1.5rem;
}

#priority {
  grid-area: priority;
  display: inline-flex;
  margin: 8px 0;
  padding: 6px;
  border-radius: 6px;
}

#add-todo-button {
  grid-area: add-todo-button;
  display: inline-flex;
  margin: auto;
  background-color: #4caf50;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  padding: 6px 12px;
}

#add-todo-button:hover {
  background-color: #45a049;
}

@media screen and (max-width: 600px) {
  #todo-form {
    grid-template-columns: 1fr;
    grid-template-areas:
      "input"
      "priority"
      "add-todo-button";
    gap: 8px;
  }

  #todo-input {
    width: 30ch;
  }

  #add-todo-button {
    padding: 12px 18px;
  }
}
</style>
