<template>
  <div class="px-4 py-4 container">
    <div class="mt-6 flex justify-between items-end">
      <h2>{{ props.remainedPossibilities }}个可能</h2>
      <div class="flex gap-1">
        <NButton size="small" @click="handleResetAll">重置全部</NButton>
        <NButton size="small" @click="handleHideExcluded">{{
          isExcludedShown ? '隐藏排除' : '显示排除'
        }}</NButton>
      </div>
    </div>
    <div v-if="props.config.shortcuts.globalSwitch && props.config.shortcuts.terrainBuster">
      <TerrainBuster
        polarity="negative"
        @update="handleNegativeTerrainBusterChanged"
      ></TerrainBuster>
      <TerrainBuster
        polarity="positive"
        @update="handlePositiveTerrainBusterChanged"
      ></TerrainBuster>
    </div>
    <template v-for="inverted in invertedCases" :key="inverted">
      <div
        v-for="clueGroup in props.clueGroups"
        :key="clueGroup.key"
        v-show="
          isExcludedShown ||
          hasAnyClueNotExcluded(
            clueGroup.clues as FlattenedClue[],
            inverted ? playerClues.notIn : playerClues.in,
          )
        "
      >
        <h3>{{ inverted ? chineseInvertedPrefix + clueGroup.name : clueGroup.name }}</h3>
        <div class="flex flex-col gap-3">
          <ClueBar
            v-for="clue in clueGroup.clues"
            v-show="
              isExcludedShown ||
              shouldShowClue(inverted ? playerClues.notIn[clue] : playerClues.in[clue])
            "
            :key="clue"
            :clue="clue"
            :inverted="inverted"
            :state="inverted ? playerClues.notIn[clue] : playerClues.in[clue]"
            :player-color="props.playerColor"
          ></ClueBar>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ClueState, RivalClue, RivalClues } from '@/model/gameNote'
import ClueBar from './ClueBar.vue'
import type { Config } from '@/model/config'
import {
  chineseInvertedPrefix,
  type ClueGroup,
  type ClueTerrain,
  type FlattenedClue,
  type PlayerColor,
} from '@/model/constant'
import { NButton, useDialog, type DialogOptions } from 'naive-ui'
import { computed, ref } from 'vue'
import TerrainBuster from './TerrainBuster.vue'
import { eventBus } from '@/model/eventBus'

const dialog = useDialog()

interface Props {
  config: Config
  playerColor: PlayerColor
  playerClues: RivalClues
  clueGroups: ClueGroup[]
  remainedPossibilities: number
}

const props = defineProps<Props>()

const invertedCases = computed<boolean[]>(() => {
  if (props.config.isAdvancedMode) {
    return [false, true]
  }

  return [false]
})

const isExcludedShown = ref(true)

function handleHideExcluded() {
  isExcludedShown.value = !isExcludedShown.value
}

function hasAnyClueNotExcluded(scope: FlattenedClue[], clues: RivalClue): boolean {
  for (const clue of scope) {
    const state = clues[clue]
    if (shouldShowClue(state)) {
      return true
    }
  }

  return false
}

function shouldShowClue(state: ClueState): boolean {
  return state !== 'excluded' && state !== 'autoExcluded'
}

function handleResetAll() {
  const opts: DialogOptions = {
    title: '重置全部线索',
    content: '擦除本页面对应颜色的所有笔记，重头再来？',
    positiveText: '我确定',
    negativeText: '且慢，我点错了',
    onPositiveClick: () => {
      eventBus.emit('resetGameNote', {
        playerColor: props.playerColor,
      })
    },
  }

  dialog.warning(opts)
}

function handlePositiveTerrainBusterChanged(payload: { [key in ClueTerrain]: boolean }) {
  eventBus.emit('terrainBusterChanged', {
    playerColor: props.playerColor,
    polarity: 'positive',
    payload: payload,
  })
}

function handleNegativeTerrainBusterChanged(payload: { [key in ClueTerrain]: boolean }) {
  eventBus.emit('terrainBusterChanged', {
    playerColor: props.playerColor,
    polarity: 'negative',
    payload: payload,
  })
}
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
