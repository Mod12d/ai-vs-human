import { createApp } from 'vue'
import App from './App.vue'

// スタイルのインポート順序を修正
import './styles/base.scss'  // 基本スタイル
import 'tailwindcss/tailwind.css'  // Tailwindのスタイル

const app = createApp(App)
app.mount('#app')