<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NConfigProvider, NMessageProvider, NGlobalStyle, zhCN, dateZhCN } from 'naive-ui'
import { darkTheme } from 'naive-ui'
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" :theme="darkTheme">
    <NMessageProvider>
      <RouterView />
    </NMessageProvider>
    <NGlobalStyle />
  </NConfigProvider>
</template>

<style scoped></style>
