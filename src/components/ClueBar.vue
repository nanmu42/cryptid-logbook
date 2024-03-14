<template>
  <div class="flex justify-between items-center">
    <p class="text-xl">{{ text }}</p>
    <div class="pr-4 flex items-center">
      <NButton secondary circle :type="secondaryButtonType">
        <template #icon>
          <NIcon v-if="props.state === 'confirmed'"><CheckCircle /></NIcon>
          <NIcon v-else-if="props.state === 'suspicious'"><QuestionCircle /></NIcon>
          <NIcon v-else><FlagRegular /></NIcon>
        </template>
      </NButton>
      <div class="ml-6">
        <NButton secondary size="large">
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
import { getChineseClueName, type Clue } from '@/model/constant'
import type { ClueState } from '@/model/gameNote'
import { computed } from 'vue'

interface Props {
  clue: Clue
  inverted: boolean
  state: ClueState
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
</script>

<style scoped></style>
