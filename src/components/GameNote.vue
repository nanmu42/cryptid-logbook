<template>
  <div class="px-4 py-4 container">
    <div class="mt-6 flex justify-between items-end">
      <h2>{{ props.remainedPossibilities }}个可能</h2>
      <div class="flex gap-1">
        <NButton size="small">重置全部</NButton>
        <NButton size="small">隐藏排除</NButton>
      </div>
    </div>
    <!-- TODO: terrain buster -->
    <template v-for="inverted in [false, true]" :key="inverted">
      <div v-for="clueGroup in props.clueGroups" :key="clueGroup.key">
        <h3>{{ inverted ? chineseInvertedPrefix + clueGroup.name : clueGroup.name }}</h3>
        <div class="flex flex-col gap-3">
          <ClueBar
            v-for="clue in clueGroup.clues"
            :key="clue"
            :clue="clue"
            :inverted="inverted"
            :state="inverted ? playerClues.notIn[clue] : playerClues.in[clue]"
          ></ClueBar>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { RivalClues } from '@/model/gameNote'
import ClueBar from './ClueBar.vue'
import type { Config } from '@/model/config'
import { chineseInvertedPrefix, type ClueGroup } from '@/model/constant'
import { NButton } from 'naive-ui'

interface Props {
  config: Config
  playerClues: RivalClues
  clueGroups: ClueGroup[]
  remainedPossibilities: number
}

const props = defineProps<Props>()
</script>

<style scoped>
h2 {
  font-weight: bold;
  font-size: 2.5rem;
  line-height: 2.5rem;
  margin: 0;
  text-align: left;
}

h3 {
  font-weight: bold;
  font-size: 2rem;
  margin: 2rem 0 1rem 0;
  text-align: left;
}
</style>
