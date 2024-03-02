<template>
  <NPopselect
    :options="popSelectOptions"
    @update:value="handlePopSelectUpdateValue"
    trigger="manual"
    :show="showPopSelect"
  >
    <NTag
      class="close-icon-container"
      :type="tagType"
      :closable="!props.readonly"
      size="large"
      :bordered="false"
      @close="handleClose"
    >
      {{ text }}
      <template #icon>
        <NIcon size="small" :component="iconType" @click="handleIconClicked" />
      </template>
    </NTag>
  </NPopselect>
</template>

<script setup lang="ts">
import {
  clueTerrainList,
  type Clue,
  type ClueTerrain,
  clueOneOfTwoTerrainList,
  type ClueOneOfTwoTerrain,
  clueWithin1List,
  type ClueWithin1,
  clueWithin2List,
  type ClueWithin2,
  getChineseClueName,
} from '@/model/constant'
import type { ClueState } from '@/model/gameNote'
import { NIcon, NTag, NPopselect, type SelectOption } from 'naive-ui'
import { computed, ref } from 'vue'
import { CheckCircle, QuestionCircle, CircleRegular } from '@vicons/fa'

interface Props {
  clue: Clue
  inverted: boolean
  state: ClueState
  readonly?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  change: [clue: Clue, inverted: boolean, state: ClueState, oldState: ClueState]
}>()

const tagType = computed<'success' | 'warning' | 'error' | 'info' | undefined>(() => {
  if (clueTerrainList.includes(props.clue as ClueTerrain)) {
    return 'success'
  }
  if (clueOneOfTwoTerrainList.includes(props.clue as ClueOneOfTwoTerrain)) {
    return 'warning'
  }
  if (clueWithin1List.includes(props.clue as ClueWithin1)) {
    return 'error'
  }
  if (clueWithin2List.includes(props.clue as ClueWithin2)) {
    return 'info'
  }

  return undefined
})

const text = computed<string>(() => {
  return getChineseClueName(props.clue, props.inverted)
})

function handleClose() {
  let newState: ClueState
  switch (props.state) {
    case 'excluded':
    case 'autoExcluded':
      newState = 'loose'
      break
    default:
      newState = 'excluded'
  }

  emit('change', props.clue, props.inverted, newState, props.state)
}

const iconType = computed(() => {
  switch (props.state) {
    case 'suspicious':
      return QuestionCircle
    case 'confirmed':
      return CheckCircle
    default:
      return CircleRegular
  }
})

const showPopSelect = ref(false)

function handleIconClicked() {
  if (props.readonly) {
    return
  }

  showPopSelect.value = !showPopSelect.value
}

const popSelectOptions: Array<SelectOption> = [
  {
    label: '标记为确认',
    value: 'confirmed',
  },
  {
    label: '标记为可疑',
    value: 'suspicious',
  },
  {
    label: '取消',
    value: '',
  },
]

function handlePopSelectUpdateValue(value: 'confirmed' | 'suspicious' | '') {
  if (value === '' || props.state === value) {
    showPopSelect.value = false
    return
  }

  emit('change', props.clue, props.inverted, value, props.state)
  showPopSelect.value = false
}
</script>
