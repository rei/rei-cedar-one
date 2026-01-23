<script setup lang="ts">
import CedarButtonFixture from './components/CedarButtonFixture.vue';
</script>

<template>
  <main class="fixture-app">
    <CedarButtonFixture label="Primary" variant="primary" />
    <CedarButtonFixture label="Secondary" variant="secondary" />
    <CedarButtonFixture
      label="Icon only"
      icon-only
      icon-only-size="medium"
      aria-label="Icon only"
    />
  </main>
</template>

<style scoped>
.fixture-app {
  display: flex;
  gap: 12px;
  padding: 24px;
  align-items: center;
  flex-wrap: wrap;
}
</style>
