<script setup lang="ts">
type TextSection =
  | 'base'
  | 'defaults'
  | 'heading-display'
  | 'heading-sans'
  | 'heading-serif'
  | 'subheading-sans'
  | 'body'
  | 'utility-sans'
  | 'utility-serif'
  | 'all';

const props = withDefaults(defineProps<{ section?: TextSection }>(), {
  section: 'all',
});

const show = (section: TextSection) =>
  props.section === 'all' || props.section === section;
</script>

<template>
  <section class="fixture">
    <h2 class="fixture-title">Text</h2>

    <section v-if="show('base')" class="fixture-group">
      <h3>Base</h3>
      <div class="fixture-stack">
        <p class="cdr-text">Base text uses the cdr-text class.</p>
      </div>
    </section>

    <section v-if="show('defaults')" class="fixture-group">
      <h3>Preset defaults</h3>
      <div class="fixture-stack">
        <h1 class="cdr-heading-display">Heading Display</h1>
        <h2 class="cdr-heading-sans">Heading Sans</h2>
        <h1 class="cdr-heading-serif">Heading Serif</h1>
        <p class="cdr-subheading-sans">Subheading Sans</p>
        <p class="cdr-body">Body text</p>
        <span class="cdr-eyebrow">Eyebrow</span>
        <p class="cdr-utility-sans">Utility Sans</p>
        <p class="cdr-utility-serif">Utility Serif</p>
      </div>
    </section>

    <section v-if="show('heading-display')" class="fixture-group">
      <h3>Heading Display scales</h3>
      <div class="fixture-stack">
        <h1 class="cdr-heading-display cdr-heading-display--scale-6">
          Heading Display scale 6
        </h1>
        <h1 class="cdr-heading-display cdr-heading-display--scale-5">
          Heading Display scale 5
        </h1>
        <h1 class="cdr-heading-display cdr-heading-display--scale-4">
          Heading Display scale 4
        </h1>
        <h1 class="cdr-heading-display cdr-heading-display--scale-3">
          Heading Display scale 3
        </h1>
        <h1 class="cdr-heading-display cdr-heading-display--scale-2">
          Heading Display scale 2
        </h1>
      </div>
    </section>

    <section v-if="show('heading-sans')" class="fixture-group">
      <h3>Heading Sans scales</h3>
      <div class="fixture-stack">
        <h2 class="cdr-heading-sans cdr-heading-sans--scale-3">
          Heading Sans scale 3
        </h2>
        <h2 class="cdr-heading-sans cdr-heading-sans--scale-2">
          Heading Sans scale 2
        </h2>
        <h2 class="cdr-heading-sans cdr-heading-sans--scale-1">
          Heading Sans scale 1
        </h2>
      </div>
    </section>

    <section v-if="show('heading-serif')" class="fixture-group">
      <h3>Heading Serif scales</h3>
      <div class="fixture-stack">
        <h1 class="cdr-heading-serif cdr-heading-serif--scale-5">
          Heading Serif scale 5
        </h1>
        <h1 class="cdr-heading-serif cdr-heading-serif--scale-4">
          Heading Serif scale 4
        </h1>
        <h1 class="cdr-heading-serif cdr-heading-serif--scale-3">
          Heading Serif scale 3
        </h1>
        <h1 class="cdr-heading-serif cdr-heading-serif--scale-2">
          Heading Serif scale 2
        </h1>
        <h1 class="cdr-heading-serif cdr-heading-serif--scale-1">
          Heading Serif scale 1
        </h1>
        <h1
          class="cdr-heading-serif cdr-heading-serif--strong cdr-heading-serif--scale-5"
        >
          Heading Serif scale 5 (strong)
        </h1>
        <h1
          class="cdr-heading-serif cdr-heading-serif--strong cdr-heading-serif--scale-4"
        >
          Heading Serif scale 4 (strong)
        </h1>
        <h1
          class="cdr-heading-serif cdr-heading-serif--strong cdr-heading-serif--scale-3"
        >
          Heading Serif scale 3 (strong)
        </h1>
        <h1
          class="cdr-heading-serif cdr-heading-serif--strong cdr-heading-serif--scale-2"
        >
          Heading Serif scale 2 (strong)
        </h1>
        <h1
          class="cdr-heading-serif cdr-heading-serif--strong cdr-heading-serif--scale-1"
        >
          Heading Serif scale 1 (strong)
        </h1>
      </div>
    </section>

    <section v-if="show('subheading-sans')" class="fixture-group">
      <h3>Subheading Sans scales</h3>
      <div class="fixture-stack">
        <p class="cdr-subheading-sans cdr-subheading-sans--scale-2">
          Subheading Sans scale 2
        </p>
        <p class="cdr-subheading-sans cdr-subheading-sans--scale-1">
          Subheading Sans scale 1
        </p>
        <p class="cdr-subheading-sans cdr-subheading-sans--scale-0">
          Subheading Sans scale 0
        </p>
        <p class="cdr-subheading-sans cdr-subheading-sans--scale-minus-1">
          Subheading Sans scale -1
        </p>
      </div>
    </section>

    <section v-if="show('body')" class="fixture-group">
      <h3>Body scales</h3>
      <div class="fixture-stack">
        <p class="cdr-body cdr-body--scale-1">Body scale 1</p>
        <p class="cdr-body cdr-body--scale-0">Body scale 0</p>
        <p class="cdr-body cdr-body--strong cdr-body--scale-1">
          Body scale 1 (strong)
        </p>
        <p class="cdr-body cdr-body--strong cdr-body--scale-0">
          Body scale 0 (strong)
        </p>
      </div>
    </section>

    <section v-if="show('utility-sans')" class="fixture-group">
      <h3>Utility Sans scales</h3>
      <div class="fixture-stack">
        <p class="cdr-utility-sans cdr-utility-sans--scale-3">
          Utility Sans scale 3
        </p>
        <p class="cdr-utility-sans cdr-utility-sans--scale-2">
          Utility Sans scale 2
        </p>
        <p class="cdr-utility-sans cdr-utility-sans--scale-1">
          Utility Sans scale 1
        </p>
        <p class="cdr-utility-sans cdr-utility-sans--scale-0">
          Utility Sans scale 0
        </p>
        <p class="cdr-utility-sans cdr-utility-sans--scale-minus-1">
          Utility Sans scale -1
        </p>
        <p
          class="cdr-utility-sans cdr-utility-sans--strong cdr-utility-sans--scale-3"
        >
          Utility Sans scale 3 (strong)
        </p>
        <p
          class="cdr-utility-sans cdr-utility-sans--strong cdr-utility-sans--scale-2"
        >
          Utility Sans scale 2 (strong)
        </p>
        <p
          class="cdr-utility-sans cdr-utility-sans--strong cdr-utility-sans--scale-1"
        >
          Utility Sans scale 1 (strong)
        </p>
        <p
          class="cdr-utility-sans cdr-utility-sans--strong cdr-utility-sans--scale-0"
        >
          Utility Sans scale 0 (strong)
        </p>
        <p
          class="cdr-utility-sans cdr-utility-sans--strong cdr-utility-sans--scale-minus-1"
        >
          Utility Sans scale -1 (strong)
        </p>
      </div>
    </section>

    <section v-if="show('utility-serif')" class="fixture-group">
      <h3>Utility Serif scales</h3>
      <div class="fixture-stack">
        <p class="cdr-utility-serif cdr-utility-serif--scale-3">
          Utility Serif scale 3
        </p>
        <p class="cdr-utility-serif cdr-utility-serif--scale-2">
          Utility Serif scale 2
        </p>
        <p class="cdr-utility-serif cdr-utility-serif--scale-1">
          Utility Serif scale 1
        </p>
        <p class="cdr-utility-serif cdr-utility-serif--scale-0">
          Utility Serif scale 0
        </p>
        <p class="cdr-utility-serif cdr-utility-serif--scale-minus-1">
          Utility Serif scale -1
        </p>
        <p
          class="cdr-utility-serif cdr-utility-serif--strong cdr-utility-serif--scale-3"
        >
          Utility Serif scale 3 (strong)
        </p>
        <p
          class="cdr-utility-serif cdr-utility-serif--strong cdr-utility-serif--scale-2"
        >
          Utility Serif scale 2 (strong)
        </p>
        <p
          class="cdr-utility-serif cdr-utility-serif--strong cdr-utility-serif--scale-1"
        >
          Utility Serif scale 1 (strong)
        </p>
        <p
          class="cdr-utility-serif cdr-utility-serif--strong cdr-utility-serif--scale-0"
        >
          Utility Serif scale 0 (strong)
        </p>
        <p
          class="cdr-utility-serif cdr-utility-serif--strong cdr-utility-serif--scale-minus-1"
        >
          Utility Serif scale -1 (strong)
        </p>
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

.fixture-stack {
  display: grid;
  gap: 12px;
  max-width: 72ch;
}
</style>
