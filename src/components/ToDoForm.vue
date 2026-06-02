<script setup lang="ts">
import { ref, computed } from "vue";
import { PlusIcon } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { priorityOptions, type Priority } from "@/types/todo";

const emit = defineEmits<{
  "add-todo": [todo: { text: string; priority: Priority }];
}>();

const text = ref("");
const priority = ref<Priority | "">("");

const charsLeft = computed(() => 50 - text.value.length);
const tooLong = computed(() => text.value.length >= 50);
const canSubmit = computed(
  () => text.value.trim() !== "" && priority.value !== ""
);

function submitTodo(): void {
  const trimmedText = text.value.trim();

  if (trimmedText !== "" && priority.value !== "") {
    emit("add-todo", {
      text: trimmedText,
      priority: priority.value,
    });
    text.value = "";
    priority.value = "";
  }
}
</script>

<template>
  <form class="grid gap-4" v-on:submit.prevent="submitTodo">
    <div class="grid gap-2">
      <div class="flex items-center justify-between gap-3">
        <Label for="todo-input">Task</Label>
        <p
          v-bind:class="[
            'text-xs',
            tooLong ? 'text-destructive' : 'text-muted-foreground',
          ]"
        >
          {{ charsLeft }} characters left
        </p>
      </div>
      <Textarea
        id="todo-input"
        v-model="text"
        class="min-h-24 resize-y"
        maxlength="50"
        placeholder="Add task..."
        rows="3"
      />
    </div>

    <div class="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
      <div class="grid gap-2">
        <Label for="priority-select">Priority</Label>
        <Select v-model="priority">
          <SelectTrigger id="priority-select" class="w-full sm:w-52">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="option in priorityOptions"
              v-bind:key="option.value"
              v-bind:value="option.value"
            >
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        class="h-9 w-full sm:w-auto"
        type="submit"
        v-bind:disabled="!canSubmit"
      >
        <PlusIcon class="size-4" aria-hidden="true" />
        Add
      </Button>
    </div>
  </form>
</template>
