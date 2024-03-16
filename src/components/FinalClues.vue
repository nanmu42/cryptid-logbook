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
    <div class="mt-12 flex justify-center items-center">
      <NButton size="large" @click="handleGameOver">重开一局</NButton>
    </div>
    <PageFooter class="pt-16 pb-8"></PageFooter>
  </div>
</template>

<script setup lang="ts">
import FinalClue from '@/components/FinalClue.vue'
import PageFooter from '@/components/PageFooter.vue'
import type { Config } from '@/model/config'
import type { PlayerColor } from '@/model/constant'
import type { GameNote } from '@/model/gameNote'
import { NButton } from 'naive-ui'

interface Props {
  config: Config
  gameNote: GameNote
  remainedPossibilities: { [key in PlayerColor]?: number }
}

const props = defineProps<Props>()

const emit = defineEmits(['gameOver'])

function handleGameOver() {
  emit('gameOver')
}
</script>

<style scoped></style>
