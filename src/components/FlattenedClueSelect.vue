<template>
  <NSelect :options="options" @update:value="handleUpdateValue" :value="selected"></NSelect>
</template>

<script setup lang="ts">
import type { PlayerClue } from '@/model/config'
import {
  getChineseClueGroups,
  type Clue,
  getChineseClueName,
  chineseInvertedPrefix,
  type FlattenedClue,
} from '@/model/constant'
import { NSelect, type SelectGroupOption, type SelectOption } from 'naive-ui'
import { computed, watch } from 'vue'

interface Props {
  playerClue: PlayerClue | null
  clueFilter?: (clue: Clue, inverted: boolean) => boolean
  hasAdvancedClue?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  update: [value: PlayerClue | null]
}>()

const INVERTED_PREFIX = 'NOT_'

const options = computed<Array<SelectGroupOption>>(() => {
  let groups = getChineseClueGroups(false)

  const options: SelectGroupOption[] = []

  for (const inverted of [false, true]) {
    if (!props.hasAdvancedClue && inverted) {
      continue
    }

    for (const group of groups) {
      const children: SelectOption[] = []
      for (const clue of group.clues) {
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
  if (!props.playerClue) {
    return null
  }

  if (props.playerClue.inverted) {
    return INVERTED_PREFIX + props.playerClue.clue
  }

  return props.playerClue.clue
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
    emit('update', null)
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
  emit('update', clue)
}
</script>
