<script setup>
import { ref, computed } from 'vue'
import ToDoList from './components/ToDoList.vue'
import ToDoForm from './components/ToDoForm.vue'

const todos = ref([])

function addTodo(newTodo, priority = 'high') {
  console.log('Adding todo:', newTodo, 'with priority:', priority);
  todos.value.push({
    id: Date.now(),
    text: newTodo.text,
    priority: newTodo.priority
  })
}

function removeTodo(id) {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

const loggedIn = ref(false)
const username = ref(null)
const usernameInput = ref('')
const headerText = computed(() => {
  return loggedIn.value 
    ? `Welcome back ${username.value}!`
    : 'Please log in...'
})
function login() {
  if (usernameInput.value.trim() === '') return
  loggedIn.value = true
  username.value = usernameInput.value
  usernameInput.value = ''
}
</script>

<template>
  <header>
        <!--<img src="../logo.png" alt="logo">-->
        <h1 id="login-header">{{ headerText }}</h1>

        <form id="login-form" @submit.prevent="login">
          <input id="usernameInput" v-if="!loggedIn" v-model="usernameInput" placeholder="Enter your name..." />
          <button v-if="!loggedIn" id="login-button" type="submit">Log In</button>
          <button v-else id="logout-button" @click="loggedIn = false">Log Out</button>
        </form>
    </header>
    <main v-if="loggedIn">
        <ToDoForm id="todo-form" @add-todo="addTodo"/>
        <ToDoList id="todo-list" :todos="todos" @remove-todo="removeTodo"/>
    </main>
</template>

<style>
  body {
    display: grid;
    grid-template-areas: 
    "header"
    "main"
    "footer";
    background-color: #bbcdd3;
    font-family: 'Times New Roman', Times, serif;
    font-size: 1rem;

    line-height: 1.5;
    width: 75%;
    margin: 0 auto;
  }
  
  header {
    grid-area: header;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-areas: 
    "login-header login-form";
    margin-top: 24px;
    padding: 12px 48px;
    gap: 12px;
    justify-items: center;
    text-align: center;
    align-items: center;
    background-color: rgba(78, 96, 104, 0.8);
    border-radius: 12px;
  }
  
  #login-header {
    grid-area: login-header;
    display: flex;
    justify-self: start;
    max-width: max-content;
    text-align: center;
    color: #ffffff;
  }
  
  #login-form {
    grid-area: login-form;
    display: flex;
    max-width: max-content;
    height: min-content;
    justify-content: center;
    justify-self: end;
  }
  
  #usernameInput {
    gap: 8px;
    padding: 8px;
    border-radius: 8px;
    width: 100%;
  }
  
  #login-button, #logout-button {
    background-color: #4caf50;
    border: none;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    padding: 4px 8px;
    margin-left: 8px;
    white-space: nowrap;
  }
  
  main {
    grid-area: main;
    display: grid;
    grid-template-areas:
    "todo-form"
    "todo-list";
    justify-items: center;
    padding: 24px;
  }
  
  #todo-form {
    grid-area: todo-form;
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  #todo-list {
    grid-area: todo-list;
    /*width: 100%;*/
    max-width: max-content;
    align-items: center;
  }

@media screen and (max-width: 600px) {
  body {
    width: 90%;
    font-size: 0.75rem;
  }
  header {
    grid-template-columns: auto;
    grid-template-areas:
    "login-header"
    "login-form";
    justify-items: center;
    text-align: center;
    font-size: 0.75rem;
  }

  #login-header {
    grid-area: login-header;
    display: flex;
    align-self: center;
    justify-self: center;
    max-width: max-content;
    color: #ffffff;
  }

  #login-form {
    justify-self: center;
    width: 100%;
  }
}
</style>
