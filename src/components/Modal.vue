<template>
  <div v-if="isVisible" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <button class="copy-button" @click="copyContent">
        <img src="https://w7.pngwing.com/pngs/592/864/png-transparent-computer-icons-icon-design-cut-copy-and-paste-taobao-clothing-promotional-copy-text-rectangle-emoticon-thumbnail.png" alt="Copy" class="copy-icon" />
      </button>
      <div class="modal-body">
        <pre v-html="highlightedContent" class="line-wrap"></pre>
      </div>
    </div>
    <div v-if="showNotification" class="notification">Content copied to clipboard</div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/github.css'

hljs.registerLanguage('json', json)

const props = defineProps({
  isVisible: Boolean,
  content: String
})

const emit = defineEmits(['close'])

const highlightedContent = ref('')
const showNotification = ref(false)

const close = () => {
  emit('close')
}

const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(props.content)
    showNotification.value = true
    setTimeout(() => {
      showNotification.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

watch(() => props.content, (newContent) => {
  highlightedContent.value = hljs.highlight(newContent, {language: 'json'}).value
}, {immediate: true})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto; /* Enable vertical scrolling */
  position: relative;
}

.copy-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.copy-icon {
  width: 20px;
  height: 20px;
}

.modal-body {
  white-space: pre-wrap;
}

.line-wrap {
  white-space: pre-wrap; /* Enable line wrapping */
  word-wrap: break-word; /* Break long words */
}

.notification {
  position: fixed;
  bottom: 50px; /* Move the notification box upwards */
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-size: 16px;
}
</style>