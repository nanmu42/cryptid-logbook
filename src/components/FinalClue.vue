<template>
  <div
    class="w-full min-h-60 py-6 px-2"
    :style="{ backgroundColor: getColorHex(props.color) }"
    @click="togglePlayerClueMask"
  >
    <div v-if="isShowingPlayerClue" class="text-center flex flex-col items-center justify-center">
      <p class="text-xl">你的线索</p>
      <p class="text-4xl mt-12">{{ maskedPlayerClue }}</p>
    </div>
    <div v-else class="flex flex-col items-center justify-center">
      <p class="text-xl">12个可能</p>
      <div class="mt-8 flex flex-wrap gap-2 items-center justify-start"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Config, PlayerClue } from '@/model/config'
import type { PlayerColor } from '@/model/constant'
import { getChineseClueName, getColorHex } from '@/model/constant'
import type { GameNote } from '@/model/gameNote'
import { computed, ref } from 'vue'

interface Props {
  color: PlayerColor
  config: Config
  gameNote: GameNote
}

const props = defineProps<Props>()

const isShowingPlayerClue = computed<boolean>(() => {
  if (props.config.isTwoPlayerMode) {
    return props.config.playerColor1 === props.color || props.config.playerColor2 === props.color
  }

  return props.config.playerColor1 === props.color
})

const playerClue = computed<string | null>(() => {
  let clue: PlayerClue | null = null
  if (props.config.playerColor1 === props.color) {
    clue = props.config.playerClue1
  } else if (props.config.playerColor2 === props.color) {
    clue = props.config.playerClue2
  }

  if (!clue) {
    return null
  }

  return getChineseClueName(clue.clue, clue.inverted)
})

const isPlayerClueMasked = ref(true)

function togglePlayerClueMask() {
  if (!isShowingPlayerClue.value) {
    return
  }
  isPlayerClueMasked.value = !isPlayerClueMasked.value
}

const maskedPlayerClue = computed<string | null>(() =>
  isPlayerClueMasked.value ? '点击揭示' : playerClue.value,
)
</script>

<style scoped></style>
