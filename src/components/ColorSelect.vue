<template>
  <NSelect
    :multiple="props.multiple"
    :options="options"
    :render-label="renderLabel"
    :render-tag="renderTag"
    v-model:value="model"
  ></NSelect>
</template>

<script setup lang="ts">
import { PLAYER_COLORS, PlayerColor, getChineseColorName, getColorHex } from '@/model/constant'
import { NAvatar, NSelect, NTag, type SelectRenderLabel, type SelectRenderTag } from 'naive-ui'
import { computed, h } from 'vue'

interface Props {
  colorScope?: PlayerColor[]
  multiple?: boolean
}

const props = defineProps<Props>()

const model = defineModel<PlayerColor | PlayerColor[]>('value')

const options = computed(() => {
  const scope = props.colorScope ?? PLAYER_COLORS
  return scope.map((color) => ({
    label: getChineseColorName(color),
    value: color,
  }))
})

const renderLabel: SelectRenderLabel = (option) => {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    [
      h(NAvatar, {
        color: getColorHex(option.value as PlayerColor),
        round: true,
        size: 'small',
      }),
      h(
        'div',
        {
          style: {
            marginLeft: '12px',
            padding: '4px 0',
          },
        },
        [h('div', null, [option.label as string])],
      ),
    ],
  )
}

const renderTag: SelectRenderTag = ({ option, handleClose }) => {
  return h(
    NTag,
    {
      style: {
        margin: '1px 0 0 0',
        padding: '0 0.8rem 0 0.6rem',
      },
      round: true,
      closable: props.multiple,
      onClose: (e) => {
        e.stopPropagation()
        handleClose()
      },
    },
    {
      default: () =>
        h(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center',
            },
          },
          [
            h(NAvatar, {
              color: getColorHex(option.value as PlayerColor),
              round: true,
              size: 22,
              style: {
                marginRight: '4px',
              },
            }),
            option.label as string,
          ],
        ),
    },
  )
}
</script>
