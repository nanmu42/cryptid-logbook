<template>
  <NModal v-model:show="show" preset="card" title="分享这个工具">
    <div class="grid grid-cols-1 place-content-center gap-3">
      <p>复制链接后发送：</p>
      <NInputGroup>
        <NInput :value="hostURL" />
        <NButton type="primary" ghost @click="handleCopyURL"> 复制 </NButton>
      </NInputGroup>
      <hr />
      <p>让朋友直接扫码也可以：</p>
      <NQrCode class="m-auto" :value="hostURL" :size="240"></NQrCode>
    </div>
  </NModal>
</template>

<script setup lang="ts">
import { NButton, NModal, NInputGroup, NInput, NQrCode, useMessage } from 'naive-ui'

const notify = useMessage()

const show = defineModel<boolean>('show')

const hostURL = `${window.location.protocol}//${window.location.host}`

function handleCopyURL() {
  void navigator.clipboard.writeText(hostURL)
  notify.info('复制成功')
}
</script>
