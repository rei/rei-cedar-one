<script setup lang="ts">
type ListSection =
  | 'base'
  | 'unordered'
  | 'ordered'
  | 'compact'
  | 'inline'
  | 'deep-nesting'
  | 'deep-nesting-ordered'
  | 'all';

const props = withDefaults(defineProps<{ section?: ListSection }>(), {
  section: 'all',
});

const show = (section: ListSection) =>
  props.section === 'all' || props.section === section;
</script>

<template>
  <section class="fixture">
    <h2 class="fixture-title">List</h2>

    <section v-if="show('base')" class="fixture-group">
      <h3>Base</h3>
      <ul class="cdr-list">
        <li>Base list item</li>
        <li>Second list item</li>
        <li>Third list item</li>
      </ul>
    </section>

    <section v-if="show('unordered')" class="fixture-group">
      <h3>Unordered</h3>
      <ul class="cdr-list cdr-list--unordered">
        <li>Unordered item</li>
        <li>
          Unordered item with nested list
          <ul class="cdr-list">
            <li>Nested item</li>
            <li>Nested item</li>
          </ul>
        </li>
        <li>Unordered item</li>
      </ul>
    </section>

    <section v-if="show('ordered')" class="fixture-group">
      <h3>Ordered</h3>
      <ol class="cdr-list cdr-list--ordered">
        <li>First item</li>
        <li>
          Second item with nested list
          <ul class="cdr-list">
            <li>Nested item</li>
            <li>Nested item</li>
          </ul>
        </li>
        <li>Third item</li>
      </ol>
    </section>

    <section v-if="show('compact')" class="fixture-group">
      <h3>Compact</h3>
      <ul class="cdr-list cdr-list--unordered cdr-list--compact">
        <li>Compact item</li>
        <li>Compact item</li>
        <li>Compact item</li>
      </ul>
    </section>

    <section v-if="show('inline')" class="fixture-group">
      <h3>Inline</h3>
      <div class="fixture-stack">
        <ul class="cdr-list cdr-list--inline cdr-list--unordered">
          <li>Inline item</li>
          <li>Inline item</li>
          <li>Inline item</li>
        </ul>
        <ul
          class="cdr-list cdr-list--inline cdr-list--unordered cdr-list--compact"
        >
          <li>Compact inline</li>
          <li>Compact inline</li>
          <li>Compact inline</li>
        </ul>
      </div>
    </section>

    <section v-if="show('deep-nesting')" class="fixture-group">
      <h3>Deep nesting</h3>
      <ul class="cdr-list cdr-list--unordered">
        <li>Level 1 item</li>
        <li>
          Level 1 item with nested list
          <ul class="cdr-list">
            <li>Level 2 item</li>
            <li>
              Level 2 item with nested list
              <ul class="cdr-list">
                <li>Level 3 item</li>
                <li>
                  Level 3 item with nested list
                  <ul class="cdr-list">
                    <li>Level 4 item</li>
                    <li>Level 4 item</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>Level 1 item</li>
      </ul>
    </section>

    <section v-if="show('deep-nesting-ordered')" class="fixture-group">
      <h3>Deep nesting (ordered)</h3>
      <ol class="cdr-list cdr-list--ordered">
        <li>Level 1 item</li>
        <li>
          Level 1 item with nested list
          <ol class="cdr-list">
            <li>Level 2 item</li>
            <li>
              Level 2 item with nested list
              <ol class="cdr-list">
                <li>Level 3 item</li>
                <li>
                  Level 3 item with nested list
                  <ol class="cdr-list">
                    <li>Level 4 item</li>
                    <li>Level 4 item</li>
                  </ol>
                </li>
              </ol>
            </li>
          </ol>
        </li>
        <li>Level 1 item</li>
      </ol>
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
}
</style>
