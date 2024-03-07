<template>
  <div class="px-4 py-4">
    <h2>18个可能</h2>
    <!-- TODO: 重置全部 按钮 -->
    <div>
      <h3>两种地形之一</h3>
      <div class="flex flex-col gap-3">
        <ClueBar clue="WITHIN1MOUNTAIN" :inverted="false" state="neutral"></ClueBar>
        <ClueBar clue="FORREST_OR_MOUNTAIN" :inverted="true" state="neutral"></ClueBar>
        <ClueBar clue="WITHIN1LAKE" :inverted="false" state="excluded"></ClueBar>
        <ClueBar clue="WITHIN1LAKE" :inverted="false" state="confirmed"></ClueBar>
        <ClueBar clue="WITHIN1LAKE" :inverted="false" state="suspicious"></ClueBar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ClueBar from './ClueBar.vue'
</script>

<style scoped>
h2 {
  font-weight: bold;
  font-size: 2.5rem;
  margin: 2rem 0 1rem 0;
  text-align: left;
}

h3 {
  font-weight: bold;
  font-size: 2rem;
  margin: 1rem 0;
  text-align: left;
}
</style>
