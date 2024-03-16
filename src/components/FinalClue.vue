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
      <p class="text-xl">{{ props.remainedPossibilities }}个可能</p>
      <div class="mt-8 flex flex-wrap gap-2 items-center justify-start">
        <ClueTag
          v-for="clue in remainedRivalClues"
          :key="clue.key"
          :clue="clue.clue"
          :inverted="clue.inverted"
          :state="clue.state"
        ></ClueTag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Config, PlayerClue } from '@/model/config'
import type { FlattenedClue, PlayerColor } from '@/model/constant'
import { flattenedClueList, getChineseClueName, getColorHex } from '@/model/constant'
import { isClueStateGood, type ClueState, type RivalClues } from '@/model/gameNote'
import { computed, ref } from 'vue'
import ClueTag from './ClueTag.vue'

interface Props {
  color: PlayerColor
  config: Config
  rivalClues?: RivalClues
  remainedPossibilities?: number
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

interface ComputedRivalClue {
  key: string // for Vue
  clue: FlattenedClue
  inverted: boolean
  state: ClueState
}

const remainedRivalClues = computed<ComputedRivalClue[]>(() => {
  if (!props.rivalClues) {
    return []
  }

  const NOT_PREFIX = 'NOT_'
  const remained: ComputedRivalClue[] = []

  for (const [k, v] of Object.entries(props.rivalClues.in)) {
    if (!props.config.isAdvancedMode && k === 'WITHIN3BLACK') {
      continue
    }
    if (isClueStateGood(v)) {
      const computed: ComputedRivalClue = {
        key: k,
        clue: k as FlattenedClue,
        inverted: false,
        state: v,
      }
      remained.push(computed)
    }
  }

  if (props.config.isAdvancedMode) {
    for (const [k, v] of Object.entries(props.rivalClues.notIn)) {
      if (isClueStateGood(v)) {
        const computed: ComputedRivalClue = {
          key: NOT_PREFIX + k,
          clue: k as FlattenedClue,
          inverted: true,
          state: v,
        }
        remained.push(computed)
      }
    }
  }

  remained.sort((a, b) => {
    if (a.state !== b.state) {
      if (a.state === 'confirmed') {
        return -1
      }
      if (b.state === 'confirmed') {
        return 1
      }
      if (a.state === 'suspicious') {
        return -1
      }
      if (b.state === 'suspicious') {
        return 1
      }
    }

    const aIsNot = a.key.startsWith(NOT_PREFIX)
    const bIsNot = b.key.startsWith(NOT_PREFIX)
    if (aIsNot && !bIsNot) {
      return 1
    }
    if (!aIsNot && bIsNot) {
      return -1
    }

    const aKey = aIsNot ? a.key.slice(NOT_PREFIX.length) : a.key
    const bKey = bIsNot ? b.key.slice(NOT_PREFIX.length) : b.key

    return (
      flattenedClueList.indexOf(aKey as FlattenedClue) -
      flattenedClueList.indexOf(bKey as FlattenedClue)
    )
  })

  return remained
})
</script>

<style scoped></style>
