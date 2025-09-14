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
    ? `Welcome back, ${username.value}!`
    : 'Please log in...'
})
function login() {
  if (usernameInput.value.trim() === '') return
  loggedIn.value = true
  username.value = usernameInput.value
  usernameInput.value = ''
}

const sortBy = ref('id')

const sortedTodos = computed(() => {
  console.log('Sorting todos by:', sortBy.value);
  return [...todos.value].sort((a, b) => {
    if (sortBy.value === 'text') {
      return a.text.localeCompare(b.text)
    } else if (sortBy.value === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
    } else {
      return b.id - a.id
    }
  })
})

</script>

<template>
  <header>
        <h1 id="login-header">{{ headerText }}</h1>

        <form id="login-form" @submit.prevent="login">
          <input id="usernameInput" v-if="!loggedIn" v-model="usernameInput" placeholder="Enter your name..." />
          <button v-if="!loggedIn" id="login-button" type="submit">Log In</button>
          <button v-else id="logout-button" @click="loggedIn = false">Log Out</button>
        </form>
    </header>
    <main v-if="loggedIn">
      <ToDoForm id="todo-form" @add-todo="addTodo"/>
      <hr class="separator" />
      <div id="sort-container">
        <label id="sort" for="sort-select">Sort by:</label>
        <select id="sort-select" v-model="sortBy">
          <option value="id">Date</option>
          <option value="text">Name</option>
          <option value="priority">Priority</option>
        </select>
      </div>

        <ToDoList id="todo-list" :todos="sortedTodos" @remove-todo="removeTodo"/>
    </main>
</template>

<style>
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #7a7a7a;
  }
    
  header {
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 20px 40px;
  }
    
  #login-header {
    font-size: 1.8rem;
    font-weight: 500;
    color: #333;
    margin: 0;
  }

  #login-form {
    display: flex;
    gap: 12px;
  }

  #usernameInput {
    gap: 8px;
    padding: 8px;
    border-radius: 8px;
    width: 100%;
  }
  
  #login-button, #logout-button {
    background-color: #ddd;
    border: none;
    border-radius: 6px;
    color: #333;
    cursor: pointer;
    padding: 6px 12px;
}

  #login-button:hover, #logout-button:hover {
    background-color: #bbb;
  }
  
  main {
    grid-area: main;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px auto;
    padding: 20px;
    background-color: rgba(255,255,255,0.8);
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
