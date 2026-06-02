<script setup lang="ts">
import { computed, ref } from "vue";

type LoginCredentials = {
  username: string;
  password: string;
};

const props = defineProps<{
  loggedIn: boolean;
  username: string | null;
}>();

const emit = defineEmits<{
  login: [credentials: LoginCredentials];
  logout: [];
}>();

const usernameInput = ref("");
const passwordInput = ref("");

const headerText = computed(() =>
  props.loggedIn && props.username
    ? `Welcome back, ${props.username}!`
    : "Please log in..."
);

function submitLogin(): void {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) return;

  emit("login", { username, password });
  usernameInput.value = "";
  passwordInput.value = "";
}
</script>

<template>
  <div id="login-panel">
    <h1 id="login-header">{{ headerText }}</h1>

    <form v-if="!loggedIn" id="login-form" v-on:submit.prevent="submitLogin">
      <label class="sr-only" for="username-input">Username</label>
      <input
        id="username-input"
        v-model="usernameInput"
        autocomplete="username"
        placeholder="Username"
      />

      <label class="sr-only" for="password-input">Password</label>
      <input
        id="password-input"
        v-model="passwordInput"
        autocomplete="current-password"
        placeholder="Password"
        type="password"
      />

      <button id="login-button" type="submit">Log In</button>
    </form>

    <button
      v-else
      id="logout-button"
      type="button"
      v-on:click="emit('logout')"
    >
      Log Out
    </button>
  </div>
</template>

<style scoped>
#login-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  width: 100%;
}

#login-header {
  font-size: 1.8rem;
  font-weight: 500;
  color: #333;
  margin: 0;
}

#login-form {
  display: flex;
  align-items: center;
  gap: 12px;
}

#username-input,
#password-input {
  padding: 8px;
  border: 1px solid #999;
  border-radius: 8px;
  width: 160px;
  box-sizing: border-box;
}

#login-button,
#logout-button {
  background-color: #ddd;
  border: none;
  border-radius: 6px;
  color: #333;
  cursor: pointer;
  padding: 6px 12px;
  width: 96px;
}

#login-button:hover,
#logout-button:hover {
  background-color: #bbb;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media screen and (max-width: 600px) {
  #login-panel {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  #login-header {
    margin-bottom: 16px;
  }

  #login-form {
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
  }

  #username-input,
  #password-input {
    width: 80%;
    max-width: 320px;
  }
}
</style>
