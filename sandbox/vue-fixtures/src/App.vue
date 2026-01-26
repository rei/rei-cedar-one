<script setup lang="ts">
import CedarButtonFixture from './components/CedarButtonFixture.vue';
import CedarContainerFixture from './components/CedarContainerFixture.vue';
import CedarLinkFixture from './components/CedarLinkFixture.vue';
</script>

<template>
  <main class="fixture-app">
    <CedarContainerFixture />
    <CedarLinkFixture />
    <CedarButtonFixture />
  </main>
</template>

<style scoped>
.fixture-app {
  display: grid;
  gap: 24px;
  padding: 32px 16px 48px;
  margin: 0 auto;
}
</style>
