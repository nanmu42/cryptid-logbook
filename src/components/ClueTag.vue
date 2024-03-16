<template>
  <NTag size="large" class="clue-tag">
    {{ text }}
    <template #icon v-if="props.state === 'confirmed' || props.state === 'suspicious'">
      <NIcon size="medium" :component="icon" />
    </template>
  </NTag>
</template>

<script setup lang="ts">
import { type Clue, getChineseClueName } from '@/model/constant'
import type { ClueState } from '@/model/gameNote'
import { NIcon, NTag } from 'naive-ui'
import { computed, type Component } from 'vue'
import { CheckCircle, QuestionCircle } from '@vicons/fa'

interface Props {
  clue: Clue
  inverted: boolean
  state: ClueState
}

const props = defineProps<Props>()

const text = computed<string>(() => {
  return getChineseClueName(props.clue, props.inverted)
})

const icon = computed<Component | undefined>(() => {
  switch (props.state) {
    case 'confirmed':
      return CheckCircle
    case 'suspicious':
      return QuestionCircle
    default:
      return undefined
  }
})
</script>

<style>
.clue-tag .n-tag__content {
  font-size: 16px;
}
</style>
