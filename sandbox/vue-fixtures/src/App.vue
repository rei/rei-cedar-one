<script setup lang="ts">
import CedarButtonFixture from './components/CedarButtonFixture.vue';
import VueLogo from './assets/vue.svg';
</script>

<template>
  <main class="fixture-app">
    <img class="fixture-logo" :src="VueLogo" alt="Vue logo" />
    <CedarButtonFixture />
  </main>
</template>

<style scoped>
.fixture-app {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 100vh;
  padding: 32px;
  align-items: center;
  justify-content: center;
}

.fixture-logo {
  width: 96px;
  height: 96px;
}
</style>
