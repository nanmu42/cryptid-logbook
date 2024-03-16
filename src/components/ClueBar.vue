<template>
  <div class="flex justify-between items-center">
    <p class="text-xl">{{ text }}</p>
    <div class="pr-4 flex items-center">
      <NButton secondary circle :type="secondaryButtonType" @click="handleFlag">
        <template #icon>
          <NIcon v-if="props.state === 'confirmed'"><CheckCircle /></NIcon>
          <NIcon v-else-if="props.state === 'suspicious'"><QuestionCircle /></NIcon>
          <NIcon v-else><FlagRegular /></NIcon>
        </template>
      </NButton>
      <div class="ml-6">
        <NButton secondary size="large" @click="handleDecide">
          <template #icon>
            <NIcon v-if="props.state === 'excluded' || props.state === 'autoExcluded'">
              <PlusCircle />
            </NIcon>
            <NIcon v-else><MinusCircle /></NIcon>
          </template>
        </NButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import { FlagRegular, CheckCircle, QuestionCircle, MinusCircle, PlusCircle } from '@vicons/fa'
import {
  getChineseClueName,
  type Clue,
  type PlayerColor,
  type FlattenedClue,
} from '@/model/constant'
import type { ClueState } from '@/model/gameNote'
import { computed } from 'vue'
import { eventBus } from '@/model/eventBus'

interface Props {
  clue: FlattenedClue
  inverted: boolean
  state: ClueState
  playerColor: PlayerColor
}

const props = defineProps<Props>()

const text = computed<string>(() => {
  return getChineseClueName(props.clue, props.inverted)
})

const secondaryButtonType = computed<'success' | 'warning' | undefined>(() => {
  switch (props.state) {
    case 'confirmed':
      return 'success'
    case 'suspicious':
      return 'warning'
    default:
      return undefined
  }
})

function nextFlagState(old: ClueState): ClueState {
  switch (old) {
    case 'excluded':
      return 'neutral'
    case 'autoExcluded':
      return 'loose'
    case 'suspicious':
      return 'confirmed'
    case 'confirmed':
      return 'neutral'
    default:
      return 'suspicious'
  }
}

function handleFlag() {
  eventBus.emit('clueStateChanged', {
    playerColor: props.playerColor,
    inverted: props.inverted,
    clue: props.clue,
    fromState: props.state,
    toState: nextFlagState(props.state),
  })
}

function nextDecideState(old: ClueState): ClueState {
  switch (old) {
    case 'excluded':
      return 'neutral'
    case 'autoExcluded':
      return 'loose'
    default:
      return 'excluded'
  }
}

function handleDecide() {
  eventBus.emit('clueStateChanged', {
    playerColor: props.playerColor,
    inverted: props.inverted,
    clue: props.clue,
    fromState: props.state,
    toState: nextDecideState(props.state),
  })
}
</script>

<style scoped></style>
