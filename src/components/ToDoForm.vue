<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import { PlusIcon } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { Priority } from "@/types/todo";

const priorityOptions: Array<{
  value: Priority;
  label: string;
  thumbClass: string;
  stripClass: string;
  selectedTextClass: string;
}> = [
  {
    value: "low",
    label: "Low",
    thumbClass: "bg-[var(--priority-low)]/50",
    stripClass: "bg-[var(--priority-low)]",
    selectedTextClass:
      "text-[var(--priority-text-low)] hover:text-[var(--priority-text-low)]",
  },
  {
    value: "medium",
    label: "Medium",
    thumbClass: "bg-[var(--priority-medium)]/50",
    stripClass: "bg-[var(--priority-medium)]",
    selectedTextClass:
      "text-[var(--priority-text-medium)] hover:text-[var(--priority-text-medium)]",
  },
  {
    value: "high",
    label: "High",
    thumbClass: "bg-[var(--priority-high)]/50",
    stripClass: "bg-[var(--priority-high)]",
    selectedTextClass:
      "text-[var(--priority-text-high)] hover:text-[var(--priority-text-high)]",
  },
];

const emit = defineEmits<{
  "add-todo": [todo: { text: string; priority: Priority }];
}>();

const text = ref("");
const priority = ref<Priority>("low");

const charsLeft = computed(() => 250 - text.value.length);
const tooLong = computed(() => text.value.length >= 250);
const canSubmit = computed(() => text.value.trim() !== "");
const priorityIndex = computed(() =>
  priorityOptions.findIndex((option) => option.value === priority.value),
);
const priorityThumbClass = computed(
  () =>
    priorityOptions[priorityIndex.value]?.thumbClass ??
    "bg-[var(--priority-medium)]",
);
const priorityThumbStyle = computed(() => ({
  width: `calc((100% - 0.5rem) / ${priorityOptions.length})`,
  transform: `translateX(${priorityIndex.value * 100}%)`,
}));

function isPriority(value: unknown): value is Priority {
  return (
    typeof value === "string" &&
    priorityOptions.some((option) => option.value === value)
  );
}

function setPriority(nextPriority: unknown): void {
  if (isPriority(nextPriority)) {
    priority.value = nextPriority;
  }
}

function resizeTextarea(event?: Event): void {
  const textarea =
    event?.target instanceof HTMLTextAreaElement
      ? event.target
      : document.querySelector<HTMLTextAreaElement>("#todo-input");

  if (!textarea) return;

  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

function submitTodo(): void {
  const trimmedText = text.value.trim();

  if (trimmedText !== "") {
    emit("add-todo", {
      text: trimmedText,
      priority: priority.value,
    });
    text.value = "";
    priority.value = "low";
    void nextTick(resizeTextarea);
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
        class="min-h-24 resize-none overflow-hidden"
        maxlength="250"
        placeholder="Add task..."
        rows="3"
        v-on:input="resizeTextarea"
      />
    </div>

    <div class="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
      <div class="grid gap-2">
        <Label id="priority-label">Priority</Label>
        <ToggleGroup
          aria-labelledby="priority-label"
          class="relative grid w-full grid-cols-3 overflow-hidden rounded-md border bg-background p-1 pb-3 sm:w-80"
          v-bind:model-value="priority"
          size="sm"
          type="single"
          v-on:update:model-value="setPriority"
        >
          <span
            aria-hidden="true"
            v-bind:class="[
              'absolute left-1 top-1 h-8 rounded-t-md shadow-xs transition-[transform,background-color] duration-200 ease-out',
              priorityThumbClass,
            ]"
            v-bind:style="priorityThumbStyle"
          ></span>

          <span
            aria-hidden="true"
            class="absolute bottom-1.5 left-1 right-1 grid h-1 overflow-hidden rounded-full"
            v-bind:style="{
              gridTemplateColumns: `repeat(${priorityOptions.length}, minmax(0, 1fr))`,
            }"
          >
            <span
              v-for="option in priorityOptions"
              v-bind:key="option.value"
              v-bind:class="option.stripClass"
            ></span>
          </span>

          <ToggleGroupItem
            v-for="option in priorityOptions"
            v-bind:key="option.value"
            v-bind:class="[
              'relative z-10 h-8 w-full rounded-md border-0 bg-transparent px-4 shadow-none transition-colors hover:bg-transparent data-[state=on]:bg-transparent data-[state=on]:shadow-none',
              priority === option.value
                ? option.selectedTextClass
                : 'text-black hover:text-black',
            ]"
            type="button"
            v-bind:value="option.value"
          >
            {{ option.label }}
          </ToggleGroupItem>
        </ToggleGroup>
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
