<template>
  <NSelect :multiple="props.multiple"></NSelect>
</template>

<script setup lang="ts">
import { PLAYER_COLORS, PlayerColor } from '@/model/constant'
import { NSelect } from 'naive-ui'
import { computed } from 'vue'

interface Props {
  colorScope?: PlayerColor[]
  multiple?: boolean
}

const props = defineProps<Props>()

const options = computed(() => {
  let scope = props.colorScope ?? PLAYER_COLORS
  return scope.map((color) => ({
    label: colorName(color),
    value: color,
  }))
})

function colorName(color: PlayerColor): string {
  switch (color) {
    case PlayerColor.RED:
      return '红'
    case PlayerColor.GREEN:
      return '绿'
    case PlayerColor.BLUE:
      return '蓝'
    case PlayerColor.BROWN:
      return '棕'
    case PlayerColor.PURPLE:
      return '紫'
    default:
      throw new Error('ColorSelect: Unknown color: ' + color)
  }
}
</script>
