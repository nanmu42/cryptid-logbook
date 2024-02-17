<template>
  <main>
    <h2>准备开始</h2>
    <NForm label-placement="top" :model="config">
      <NFormItem label="游戏规则" v-model:value="config.isTwoPlayerMode">
        <NRadioGroup>
          <NRadioButton :value="false">一般多人</NRadioButton>
          <NRadioButton :value="true">特殊双人</NRadioButton>
        </NRadioGroup>
      </NFormItem>
      <div>
        <NFormItem label="你的颜色"> </NFormItem>
      </div>
    </NForm>
  </main>
</template>

<script setup lang="ts">
import { NForm, NRadioGroup, NFormItem, NRadioButton } from 'naive-ui'
import { type Config } from '@/model/config'
import { ref, type Ref } from 'vue'
// TODO: 分享这个页面：显示二维码

const config: Ref<Config> = ref({
  isTwoPlayerMode: false,
  playerColor1: undefined,
  playerClue1: undefined,
  playerColor2: undefined,
  playerClue2: undefined,
  RivalColors: [],
  isAdvancedMode: false,
})
</script>
