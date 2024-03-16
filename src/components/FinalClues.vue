<template>
  <div>
    <FinalClue :color="props.config.playerColor1!" :config="props.config"></FinalClue>
    <FinalClue
      v-if="props.config.playerColor2"
      :color="props.config.playerColor2!"
      :config="props.config"
    ></FinalClue>
    <FinalClue
      v-for="color in props.config.rivalColors"
      :key="color"
      :color="color"
      :config="props.config"
      :rival-clues="props.gameNote.clues[color]"
      :remained-possibilities="props.remainedPossibilities[color]"
    ></FinalClue>
    <div class="mt-12 flex flex-col gap-4 justify-center items-center">
      <p>本局开始于 {{ gameStartedAt }}</p>
      <NButton size="large" @click="handleGameOver">重开一局</NButton>
      <NButton size="large" @click="fullscreen.toggle">切换全屏</NButton>
    </div>
    <PageFooter class="pt-16 pb-24"></PageFooter>
  </div>
</template>

<script setup lang="ts">
import FinalClue from '@/components/FinalClue.vue'
import PageFooter from '@/components/PageFooter.vue'
import type { Config } from '@/model/config'
import type { PlayerColor } from '@/model/constant'
import type { GameNote } from '@/model/gameNote'
import { NButton } from 'naive-ui'
import { useFullscreen } from '@vueuse/core'
import { persistentStorage } from '@/model/storage'

interface Props {
  config: Config
  gameNote: GameNote
  remainedPossibilities: { [key in PlayerColor]?: number }
}

const props = defineProps<Props>()

const emit = defineEmits(['gameOver'])

const fullscreen = useFullscreen()

const gameStartedAt = persistentStorage.getGameStartedAt()?.toLocaleString()

function handleGameOver() {
  emit('gameOver')
}
</script>

<style scoped></style>
