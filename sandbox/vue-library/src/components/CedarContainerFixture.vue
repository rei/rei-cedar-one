<template>
  <section class="fixture">
    <h2 class="fixture-title">Container</h2>
    <div
      class="cdr-container cdr-container--static container-panel container-panel--static"
    >
      <div class="container-label">Static container</div>
      <p class="container-copy">Max width + responsive padding for content.</p>
    </div>
    <div
      class="cdr-container cdr-container--fluid container-panel container-panel--fluid"
    >
      <div class="container-label">Fluid container</div>
      <p class="container-copy">Full width with responsive padding.</p>
    </div>
  </section>
</template>

<style scoped>
.fixture {
  display: grid;
  gap: 16px;
}

.fixture-title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 600;
}

.container-panel {
  padding: 12px 0;
  text-align: center;
}

.container-panel--static {
  background: #f7f5f2;
}

.container-panel--fluid {
  background: #edeae3;
}
</style>
