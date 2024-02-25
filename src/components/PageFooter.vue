<template>
  <footer class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 place-content-center">
    <NButton text @click="handleAbout">
      <template #icon>
        <NIcon>
          <Question />
        </NIcon>
      </template>
      这是用来做啥的？
    </NButton>
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
    <NModal class="max-w-[480px]" v-model:show="showAbout" preset="card" title="这是用来做啥的？">
      <div>
        <p>
          我的家人和不少朋友都很喜欢<a
            class="text-cyan-400"
            href="https://boardgamegeek.com/boardgame/246784/cryptid"
            target="_blank"
            rel="noopener"
            >《诡影寻踪（Cryptid）》</a
          >这个桌游，而我的忘性很大，总是需要笔记才能顺利玩下去。
        </p>
        <p class="mt-2">
          我不喜欢纸质笔记（现场总是没有足够的笔，另外想尝鲜的朋友看到要动笔就望而却步了），
          所以就做了这个工具，同时我加了一些捷径功能来提高效率，这样我在游戏中就有了更多抬头聊天的机会。
        </p>
        <p class="mt-4">
          Cryptid is designed by Hal Duncan and Ruth Veevers, the artwork is by Kwanchai Moriya.
        </p>
      </div>
    </NModal>
  </footer>
</template>

<script setup lang="ts">
import { NIcon, NButton, useMessage, NModal } from 'naive-ui'
import ShareModal from '@/components/ShareModal.vue'
import { Github, Qrcode, CopyrightRegular, Question } from '@vicons/fa'
import { ref } from 'vue'

const notify = useMessage()

const showShareModal = ref(false)
const showAbout = ref(false)

function handleShare() {
  showShareModal.value = true
}

function handleAbout() {
  showAbout.value = true
}

function openNewTab(url: string) {
  window.open(url, '_blank')
}

function handleGreeting() {
  const now = new Date()
  const hour = now.getHours()

  if (hour > 23 || hour < 6) {
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
