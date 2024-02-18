<template>
  <footer class="grid grid-cols-1 place-content-center gap-2 text-center">
    <NButton text @click="handleShare">
      <template #icon>
        <NIcon>
          <Qrcode />
        </NIcon>
      </template>
      和朋友分享这个工具
    </NButton>
    <NButton text @click="openNewTab('https://github.com/nanmu42/cryptid-logbook')">
      <template #icon>
        <NIcon>
          <Github />
        </NIcon>
      </template>
      Open source on GitHub
    </NButton>
    <p class="mt-2">Copyright © 2024 Zhennan "Nanmu Lee" Li</p>
    <ShareModal v-model:show="showShareModal"></ShareModal>
  </footer>
</template>

<script setup lang="ts">
import { NIcon, NButton } from 'naive-ui'
import ShareModal from '@/components/ShareModal.vue'
import { Github, Qrcode } from '@vicons/fa'
import { ref } from 'vue'

const showShareModal = ref(false)

function handleShare() {
  showShareModal.value = true
}

function openNewTab(url: string) {
  window.open(url, '_blank')
}
</script>
