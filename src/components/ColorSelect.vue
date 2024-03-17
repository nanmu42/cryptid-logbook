<template>
  <NSelect
    :multiple="props.multiple"
    :options="options"
    :render-label="renderLabel"
    :render-tag="renderTag"
    v-model:value="model"
    clearable
  ></NSelect>
</template>

<script setup lang="ts">
import { PLAYER_COLORS, type PlayerColor, getChineseColorName, getColorHex } from '@/model/constant'
import { NAvatar, NSelect, NTag, type SelectRenderLabel, type SelectRenderTag } from 'naive-ui'
import { computed, h, watch } from 'vue'

interface Props {
  disabledColors?: PlayerColor[]
  multiple?: boolean
}

const props = defineProps<Props>()

const model = defineModel<null | PlayerColor | PlayerColor[]>('value')

const options = computed(() => {
  let scope = PLAYER_COLORS as unknown as PlayerColor[]
  if (props.disabledColors) {
    scope = scope.filter((color) => !props.disabledColors!.includes(color))
  }

  return scope.map((color) => ({
    label: getChineseColorName(color),
    value: color,
  }))
})

watch(
  options,
  () => {
    if (!props.multiple) {
      const selectedIndex = options.value.findIndex((option) => option.value === model.value)
      if (selectedIndex === -1) {
        model.value = null
      }

      return
    }

    if (!model.value || model.value.length === 0) {
      return
    }
    const validChoices: PlayerColor[] = []
    for (const choice of model.value as PlayerColor[]) {
      if (options.value.some((option) => option.value === choice)) {
        validChoices.push(choice)
      }
    }

    if (validChoices.length !== model.value.length) {
      model.value = validChoices
    }
  },
  { deep: true, immediate: true },
)

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
