<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CedarLintFixture',
  data() {
    return {
      fixtureTitle: 'Cedar Lint Fixture',
    };
  },
});
</script>

<template>
  <section class="fixture">
    <h2 class="fixture-title">{{ fixtureTitle }}</h2>

    <section class="fixture-group">
      <h3>Buttons</h3>
      <div class="fixture-stack">
        <div class="fixture-row">
          <button
            type="button"
            class="cdr-button cdr-button--primary cdr-button--small"
          >
            Primary Small
          </button>
          <button
            type="button"
            class="cdr-button cdr-button--secondary cdr-button--medium"
          >
            Secondary Medium
          </button>
          <button
            type="button"
            class="cdr-button cdr-button--dark cdr-button--large"
          >
            Dark Large
          </button>
          <button
            type="button"
            class="cdr-button cdr-button--sale cdr-button--medium"
          >
            Sale Medium
          </button>
          <button
            type="button"
            class="cdr-button cdr-button--link cdr-button--medium"
          >
            Link Medium
          </button>
        </div>

        <div class="fixture-row">
          <button
            type="button"
            class="cdr-button cdr-button--primary cdr-button--medium cdr-button--has-icon-left"
          >
            <span class="fixture-icon" aria-hidden="true"></span>
            Icon Left
          </button>
          <button
            type="button"
            class="cdr-button cdr-button--secondary cdr-button--medium cdr-button--has-icon-right"
          >
            Icon Right
            <span class="fixture-icon" aria-hidden="true"></span>
          </button>
          <button
            type="button"
            class="cdr-button cdr-button--secondary cdr-button--medium cdr-button--has-icon-left cdr-button--has-icon-right"
          >
            <span class="fixture-icon" aria-hidden="true"></span>
            Both Icons
            <span class="fixture-icon" aria-hidden="true"></span>
          </button>
        </div>

        <div class="fixture-row">
          <button
            type="button"
            class="cdr-button cdr-button--primary cdr-button--icon-only"
            aria-label="Icon only"
          >
            <span class="fixture-icon" aria-hidden="true"></span>
          </button>
          <button
            type="button"
            class="cdr-button cdr-button--primary cdr-button--icon-only cdr-button--icon-only-small"
            aria-label="Icon only small"
          >
            <span class="fixture-icon" aria-hidden="true"></span>
          </button>
          <button
            type="button"
            class="cdr-button cdr-button--primary cdr-button--icon-only cdr-button--icon-only-medium"
            aria-label="Icon only medium"
          >
            <span class="fixture-icon" aria-hidden="true"></span>
          </button>
          <button
            type="button"
            class="cdr-button cdr-button--primary cdr-button--icon-only cdr-button--icon-only-large"
            aria-label="Icon only large"
          >
            <span class="fixture-icon" aria-hidden="true"></span>
          </button>
          <button
            type="button"
            class="cdr-button cdr-button--primary cdr-button--icon-only cdr-button--with-background"
            aria-label="Icon only with background"
          >
            <span class="fixture-icon" aria-hidden="true"></span>
          </button>
        </div>

        <div class="fixture-row fixture-row--stack fixture-row--full">
          <button
            type="button"
            class="cdr-button cdr-button--primary cdr-button--medium cdr-button--full-width"
          >
            Full Width Primary
          </button>
          <button
            type="button"
            class="cdr-button cdr-button--secondary cdr-button--medium cdr-button--full-width"
          >
            Full Width Secondary
          </button>
        </div>

        <div class="fixture-row">
          <button
            type="button"
            class="cdr-button cdr-button--primary cdr-button--small@xs cdr-button--medium@sm cdr-button--large@md"
          >
            Responsive Size
          </button>
          <button
            type="button"
            class="cdr-button cdr-button--secondary cdr-button--small@xs cdr-button--medium@sm cdr-button--large@md cdr-button--full-width@xs"
          >
            Responsive Full
          </button>
        </div>

        <div class="fixture-row">
          <a
            href="#link"
            class="cdr-button cdr-button--primary cdr-button--medium"
          >
            Anchor Button
          </a>
        </div>
      </div>
    </section>

    <section class="fixture-group">
      <h3>Containers</h3>
      <div class="fixture-stack">
        <div class="cdr-container cdr-container--static">Static container</div>
        <div class="cdr-container cdr-container--fluid">Fluid container</div>
      </div>
    </section>

    <section class="fixture-group">
      <h3>Links</h3>
      <div class="fixture-row">
        <a class="cdr-link" href="#link">Default link</a>
        <button type="button" class="cdr-link">Button link</button>
        <a class="cdr-link cdr-link--standalone" href="#link">Standalone</a>
        <a class="cdr-link cdr-link--neutral" href="#link">Neutral</a>
        <a class="cdr-link cdr-link--standalone cdr-link--neutral" href="#link">
          Standalone neutral
        </a>
        <span class="fixture-link-wrap">
          <a class="cdr-link cdr-link--inherit-color" href="#link">
            Inherit color
          </a>
        </span>
      </div>
    </section>

    <section class="fixture-group">
      <h3>Caption</h3>
      <div class="fixture-stack">
        <img
          class="cdr-image"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="Person in an REI Passage 2 tent"
        />
        <div class="cdr-caption">
          <p class="cdr-caption__summary">Person in an REI Passage 2 tent.</p>
        </div>
        <div class="cdr-caption">
          <p class="cdr-caption__summary">Person in an REI Passage 2 tent.</p>
          <cite class="cdr-caption__cite">Photo by Cedar Studio</cite>
        </div>
      </div>
    </section>

    <section class="fixture-group">
      <h3>Quote</h3>
      <div class="fixture-stack">
        <blockquote class="cdr-quote">
          <p class="cdr-quote__summary">
            Never doubt that a small group of thoughtful, committed citizens can
            change the world; indeed, it's the only thing that ever has.
          </p>
          <cite class="cdr-quote__citation">Margaret Mead</cite>
        </blockquote>
        <aside class="cdr-quote cdr-quote--pull">
          <p class="cdr-quote__summary">
            Never doubt that a small group of thoughtful, committed citizens can
            change the world; indeed, it's the only thing that ever has.
          </p>
        </aside>
      </div>
    </section>

    <section class="fixture-group">
      <h3>Images</h3>
      <div class="fixture-stack">
        <img
          class="cdr-image"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="Base image"
        />

        <div class="fixture-grid">
          <img
            class="cdr-image cdr-image--ratio-1-1"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Ratio 1 by 1"
          />
          <img
            class="cdr-image cdr-image--ratio-1-2"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Ratio 1 by 2"
          />
          <img
            class="cdr-image cdr-image--ratio-3-4"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Ratio 3 by 4"
          />
          <img
            class="cdr-image cdr-image--ratio-9-16"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Ratio 9 by 16"
          />
          <img
            class="cdr-image cdr-image--ratio-2-1"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Ratio 2 by 1"
          />
          <img
            class="cdr-image cdr-image--ratio-4-3"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Ratio 4 by 3"
          />
          <img
            class="cdr-image cdr-image--ratio-16-9"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Ratio 16 by 9"
          />
        </div>

        <div class="fixture-grid">
          <img
            class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-cover"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Fit cover"
          />
          <img
            class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-contain"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Fit contain"
          />
          <img
            class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-none"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Fit none"
          />
          <img
            class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-fill"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Fit fill"
          />
          <img
            class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-scale-down"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Fit scale down"
          />
        </div>

        <div class="fixture-grid">
          <img
            class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-cover cdr-image--position-center"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Position center"
          />
          <img
            class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-cover cdr-image--position-top"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Position top"
          />
          <img
            class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-cover cdr-image--position-right"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Position right"
          />
          <img
            class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-cover cdr-image--position-bottom"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Position bottom"
          />
          <img
            class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-cover cdr-image--position-left"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Position left"
          />
        </div>

        <div class="fixture-grid">
          <img
            class="cdr-image cdr-image--radius-sharp"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Radius sharp"
          />
          <img
            class="cdr-image cdr-image--radius-soft"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Radius soft"
          />
          <img
            class="cdr-image cdr-image--radius-softer"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Radius softer"
          />
          <img
            class="cdr-image cdr-image--radius-round"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Radius round"
          />
        </div>
      </div>
    </section>

    <section class="fixture-group">
      <h3>Lists</h3>
      <div class="fixture-stack">
        <ul class="cdr-list">
          <li>Base list item</li>
          <li>Second list item</li>
          <li>Third list item</li>
        </ul>

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

        <ul class="cdr-list cdr-list--unordered cdr-list--compact">
          <li>Compact item</li>
          <li>Compact item</li>
          <li>Compact item</li>
        </ul>

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
      </div>
    </section>

    <section class="fixture-group">
      <h3>Prose</h3>
      <div class="fixture-stack">
        <div class="cdr-prose">
          <h4>Prose base</h4>
          <p>Base prose paragraph with a <a href="#link">link</a>.</p>
          <ul>
            <li>List item</li>
            <li>List item</li>
          </ul>
        </div>

        <div class="cdr-prose cdr-prose--sm">
          <h4>Prose small</h4>
          <p>Small prose paragraph.</p>
        </div>

        <div class="cdr-prose cdr-prose--lg">
          <h4>Prose large</h4>
          <p>Large prose paragraph.</p>
        </div>

        <div class="cdr-prose cdr-prose--measure">
          <h4>Measured line length</h4>
          <p>Measured prose width.</p>
        </div>

        <div class="cdr-prose cdr-prose--serif-headings">
          <h4>Serif headings</h4>
          <p>Serif heading treatment in prose.</p>
        </div>

        <div class="fixture-dark">
          <div class="cdr-prose cdr-prose--invert">
            <h4>Inverted prose</h4>
            <p>Inverted prose on dark surface.</p>
          </div>
        </div>
        <figure class="cdr-not-prose">
          <img
            class="cdr-image"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Person in an REI Passage 2 tent"
          />
          <div class="cdr-caption">
            <p class="cdr-caption__summary">Person in an REI Passage 2 tent.</p>
            <cite class="cdr-caption__cite">Photo by Cedar Studio</cite>
          </div>
        </figure>
      </div>
    </section>

    <section class="fixture-group">
      <h3>Text presets</h3>
      <div class="fixture-stack">
        <p class="cdr-text">Base text uses the cdr-text class.</p>

        <div class="fixture-stack">
          <h1 class="cdr-heading-display">Heading Display</h1>
          <h2 class="cdr-heading-sans">Heading Sans</h2>
          <h1 class="cdr-heading-serif">Heading Serif</h1>
          <p class="cdr-subheading-sans">Subheading Sans</p>
          <p class="cdr-body">Body text</p>
          <span class="cdr-kicker">Kicker</span>
          <span class="cdr-eyebrow">Eyebrow</span>
          <p class="cdr-utility-sans">Utility Sans</p>
          <p class="cdr-utility-serif">Utility Serif</p>
        </div>

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

        <div class="fixture-stack">
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
      </div>
    </section>
  </section>
</template>

<style scoped>
.fixture {
  display: grid;
  gap: 24px;
}

.fixture-title {
  margin: 0 0 12px;
  font-size: 20px;
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
  align-items: stretch;
}

.fixture-row--full {
  max-width: 320px;
}

.fixture-stack {
  display: grid;
  gap: 16px;
  max-width: 80ch;
}

.fixture-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
}

.fixture-dark {
  background: #1f513f;
  padding: 16px;
}

.fixture-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: currentColor;
}

.fixture-link-wrap {
  color: #1f513f;
}
</style>
