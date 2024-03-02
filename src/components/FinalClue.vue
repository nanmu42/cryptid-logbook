<template>
  <div class="w-full min-h-[30vh]" :style="{ backgroundColor: getColorHex(props.color) }"></div>
</template>

<script setup lang="ts">
import type { Config } from '@/model/config'
import type { PlayerColor } from '@/model/constant'
import { getColorHex } from '@/model/constant'
import type { GameNote } from '@/model/gameNote'
import { computed } from 'vue'

interface Props {
  color: PlayerColor
  config: Config
  gameNote: GameNote
}

const props = defineProps<Props>()

const isPlayerMode = computed<boolean>(() => {
  if (props.config.isTwoPlayerMode) {
    return props.config.playerColor1 === props.color || props.config.playerColor2 === props.color
  }

  return props.config.playerColor1 === props.color
})
</script>

<style scoped></style>
