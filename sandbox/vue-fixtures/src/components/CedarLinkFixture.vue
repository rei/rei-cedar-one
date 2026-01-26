<template>
  <section class="fixture">
    <h2 class="fixture-title">Link</h2>

    <section class="fixture-group">
      <h3>Base</h3>
      <div class="fixture-row">
        <a class="cdr-link" href="#link">Default link</a>
        <button type="button" class="cdr-link">Button link</button>
      </div>
    </section>

    <section class="fixture-group">
      <h3>Modifiers</h3>
      <div class="fixture-row">
        <a class="cdr-link cdr-link--standalone" href="#link">Standalone</a>
        <a class="cdr-link cdr-link--neutral" href="#link">Neutral</a>
        <a class="cdr-link cdr-link--standalone cdr-link--neutral" href="#link">
          Standalone neutral
        </a>
      </div>
      <div class="fixture-row link-inherit">
        <a class="cdr-link cdr-link--inherit-color" href="#link"
          >Inherit color</a
        >
      </div>
    </section>
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

.fixture-group h3 {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
}

.fixture-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.link-inherit {
  color: #1f513f;
}
</style>
