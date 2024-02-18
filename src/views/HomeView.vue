<template>
  <main class="p-4">
    <h2>Cryptid桌游小抄</h2>
    <NForm label-placement="top" :model="config">
      <div class="grid place-content-end mb-2">
        <NButton size="small" @click="resetConfig">清空重填</NButton>
      </div>
      <NFormItem label="游戏规则" path="isTwoPlayerMode">
        <NRadioGroup v-model:value="config.isTwoPlayerMode">
          <NRadioButton :value="false">一般多人</NRadioButton>
          <NRadioButton :value="true">特殊双人</NRadioButton>
        </NRadioGroup>
      </NFormItem>
      <NFormItem label="反向线索" path="isAdvancedMode">
        <NRadioGroup v-model:value="config.isAdvancedMode">
          <NRadioButton :value="false">无</NRadioButton>
          <NRadioButton :value="true">有</NRadioButton>
        </NRadioGroup>
      </NFormItem>
      <div v-if="!config.isTwoPlayerMode">
        <NFormItem label="你的颜色">
          <ColorSelect v-model:value="config.playerColor1"></ColorSelect>
        </NFormItem>
        <NFormItem label="你的线索">
          <FlattenedClueSelect
            :player-clue="config.playerClue1"
            :has-advanced-clue="config.isAdvancedMode"
            @update="handlePlayerClue1Update"
          ></FlattenedClueSelect>
        </NFormItem>
      </div>
      <div v-else>
        <NFormItem label="你的第一个颜色">
          <ColorSelect v-model:value="config.playerColor1"></ColorSelect>
        </NFormItem>
        <NFormItem label="你的第一条线索">
          <FlattenedClueSelect
            :player-clue="config.playerClue1"
            :has-advanced-clue="config.isAdvancedMode"
            @update="handlePlayerClue1Update"
          ></FlattenedClueSelect>
        </NFormItem>
        <NFormItem label="你的第二个颜色">
          <ColorSelect
            v-model:value="config.playerColor2"
            :disabled-colors="player2DisabledColors"
          ></ColorSelect>
        </NFormItem>
        <NFormItem label="你的第二条线索">
          <FlattenedClueSelect
            :player-clue="config.playerClue2"
            :has-advanced-clue="config.isAdvancedMode"
            @update="handlePlayerClue2Update"
          ></FlattenedClueSelect>
        </NFormItem>
      </div>
      <NFormItem label="对手颜色" path="rivalColors">
        <ColorSelect
          v-model:value="config.rivalColors"
          :multiple="true"
          :disabled-colors="rivalDisabledColors"
        ></ColorSelect>
      </NFormItem>
      <NFormItem label="智能小抄总开关" path="shortcuts.globalSwitch">
        <div class="grid grid-cols-1 gap-4">
          <NRadioGroup v-model:value="config.shortcuts.globalSwitch">
            <NRadioButton :value="false">关</NRadioButton>
            <NRadioButton :value="true">开</NRadioButton>
          </NRadioGroup>
          <NCollapse>
            <NCollapseItem title="详细设置">
              <NFormItem label="剔除己方条件" path="shortcuts.excludePlayerClues">
                <NRadioGroup v-model:value="config.shortcuts.excludePlayerClues">
                  <NRadioButton :value="false">关</NRadioButton>
                  <NRadioButton :value="true">开</NRadioButton>
                </NRadioGroup>
              </NFormItem>
              <NFormItem label="快捷排除地形" path="shortcuts.terrainBuster">
                <NRadioGroup v-model:value="config.shortcuts.terrainBuster">
                  <NRadioButton :value="false">关</NRadioButton>
                  <NRadioButton :value="true">开</NRadioButton>
                </NRadioGroup>
              </NFormItem>
            </NCollapseItem>
          </NCollapse>
        </div>
      </NFormItem>
      <div class="grid place-content-center m-4">
        <NButton type="primary" size="large" @click="handleSubmit">
          <template #icon>
            <NIcon>
              <EmojiLaugh24Regular />
            </NIcon>
          </template>
          来吧，开始！
        </NButton>
      </div>
    </NForm>
  </main>
</template>

<script setup lang="ts">
import {
  NForm,
  NRadioGroup,
  NFormItem,
  NRadioButton,
  NButton,
  NCollapse,
  NCollapseItem,
  NIcon,
  useMessage,
} from 'naive-ui'
import {
  generateDefaultConfig,
  type Config,
  type PlayerClue,
  checkAndCleanConfig,
} from '@/model/config'
import { computed, ref, type Ref } from 'vue'
import { EmojiLaugh24Regular } from '@vicons/fluent'
import ColorSelect from '@/components/ColorSelect.vue'
import FlattenedClueSelect from '@/components/FlattenedClueSelect.vue'
import type { PlayerColor } from '@/model/constant'
// TODO: 分享这个页面：显示二维码

const notify = useMessage()

const config: Ref<Config> = ref(generateDefaultConfig())

function resetConfig() {
  config.value = generateDefaultConfig()
}

function handlePlayerClue1Update(value: PlayerClue | null) {
  config.value.playerClue1 = value
}

function handlePlayerClue2Update(value: PlayerClue | null) {
  config.value.playerClue2 = value
}

const player2DisabledColors = computed<PlayerColor[]>(() => {
  const disabled: PlayerColor[] = []

  if (config.value.playerColor1) {
    disabled.push(config.value.playerColor1)
  }

  return disabled
})

const rivalDisabledColors = computed<PlayerColor[]>(() => {
  const disabled: PlayerColor[] = []

  if (config.value.playerColor1) {
    disabled.push(config.value.playerColor1)
  }
  if (config.value.isTwoPlayerMode && config.value.playerColor2) {
    disabled.push(config.value.playerColor2)
  }

  return disabled
})

function handleSubmit() {
  try {
    checkAndCleanConfig(config.value)
  } catch (err: Error | any) {
    notify.error(err.message, {
      closable: true,
      duration: 5000,
    })
  }
}
</script>
