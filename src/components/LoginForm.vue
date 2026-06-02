<script setup lang="ts">
import { computed, ref } from "vue";
import { LockIcon, LogInIcon, LogOutIcon, UserIcon } from "@lucide/vue";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

const usernameTooShort = computed(
  () => usernameInput.value.length > 0 && usernameInput.value.trim().length < 3,
);
const displayUsername = computed(() => props.username ?? "User");
const avatarInitials = computed(() =>
  displayUsername.value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase(),
);

function submitLogin(): void {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username.length < 3 || !password) return;

  emit("login", { username, password });
  usernameInput.value = "";
  passwordInput.value = "";
}
</script>

<template>
  <div
    v-bind:class="[
      'flex w-full gap-4',
      loggedIn
        ? 'flex-row items-center justify-between'
        : 'flex-col sm:flex-row sm:items-center sm:justify-between',
    ]"
  >
    <div class="min-w-0">
      <h1 class="text-2xl font-medium uppercase tracking-normal text-muted-foreground">
        Todo board
      </h1>
      <p v-if="!loggedIn" class="text-sm text-muted-foreground">
        Please log in...
      </p>
    </div>

    <form
      v-if="!loggedIn"
      class="grid w-full gap-3 sm:w-auto sm:grid-cols-[8rem_8rem_auto] sm:items-start sm:gap-2"
      v-on:submit.prevent="submitLogin"
    >
      <div class="grid gap-1">
        <Label class="sr-only" for="username-input">Username</Label>
        <div class="relative">
          <UserIcon
            class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="username-input"
            v-model="usernameInput"
            autocomplete="username"
            class="h-9 pl-8 text-sm"
            minlength="3"
            placeholder="Username"
          />
        </div>
        <p v-if="usernameTooShort" class="text-xs text-destructive">
          Username must be at least 3 characters.
        </p>
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
          class="h-9 pl-8 text-sm"
          placeholder="Password"
          type="password"
        />
      </div>

      <Button class="h-9 w-full cursor-pointer sm:w-auto" type="submit">
        <LogInIcon class="size-4" aria-hidden="true" />
        Log In
      </Button>
    </form>

    <div v-else class="flex min-w-0 shrink-0 items-center justify-end gap-3">
      <p
        class="max-w-[40vw] truncate text-sm font-medium text-muted-foreground"
      >
        {{ displayUsername }}
      </p>

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            aria-label="Open user menu"
            class="size-9 cursor-pointer rounded-full p-0"
            size="icon"
            type="button"
            variant="ghost"
          >
            <Avatar>
              <AvatarFallback
                class="bg-[var(--avatar-background)] text-foreground"
              >
                {{ avatarInitials }}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-40">
          <DropdownMenuItem class="cursor-pointer" v-on:click="emit('logout')">
            <LogOutIcon class="size-4" aria-hidden="true" />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>
