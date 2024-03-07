<template>
  <div class="flex justify-between items-center">
    <p class="text-xl">{{ text }}</p>
    <div class="pr-4 flex gap-3 items-center">
      <NButton secondary circle :type="props.state === 'confirmed' ? 'success' : undefined">
        <template #icon>
          <NIcon><CheckCircle /></NIcon>
        </template>
      </NButton>
      <NButton secondary circle :type="props.state === 'suspicious' ? 'warning' : undefined">
        <template #icon>
          <NIcon><QuestionCircle /></NIcon>
        </template>
      </NButton>
      <div class="ml-3">
        <NButton secondary size="large">
          <template #icon>
            <!-- TODO: use add icon when in need -->
            <NIcon><MinusCircle /></NIcon>
          </template>
        </NButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import { CheckCircle, QuestionCircle, MinusCircle } from '@vicons/fa'
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
</script>
