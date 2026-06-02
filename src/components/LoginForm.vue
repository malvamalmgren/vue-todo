<script setup lang="ts">
import { computed, ref } from "vue";
import {
  LockIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
} from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  <div
    class="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
  >
    <div class="min-w-0">
      <p class="text-xs font-medium uppercase text-muted-foreground">
        Todo board
      </p>
      <h1 class="truncate text-2xl font-semibold tracking-normal">
        {{ headerText }}
      </h1>
    </div>

    <form
      v-if="!loggedIn"
      class="grid w-full gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:w-auto"
      v-on:submit.prevent="submitLogin"
    >
      <div class="relative">
        <Label class="sr-only" for="username-input">Username</Label>
        <UserIcon
          class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          id="username-input"
          v-model="usernameInput"
          autocomplete="username"
          class="h-9 pl-8"
          placeholder="Username"
        />
      </div>

      <div class="relative">
        <Label class="sr-only" for="password-input">Password</Label>
        <LockIcon
          class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          id="password-input"
          v-model="passwordInput"
          autocomplete="current-password"
          class="h-9 pl-8"
          placeholder="Password"
          type="password"
        />
      </div>

      <Button class="h-9 w-full sm:w-auto" type="submit">
        <LogInIcon class="size-4" aria-hidden="true" />
        Log In
      </Button>
    </form>

    <Button
      v-else
      class="w-fit"
      type="button"
      variant="outline"
      v-on:click="emit('logout')"
    >
      <LogOutIcon class="size-4" aria-hidden="true" />
      Log Out
    </Button>
  </div>
</template>
