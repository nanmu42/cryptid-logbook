<template>
  <NTag size="large">
    {{ text }}
  </NTag>
</template>

<script setup lang="ts">
import {
  clueTerrainList,
  type Clue,
  type ClueTerrain,
  clueOneOfTwoTerrainList,
  type ClueOneOfTwoTerrain,
  clueWithin1List,
  type ClueWithin1,
  clueWithin2List,
  type ClueWithin2,
  getChineseClueName,
} from '@/model/constant'
import type { ClueState } from '@/model/gameNote'
import { NTag } from 'naive-ui'
import { computed } from 'vue'

interface Props {
  clue: Clue
  inverted: boolean
  state: ClueState
}

const props = defineProps<Props>()

const tagType = computed<'success' | 'warning' | 'error' | 'info' | undefined>(() => {
  if (clueTerrainList.includes(props.clue as ClueTerrain)) {
    return 'success'
  }
  if (clueOneOfTwoTerrainList.includes(props.clue as ClueOneOfTwoTerrain)) {
    return 'warning'
  }
  if (clueWithin1List.includes(props.clue as ClueWithin1)) {
    return 'error'
  }
  if (clueWithin2List.includes(props.clue as ClueWithin2)) {
    return 'info'
  }

  return undefined
})

const text = computed<string>(() => {
  return getChineseClueName(props.clue, props.inverted)
})
</script>
