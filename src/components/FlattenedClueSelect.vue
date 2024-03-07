<template>
  <NSelect :options="options" @update:value="handleUpdateValue" :value="selected"></NSelect>
</template>

<script setup lang="ts">
import type { PlayerClue } from '@/model/config'
import {
  type Clue,
  getChineseClueName,
  chineseInvertedPrefix,
  type FlattenedClue,
  chineseClueGroups,
} from '@/model/constant'
import { NSelect, selectProps, type SelectGroupOption, type SelectOption } from 'naive-ui'
import { computed, watch } from 'vue'

interface Props {
  clueFilter?: (clue: Clue, inverted: boolean) => boolean
  hasAdvancedClue?: boolean
}

const model = defineModel<PlayerClue | null>('value', { required: true })

const props = defineProps<Props>()

const emit = defineEmits<{
  update: [value: PlayerClue | null]
}>()

const INVERTED_PREFIX = 'NOT_'

const options = computed<Array<SelectGroupOption>>(() => {
  const options: SelectGroupOption[] = []

  for (const inverted of [false, true]) {
    if (!props.hasAdvancedClue && inverted) {
      continue
    }

    for (const group of chineseClueGroups) {
      const children: SelectOption[] = []
      for (const clue of group.clues) {
        if (!props.hasAdvancedClue && clue === 'WITHIN3BLACK') {
          continue
        }
        if (props.clueFilter && !props.clueFilter(clue, inverted)) {
          continue
        }

        children.push({
          label: getChineseClueName(clue, inverted),
          value: inverted ? INVERTED_PREFIX + clue : clue,
        })
      }

      if (children.length === 0) {
        continue
      }

      options.push({
        type: 'group',
        key: inverted ? INVERTED_PREFIX + group.key : group.key,
        label: inverted ? chineseInvertedPrefix + group.name : group.name,
        children: children,
      })
    }
  }

  return options
})

const selected = computed<string | null>(() => {
  if (!model.value) {
    return null
  }

  if (model.value.inverted) {
    return INVERTED_PREFIX + model.value.clue
  }

  return model.value.clue
})

watch(
  options,
  () => {
    const selectedIndex = options.value.findIndex((group) => {
      const optIndex = group.children?.findIndex((option) => {
        return option.value === selected.value
      })
      return optIndex && optIndex >= 0
    })

    if (selectedIndex === -1) {
      handleUpdateValue(null)
    }
  },
  {
    deep: true,
    immediate: true,
  },
)

function handleUpdateValue(value: string | null) {
  if (!value) {
    model.value = null
    return
  }

  const inverted = value.startsWith(INVERTED_PREFIX)
  if (inverted) {
    value = value.slice(INVERTED_PREFIX.length)
  }

  const clue: PlayerClue = {
    clue: value as FlattenedClue,
    inverted: inverted,
  }
  model.value = clue
}
</script>
