export default {
  title: 'Image',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Images are used to illustrate, compare, tell stories, or convey brand; utilities handle ratios, fit, position, and radius.',
      },
    },
  },
};

export const Base = {
  render: () => `
    <div style="display:grid;gap:12px;max-width:720px">
      <img
        class="cdr-image"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="Placeholder image"
      />
    </div>
  `,
};

export const Ratios = {
  render: () => `
    <div style="display:grid;gap:16px;max-width:720px">
      <img
        class="cdr-image cdr-image--ratio-1-1"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="Square image"
      />
      <img
        class="cdr-image cdr-image--ratio-1-2"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="1 by 2 image"
      />
      <img
        class="cdr-image cdr-image--ratio-3-4"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="3 by 4 image"
      />
      <img
        class="cdr-image cdr-image--ratio-9-16"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="9 by 16 image"
      />
      <img
        class="cdr-image cdr-image--ratio-2-1"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="2 by 1 image"
      />
      <img
        class="cdr-image cdr-image--ratio-4-3"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="4 by 3 image"
      />
      <img
        class="cdr-image cdr-image--ratio-16-9"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="16 by 9 image"
      />
    </div>
  `,
};

export const ObjectFit = {
  render: () => `
    <div style="display:grid;gap:16px;max-width:720px">
      <img
        class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-cover"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="Cover fit image"
      />
      <img
        class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-contain"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="Contain fit image"
      />
      <img
        class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-none"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="None fit image"
      />
    </div>
  `,
};

export const ObjectPosition = {
  render: () => `
    <div style="display:grid;gap:16px;max-width:720px">
      <img
        class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-cover cdr-image--position-center"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="Centered image"
      />
      <img
        class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-cover cdr-image--position-top"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="Top aligned image"
      />
      <img
        class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-cover cdr-image--position-bottom"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="Bottom aligned image"
      />
    </div>
  `,
};

export const Radius = {
  render: () => `
    <div style="display:grid;gap:16px;max-width:720px">
      <img
        class="cdr-image cdr-image--radius-sharp"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="Sharp radius image"
      />
      <img
        class="cdr-image cdr-image--radius-soft"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="Soft radius image"
      />
      <img
        class="cdr-image cdr-image--radius-softer"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="Softer radius image"
      />
      <img
        class="cdr-image cdr-image--radius-round"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="Round radius image"
      />
    </div>
  `,
};

export const Loading = {
  render: () => `
    <div style="display:grid;gap:16px;max-width:720px">
      <img
        class="cdr-image"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="Lazy image"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
      />
      <img
        class="cdr-image"
        src="https://cedar.rei.com/rei-passage-2-tent.jpg"
        alt="Eager image"
        loading="eager"
        decoding="auto"
        fetchpriority="high"
      />
    </div>
  `,
};
