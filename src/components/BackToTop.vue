<template>
  <NAffix class="center-me" :bottom="45">
    <NButton size="large" circle color="#ccc" @click="handleClick">
      <template #icon>
        <NIcon :component="CaretUp"> </NIcon>
      </template>
    </NButton>
  </NAffix>
</template>

<script setup lang="ts">
import { NAffix, NButton, NIcon } from 'naive-ui'
import { CaretUp } from '@vicons/fa'

interface Props {
  target: HTMLElement | undefined
}

const props = defineProps<Props>()

function handleClick() {
  if (props.target) {
    props.target.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.center-me {
  right: calc(50% - 20px);
}
</style>
