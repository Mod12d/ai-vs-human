<script setup lang="ts">
import { ref } from 'vue';
import type { Theme } from '@/types';

interface Props {
  theme: Theme;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'refresh'): void;
}>();
</script>

<template>
  <div class="theme-card">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">お題</h2>
      <button
        @click="$emit('refresh')"
        class="btn btn--primary"
      >
        新しいお題を取得
      </button>
    </div>
    
    <p class="text-gray-700 mb-4">
      {{ theme.prompt }}
    </p>
    
    <div v-if="theme.example" class="mt-4 p-4 bg-gray-50 rounded-lg">
      <p class="text-sm text-gray-600">
        参考例：{{ theme.example }}
      </p>
    </div>
    
    <div class="text-sm text-gray-500 mt-2">
      制限文字数: {{ theme.maxLength }}文字
    </div>
  </div>
</template>