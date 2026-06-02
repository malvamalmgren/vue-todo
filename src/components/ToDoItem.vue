<script setup lang="ts">
import { computed } from "vue";
import { Trash2Icon } from "@lucide/vue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Priority, Todo } from "@/types/todo";

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  "remove-todo": [id: number];
}>();

const priorityStyles: Record<
  Priority,
  { label: string; card: string; badge: string }
> = {
  low: {
    label: "Low",
    card: "border-[var(--priority-low)]/80",
    badge:
      "border-[var(--priority-low)]/80 bg-[var(--priority-low)]/20 text-[var(--priority-text-low)]",
  },
  medium: {
    label: "Medium",
    card: "border-[var(--priority-medium)]/80",
    badge:
      "border-[var(--priority-medium)]/80 bg-[var(--priority-medium)]/20 text-[var(--priority-text-medium)]",
  },
  high: {
    label: "High",
    card: "border-[var(--priority-high)]/80",
    badge:
      "border-[var(--priority-high)]/80 bg-[var(--priority-high)]/20 text-[var(--priority-text-high)]",
  },
};

const priorityStyle = computed(() => priorityStyles[props.todo.priority]);
</script>

<template>
  <li>
    <Card
      v-bind:class="[
        'h-full min-h-36 border shadow-xs transition-shadow hover:shadow-sm',
        priorityStyle.card,
      ]"
    >
      <CardContent class="flex h-full flex-col gap-4">
        <div class="flex items-start justify-between gap-3">
          <Badge variant="outline" v-bind:class="priorityStyle.badge">
            {{ priorityStyle.label }}
          </Badge>

          <Button
            aria-label="Remove task"
            class="size-7 text-muted-foreground hover:text-destructive"
            size="icon-sm"
            type="button"
            variant="ghost"
            v-on:click="emit('remove-todo', props.todo.id)"
          >
            <Trash2Icon class="size-4" aria-hidden="true" />
          </Button>
        </div>

        <p
          class="flex-1 whitespace-pre-wrap break-words text-sm font-medium leading-6"
        >
          {{ props.todo.text }}
        </p>
      </CardContent>
    </Card>
  </li>
</template>
