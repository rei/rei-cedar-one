export default {
  title: 'Text',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'HTML-first text styles for Cedar typography presets and base text.',
      },
    },
  },
};

export const Base = {
  render: () => `
    <div style="display:grid;gap:12px">
      <p class="cdr-text">Base text uses the cdr-text class.</p>
    </div>
  `,
};

export const Presets = {
  render: () => `
    <div style="display:grid;gap:16px;max-width:72ch">
      <h1 class="cdr-heading-display">Heading Display</h1>
      <h2 class="cdr-heading-sans">Heading Sans</h2>
      <h1 class="cdr-heading-serif">Heading Serif</h1>
      <p class="cdr-subheading-sans">Subheading Sans</p>
      <p class="cdr-body">Body text</p>
      <span class="cdr-eyebrow">Eyebrow</span>
      <p class="cdr-utility-sans">Utility Sans</p>
      <p class="cdr-utility-serif">Utility Serif</p>
    </div>
  `,
};

export const HeadingDisplayScales = {
  render: () => `
    <div style="display:grid;gap:16px;max-width:72ch">
      <h1 class="cdr-heading-display cdr-heading-display--scale-6">Heading Display 6</h1>
      <h1 class="cdr-heading-display cdr-heading-display--scale-5">Heading Display 5</h1>
      <h1 class="cdr-heading-display cdr-heading-display--scale-4">Heading Display 4</h1>
      <h1 class="cdr-heading-display cdr-heading-display--scale-3">Heading Display 3</h1>
      <h1 class="cdr-heading-display cdr-heading-display--scale-2">Heading Display 2</h1>
    </div>
  `,
};

export const HeadingSansScales = {
  render: () => `
    <div style="display:grid;gap:16px;max-width:72ch">
      <h2 class="cdr-heading-sans cdr-heading-sans--scale-3">Heading Sans 3</h2>
      <h2 class="cdr-heading-sans cdr-heading-sans--scale-2">Heading Sans 2</h2>
      <h2 class="cdr-heading-sans cdr-heading-sans--scale-1">Heading Sans 1</h2>
    </div>
  `,
};

export const HeadingSerifScales = {
  render: () => `
    <div style="display:grid;gap:16px;max-width:72ch">
      <h1 class="cdr-heading-serif cdr-heading-serif--scale-5">Heading Serif 5</h1>
      <h1 class="cdr-heading-serif cdr-heading-serif--scale-4">Heading Serif 4</h1>
      <h1 class="cdr-heading-serif cdr-heading-serif--scale-3">Heading Serif 3</h1>
      <h1 class="cdr-heading-serif cdr-heading-serif--scale-2">Heading Serif 2</h1>
      <h1 class="cdr-heading-serif cdr-heading-serif--scale-1">Heading Serif 1</h1>
      <h1 class="cdr-heading-serif cdr-heading-serif--strong cdr-heading-serif--scale-5">Heading Serif 5</h1>
      <h1 class="cdr-heading-serif cdr-heading-serif--strong cdr-heading-serif--scale-4">Heading Serif 4</h1>
      <h1 class="cdr-heading-serif cdr-heading-serif--strong cdr-heading-serif--scale-3">Heading Serif 3</h1>
      <h1 class="cdr-heading-serif cdr-heading-serif--strong cdr-heading-serif--scale-2">Heading Serif 2</h1>
      <h1 class="cdr-heading-serif cdr-heading-serif--strong cdr-heading-serif--scale-1">Heading Serif 1</h1>
    </div>
  `,
};

export const SubheadingSansScales = {
  render: () => `
    <div style="display:grid;gap:16px;max-width:72ch">
      <p class="cdr-subheading-sans cdr-subheading-sans--scale-2">Subheading Sans 2</p>
      <p class="cdr-subheading-sans cdr-subheading-sans--scale-1">Subheading Sans 1</p>
      <p class="cdr-subheading-sans cdr-subheading-sans--scale-0">Subheading Sans 0</p>
      <p class="cdr-subheading-sans cdr-subheading-sans--scale-minus-1">Subheading Sans -1</p>
    </div>
  `,
};

export const BodyScales = {
  render: () => `
    <div style="display:grid;gap:16px;max-width:72ch">
      <p class="cdr-body cdr-body--scale-1">Body 1</p>
      <p class="cdr-body cdr-body--scale-0">Body 0</p>
      <p class="cdr-body cdr-body--strong cdr-body--scale-1">Body 1</p>
      <p class="cdr-body cdr-body--strong cdr-body--scale-0">Body 0</p>
    </div>
  `,
};

export const UtilitySansScales = {
  render: () => `
    <div style="display:grid;gap:16px;max-width:72ch">
      <p class="cdr-utility-sans cdr-utility-sans--scale-3">Utility Sans 3</p>
      <p class="cdr-utility-sans cdr-utility-sans--scale-2">Utility Sans 2</p>
      <p class="cdr-utility-sans cdr-utility-sans--scale-1">Utility Sans 1</p>
      <p class="cdr-utility-sans cdr-utility-sans--scale-0">Utility Sans 0</p>
      <p class="cdr-utility-sans cdr-utility-sans--scale-minus-1">Utility Sans -1</p>
      <p class="cdr-utility-sans cdr-utility-sans--strong cdr-utility-sans--scale-3">Utility Sans 3</p>
      <p class="cdr-utility-sans cdr-utility-sans--strong cdr-utility-sans--scale-2">Utility Sans 2</p>
      <p class="cdr-utility-sans cdr-utility-sans--strong cdr-utility-sans--scale-1">Utility Sans 1</p>
      <p class="cdr-utility-sans cdr-utility-sans--strong cdr-utility-sans--scale-0">Utility Sans 0</p>
      <p class="cdr-utility-sans cdr-utility-sans--strong cdr-utility-sans--scale-minus-1">Utility Sans -1</p>
    </div>
  `,
};

export const UtilitySerifScales = {
  render: () => `
    <div style="display:grid;gap:16px;max-width:72ch">
      <p class="cdr-utility-serif cdr-utility-serif--scale-3">Utility Serif 3</p>
      <p class="cdr-utility-serif cdr-utility-serif--scale-2">Utility Serif 2</p>
      <p class="cdr-utility-serif cdr-utility-serif--scale-1">Utility Serif 1</p>
      <p class="cdr-utility-serif cdr-utility-serif--scale-0">Utility Serif 0</p>
      <p class="cdr-utility-serif cdr-utility-serif--scale-minus-1">Utility Serif -1</p>
      <p class="cdr-utility-serif cdr-utility-serif--strong cdr-utility-serif--scale-3">Utility Serif 3</p>
      <p class="cdr-utility-serif cdr-utility-serif--strong cdr-utility-serif--scale-2">Utility Serif 2</p>
      <p class="cdr-utility-serif cdr-utility-serif--strong cdr-utility-serif--scale-1">Utility Serif 1</p>
      <p class="cdr-utility-serif cdr-utility-serif--strong cdr-utility-serif--scale-0">Utility Serif 0</p>
      <p class="cdr-utility-serif cdr-utility-serif--strong cdr-utility-serif--scale-minus-1">Utility Serif -1</p>
    </div>
  `,
};
