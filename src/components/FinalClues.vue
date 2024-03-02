<template>
  <div>
    <FinalClue
      :color="props.config.playerColor1!"
      :config="props.config"
      :game-note="props.gameNote"
    ></FinalClue>
    <FinalClue
      v-if="props.config.playerColor2"
      :color="props.config.playerColor2!"
      :config="props.config"
      :game-note="props.gameNote"
    ></FinalClue>
    <FinalClue
      v-for="color in props.config.rivalColors"
      :key="color"
      :color="color"
      :config="props.config"
      :game-note="props.gameNote"
    ></FinalClue>
    <PageFooter class="pt-24 pb-8"></PageFooter>
  </div>
</template>

<script setup lang="ts">
import FinalClue from '@/components/FinalClue.vue'
import PageFooter from '@/components/PageFooter.vue'
import type { Config } from '@/model/config'
import type { GameNote } from '@/model/gameNote'

interface Props {
  config: Config
  gameNote: GameNote
}

const props = defineProps<Props>()
</script>

<style scoped></style>
