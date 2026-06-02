<script setup lang="ts">
import { ref, computed } from "vue";
import ToDoList from "./components/ToDoList.vue";
import ToDoForm from "./components/ToDoForm.vue";
import LoginForm from "./components/LoginForm.vue";

type Priority = "low" | "medium" | "high";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};

type NewTodo = Omit<Todo, "id">;

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

function login({ username: nextUsername }: LoginCredentials): void {
  loggedIn.value = true;
  username.value = nextUsername;
}

function logout(): void {
  loggedIn.value = false;
  username.value = null;
}

type SortKey = "id" | "text" | "priority";

const sortBy = ref<SortKey>("id");

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
  <header>
    <LoginForm
      v-bind:logged-in="loggedIn"
      v-bind:username="username"
      v-on:login="login"
      v-on:logout="logout"
    />
  </header>
  <main v-if="loggedIn">
    <ToDoForm v-on:add-todo="addTodo" />
    <hr class="separator" />
    <div id="sort-container">
      <label id="sort" for="sort-select">Sort by:</label>
      <select id="sort-select" v-model="sortBy">
        <option value="id">Date</option>
        <option value="text">Name</option>
        <option value="priority">Priority</option>
      </select>
    </div>

    <ToDoList
      id="todo-list"
      v-bind:todos="sortedTodos"
      v-on:remove-todo="removeTodo"
    />
  </main>
</template>

<style>
body {
  margin: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #7a7a7a;
}

header {
  grid-area: header;
  display: flex;
  background-color: #fff;
  padding: 20px 40px;
}

main {
  grid-area: main;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  max-width: 65%;
}

.separator {
  width: 100%;
  border: 0;
  height: 1px;
  background: #ccc;
  margin: 24px 0;
}

#sort {
  align-items: center;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

#sort-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
}

#sort-select {
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

#todo-list {
  display: grid;
  grid-template-columns: repeat(4, max-content);
  gap: 36px;
  justify-content: center;
  justify-items: center;
  width: 100%;
}

@media screen and (min-width: 601px) and (max-width: 1424px) {
  #todo-list {
    grid-template-columns: repeat(2, max-content);
    gap: 24px;
  }
}

@media screen and (max-width: 600px) {
  body {
    font-size: 0.75rem;
  }
  header {
    display: flex;
    padding: 20px;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px auto;
    padding: 12px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    max-width: 90%;
    min-width: min-content;
  }

  #todo-list {
    display: grid;
    grid-template-columns: repeat(1, max-content);
    gap: 12px;
    justify-content: center;
    justify-items: center;
    width: 100%;
  }
}
</style>
