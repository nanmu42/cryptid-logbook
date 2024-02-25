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
    <NButton text @click="handleGreeting">
      <template #icon>
        <NIcon>
          <CopyrightRegular />
        </NIcon>
      </template>
      Copyright 2024 Zhennan LI
    </NButton>
    <ShareModal class="max-w-[480px]" v-model:show="showShareModal"></ShareModal>
  </footer>
</template>

<script setup lang="ts">
import { NIcon, NButton, useMessage } from 'naive-ui'
import ShareModal from '@/components/ShareModal.vue'
import { Github, Qrcode, CopyrightRegular } from '@vicons/fa'
import { ref } from 'vue'

const notify = useMessage()

const showShareModal = ref(false)

function handleShare() {
  showShareModal.value = true
}

function openNewTab(url: string) {
  window.open(url, '_blank')
}

function handleGreeting() {
  const now = new Date()
  const hour = now.getHours()

  if (hour > 23 && hour < 6) {
    notify.info('游戏好玩，但最好不要熬夜哟。')
  } else if (hour < 12) {
    notify.info('早上好！今天天气好么？')
  } else if (hour < 18) {
    notify.info('下午好！正是让人开心的时候不是么？')
  } else {
    notify.info('晚上好！祝你今晚玩得开心！')
  }
}
</script>
