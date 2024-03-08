<template>
  <div class="px-4 py-4 container">
    <div class="mt-6 flex justify-between items-end">
      <h2>{{ remainedPossibilities }}个可能</h2>
      <div class="flex gap-1">
        <NButton size="small">重置全部</NButton>
        <NButton size="small">隐藏排除</NButton>
      </div>
    </div>
    <template v-for="inverted in [false, true]" :key="inverted">
      <div v-for="clueGroup in clueGroups" :key="clueGroup.key">
        <h3>{{ inverted ? chineseInvertedPrefix + clueGroup.name : clueGroup.name }}</h3>
        <div class="flex flex-col gap-3">
          <ClueBar
            v-for="clue in clueGroup.clues"
            :key="clue"
            :clue="clue"
            :inverted="inverted"
            :state="props.gameNote.clues[props.color]!.in[clue]"
          ></ClueBar>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { GameNote } from '@/model/gameNote'
import ClueBar from './ClueBar.vue'
import type { Config } from '@/model/config'
import { computed } from 'vue'
import {
  chineseClueGroups,
  clueOneOfTwoTerrainList,
  type ClueGroup,
  clueWithin1List,
  clueWithin2List,
  clueWithin3List,
  type PlayerColor,
  chineseInvertedPrefix,
  type FlattenedClue,
  flattenedClueList,
} from '@/model/constant'
import { NButton } from 'naive-ui'

interface Props {
  color: PlayerColor
  config: Config
  gameNote: GameNote
}

const props = defineProps<Props>()

const clueGroups = computed(() => {
  if (props.config.isAdvancedMode) {
    return chineseClueGroups
  }

  const groups: ClueGroup[] = [
    {
      key: 'ClueOneOfTwoTerrain',
      name: '两种地形之中',
      clues: clueOneOfTwoTerrainList,
    },
    {
      key: 'ClueWithin1',
      name: '地形或动物+1',
      clues: clueWithin1List,
    },
    {
      key: 'ClueWithin2',
      name: '地标或特定动物+2',
      clues: clueWithin2List,
    },
    {
      key: 'ClueWithin3',
      name: '颜色+3',
      clues: clueWithin3List.filter((clue) => clue !== 'WITHIN3BLACK'),
    },
  ]

  return groups
})

const allPossibleClueNamesAtOneSide = computed(() => {
  if (props.config.isAdvancedMode) {
    return flattenedClueList
  }

  return flattenedClueList.filter((clue) => clue !== 'WITHIN3BLACK')
})

const remainedPossibilities = computed<number>(() => {
  let count = 0

  for (const name of allPossibleClueNamesAtOneSide.value) {
    const state = props.gameNote.clues[props.color]!.in[name]
    if (state !== 'excluded' && state !== 'autoExcluded') {
      count++
    }
  }
  if (props.config.isAdvancedMode) {
    for (const name of allPossibleClueNamesAtOneSide.value) {
      const state = props.gameNote.clues[props.color]!.notIn[name]
      if (state !== 'excluded' && state !== 'autoExcluded') {
        count++
      }
    }
  }

  return count
})
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
