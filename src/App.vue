<!-- src/App.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Theme } from '@/types';

const theme = ref<Theme>({
  prompt: 'サルトルらしいセリフを500字以内で書いてください',
  example: '私は考える。それは激しい頭痛のようなものだ。存在は私の意識を押しつぶそうとする。私は吐き気を覚える。それは紛れもない実存だ。',
  maxLength: 500
});

const isLoading = ref(false);
const error = ref<string | null>(null);
const aiResponse = ref('');
const humanResponse = ref('');

// テーマをリロードする関数
const loadTheme = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // TODO: 実際のAPI実装後に置き換え
    // ダミーデータを使用
    const themes = [
      {
        prompt: 'サルトルらしいセリフを500字以内で書いてください',
        example: '私は考える。それは激しい頭痛のようなものだ。存在は私の意識を押しつぶそうとする。私は吐き気を覚える。それは紛れもない実存だ。',
        maxLength: 500
      },
      {
        prompt: 'カミュらしいセリフを500字以内で書いてください',
        example: '太陽が照りつける。それは不条理な世界の象徴だ。人生に意味などない。それでも我々は生きていく。',
        maxLength: 500
      }
    ];
    
    // ランダムにテーマを選択
    theme.value = themes[Math.floor(Math.random() * themes.length)];
    
    // 回答をリセット
    aiResponse.value = '';
    humanResponse.value = '';
    
    // TODO: 実際のAI API実装後に置き換え
    // ダミーのAI応答
    setTimeout(() => {
      aiResponse.value = '存在とは、それ自体が過剰なのだ。意識は常に何かについての意識であり、それ自体で完結することはできない。私たちは自由という重荷を背負わされている。';
    }, 1000);
    
  } catch (e) {
    error.value = e instanceof Error ? e.message : '予期せぬエラーが発生しました';
  } finally {
    isLoading.value = false;
  }
};

// 初回マウント時にテーマを読み込む
onMounted(loadTheme);
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div v-if="!isLoaded" class="debug-loading">
    Loading... (Debug message)
  </div>

  <div v-else class="min-h-screen bg-gray-100 p-4">
    <!-- デバッグ用のメッセージを追加 -->
    <div class="bg-yellow-100 p-4 mb-4 rounded">
      Debug: Application Loaded Successfully
    </div>
  </div>
    <div class="max-w-6xl mx-auto">
      
      <!-- ヘッダー -->
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-center text-gray-800">AI vs Human</h1>
      </header>

      <!-- エラー表示 -->
      <div 
        v-if="error" 
        class="mb-4 p-4 bg-red-100 text-red-700 rounded-lg"
      >
        {{ error }}
      </div>

      <!-- メインコンテンツ -->
      <main>
        <!-- お題カード -->
        <div class="theme-card mb-8">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">お題</h2>
            <button
              @click="loadTheme"
              :disabled="isLoading"
              class="btn btn--primary"
            >
              {{ isLoading ? '更新中...' : '新しいお題を取得' }}
            </button>
          </div>

          <p class="text-gray-700 mb-4">
            {{ theme.prompt }}
          </p>

          <div class="mt-4 p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-600">
              参考例：{{ theme.example }}
            </p>
          </div>

          <div class="text-sm text-gray-500 mt-2">
            制限文字数: {{ theme.maxLength }}文字
          </div>
        </div>

        <!-- 回答エリア -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- AI回答 -->
          <div class="bg-blue-50 rounded-lg p-6">
            <h3 class="text-lg font-bold mb-4 text-blue-900">
              AI の回答
            </h3>
            <div class="min-h-[200px] bg-white rounded-lg p-4">
              <div v-if="isLoading" class="animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div class="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div v-else class="whitespace-pre-wrap">
                {{ aiResponse }}
              </div>
            </div>
          </div>

          <!-- 人間の回答 -->
          <div class="bg-green-50 rounded-lg p-6">
            <h3 class="text-lg font-bold mb-4 text-green-900">
              人間の回答
            </h3>
            <div class="min-h-[200px] bg-white rounded-lg p-4">
              <textarea
                v-model="humanResponse"
                class="input-area"
                :maxlength="theme.maxLength"
                placeholder="ここに回答を入力してください..."
              />
              <div class="text-sm text-gray-500 mt-2 text-right">
                {{ humanResponse.length }} / {{ theme.maxLength }}文字
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-area {
  width: 100%;
  min-height: 200px;
  resize: vertical;
  @apply border-0 focus:ring-0;
}

.theme-card {
  @apply bg-white rounded-lg shadow-md p-6;
}

.btn {
  @apply px-4 py-2 rounded transition-colors;
  
  &--primary {
    @apply bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300;
  }
}

</style>