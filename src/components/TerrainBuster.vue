<template>
  <div class="terrain-buster">
    <h3>{{ title }}</h3>
    <NCheckboxGroup :value="value" @update:value="handleUpdateValue">
      <NSpace item-style="display: flex;">
        <NCheckbox size="large" value="FORREST" label="森林" />
        <NCheckbox size="large" value="DESERT" label="沙漠" />
        <NCheckbox size="large" value="LAKE" label="海洋" />
        <NCheckbox size="large" value="SWAMP" label="沼泽" />
        <NCheckbox size="large" value="MOUNTAIN" label="山地" />
      </NSpace>
    </NCheckboxGroup>
  </div>
</template>

<script setup lang="ts">
import type { ClueTerrain } from '@/model/constant'
import type { TerrainBusterClue } from '@/model/gameNote'
import { NCheckbox, NCheckboxGroup, NSpace } from 'naive-ui'
import { computed } from 'vue'

interface Props {
  polarity: 'positive' | 'negative'
  terrainBusterClue: TerrainBusterClue
}

const props = defineProps<Props>()

const emit = defineEmits<{
  update: [value: TerrainBusterClue]
}>()

const title = computed<string>(() => {
  if (props.polarity === 'positive') {
    return '地形上有圆片'
  }

  return '地形上有方块'
})

const value = computed<string[]>(() => {
  const result: string[] = []
  for (let [k, v] of Object.entries(props.terrainBusterClue)) {
    if (v) {
      result.push(k as string)
    }
  }

  return result
})

function handleUpdateValue(value: (string | number)[]) {
  const payload: TerrainBusterClue = {
    FORREST: false,
    DESERT: false,
    LAKE: false,
    SWAMP: false,
    MOUNTAIN: false,
  }

  for (const terrain of value) {
    payload[terrain as ClueTerrain] = true
  }

  emit('update', payload)
}
</script>

<style scoped>
h3 {
  font-weight: bold;
  font-size: 2rem;
  margin: 2rem 0 1rem 0;
  text-align: left;
}
</style>

<style>
.terrain-buster .n-checkbox {
  font-size: 20px;
}

.terrain-buster .n-checkbox .n-checkbox-box {
  transform: translateY(-42%);
}
</style>
