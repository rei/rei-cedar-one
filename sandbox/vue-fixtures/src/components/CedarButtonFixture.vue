<template>
  <section class="fixture">
    <h2 class="fixture-title">Button</h2>
    <section class="fixture-group">
      <h3>Primary</h3>
      <div class="fixture-row">
        <button
          type="button"
          class="cdr-button cdr-button--primary cdr-button--medium"
        >
          Primary
        </button>
      </div>
    </section>

    <section class="fixture-group">
      <h3>With icons</h3>
      <div class="fixture-row">
        <button
          type="button"
          class="cdr-button cdr-button--secondary cdr-button--medium cdr-button--has-icon-left cdr-button--has-icon-right"
        >
          <IconUser />
          With Icons
          <IconUser />
        </button>
      </div>
    </section>

    <section class="fixture-group">
      <h3>All variants</h3>
      <div class="fixture-row">
        <button
          type="button"
          class="cdr-button cdr-button--primary cdr-button--medium"
        >
          Primary
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--secondary cdr-button--medium"
        >
          Secondary
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--dark cdr-button--medium"
        >
          Dark
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--sale cdr-button--medium"
        >
          Sale
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--link cdr-button--medium"
        >
          Link
        </button>
      </div>
    </section>

    <section class="fixture-group">
      <h3>Sizes</h3>
      <div class="fixture-row">
        <button
          type="button"
          class="cdr-button cdr-button--primary cdr-button--small"
        >
          Small
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--primary cdr-button--medium"
        >
          Medium
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--primary cdr-button--large"
        >
          Large
        </button>
      </div>
    </section>

    <section class="fixture-group">
      <h3>Disabled</h3>
      <div class="fixture-row">
        <button
          type="button"
          class="cdr-button cdr-button--primary cdr-button--medium"
          disabled
        >
          Primary
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--secondary cdr-button--medium"
          disabled
        >
          Secondary
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--dark cdr-button--medium"
          disabled
        >
          Dark
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--sale cdr-button--medium"
          disabled
        >
          Sale
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--link cdr-button--medium"
          disabled
        >
          Link
        </button>
      </div>
    </section>

    <section class="fixture-group">
      <h3>Full width</h3>
      <div class="fixture-row fixture-row--stack fixture-row--full">
        <button
          type="button"
          class="cdr-button cdr-button--primary cdr-button--medium cdr-button--full-width"
        >
          Full Width
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--secondary cdr-button--medium cdr-button--full-width"
        >
          Full Width
        </button>
      </div>
    </section>

    <section class="fixture-group">
      <h3>Icon only</h3>
      <div class="fixture-row">
        <button
          type="button"
          class="cdr-button cdr-button--primary cdr-button--icon-only"
          aria-label="Icon only"
        >
          <IconUser />
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--primary cdr-button--icon-only cdr-button--icon-only-large"
          aria-label="Icon only large"
        >
          <IconUser />
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--primary cdr-button--icon-only cdr-button--with-background"
          aria-label="Icon only with background"
        >
          <IconUser />
        </button>
      </div>
    </section>

    <section class="fixture-group">
      <h3>Responsive sizes</h3>
      <div class="fixture-row">
        <button
          type="button"
          class="cdr-button cdr-button--primary cdr-button--small@xs cdr-button--medium@sm cdr-button--large@md"
        >
          Responsive
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--secondary cdr-button--small@xs cdr-button--medium@sm cdr-button--large@md cdr-button--full-width@xs"
        >
          Responsive Full
        </button>
      </div>
    </section>

    <section class="fixture-group">
      <h3>Size variant matrix</h3>
      <div class="fixture-row fixture-row--matrix">
        <button
          type="button"
          class="cdr-button cdr-button--primary cdr-button--small"
        >
          primary / small
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--secondary cdr-button--small"
        >
          secondary / small
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--dark cdr-button--small"
        >
          dark / small
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--sale cdr-button--small"
        >
          sale / small
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--link cdr-button--small"
        >
          link / small
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--primary cdr-button--medium"
        >
          primary / medium
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--secondary cdr-button--medium"
        >
          secondary / medium
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--dark cdr-button--medium"
        >
          dark / medium
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--sale cdr-button--medium"
        >
          sale / medium
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--link cdr-button--medium"
        >
          link / medium
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--primary cdr-button--large"
        >
          primary / large
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--secondary cdr-button--large"
        >
          secondary / large
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--dark cdr-button--large"
        >
          dark / large
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--sale cdr-button--large"
        >
          sale / large
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--link cdr-button--large"
        >
          link / large
        </button>
      </div>
    </section>

    <section class="fixture-group">
      <h3>Icon combos</h3>
      <div class="fixture-row">
        <button
          type="button"
          class="cdr-button cdr-button--primary cdr-button--small cdr-button--has-icon-left"
        >
          <IconUser />
          Left
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--primary cdr-button--small cdr-button--has-icon-right"
        >
          Right
          <IconUser />
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--primary cdr-button--small cdr-button--has-icon-left cdr-button--has-icon-right"
        >
          <IconUser />
          Both
          <IconUser />
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--secondary cdr-button--medium cdr-button--has-icon-left"
        >
          <IconUser />
          Left
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--secondary cdr-button--medium cdr-button--has-icon-right"
        >
          Right
          <IconUser />
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--secondary cdr-button--medium cdr-button--has-icon-left cdr-button--has-icon-right"
        >
          <IconUser />
          Both
          <IconUser />
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--dark cdr-button--large cdr-button--has-icon-left"
        >
          <IconUser />
          Left
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--dark cdr-button--large cdr-button--has-icon-right"
        >
          Right
          <IconUser />
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--dark cdr-button--large cdr-button--has-icon-left cdr-button--has-icon-right"
        >
          <IconUser />
          Both
          <IconUser />
        </button>
      </div>
    </section>

    <section class="fixture-group">
      <h3>Dark background</h3>
      <div class="fixture-row fixture-row--dark">
        <button
          type="button"
          class="cdr-button cdr-button--primary cdr-button--medium"
        >
          Primary
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--secondary cdr-button--medium"
        >
          Secondary
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--dark cdr-button--medium"
        >
          Dark
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--sale cdr-button--medium"
        >
          Sale
        </button>
        <button
          type="button"
          class="cdr-button cdr-button--link cdr-button--medium"
        >
          Link
        </button>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import IconUser from './IconUser.vue';
</script>

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

.fixture-row--stack {
  flex-direction: column;
}

.fixture-row--full {
  display: grid;
  gap: 12px;
  max-width: 320px;
}

.fixture-row--matrix {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;
  justify-items: start;
}

.fixture-row--dark {
  background: #2e2e2b;
  padding: 16px;
}
</style>
