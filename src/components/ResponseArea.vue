<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  mode: 'ai' | 'human';
  maxLength?: number;
  content?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:content', value: string): void;
}>();

const localContent = ref(props.content || '');
const remainingChars = computed(() => {
  if (!props.maxLength) return null;
  return props.maxLength - localContent.value.length;
});

const updateContent = (value: string) => {
  localContent.value = value;
  emit('update:content', value);
};
</script>

<template>
  <div :class="[
    'response-area',
    `response-area--${mode}`
  ]">
    <h3 class="text-lg font-bold mb-4" :class="[
      mode === 'ai' ? 'text-blue-900' : 'text-green-900'
    ]">
      {{ mode === 'ai' ? 'AI の回答' : '人間の回答' }}
    </h3>
    
    <div class="min-h-[200px] bg-white rounded-lg p-4">
      <textarea
        v-if="mode === 'human'"
        v-model="localContent"
        class="input-area"
        :maxlength="maxLength"
        placeholder="ここに回答を入力してください..."
        @input="updateContent($event.target.value)"
      />
      <div v-else class="whitespace-pre-wrap">
        {{ content }}
      </div>
      
      <div v-if="maxLength" class="text-sm text-gray-500 mt-2 text-right">
        {{ localContent.length }} / {{ maxLength }}文字
      </div>
    </div>
  </div>
</template>