const renderSurface = (modifier: 'top' | 'bottom') => `
  <div style="background:#f4f2ed;padding:24px;">
    <div
      class="cdr-split-surface cdr-split-surface--${modifier}"
      style="--cdr-split-surface-surface-color:#ffffff;"
    >
      <div class="cdr-split-surface__top">
        <img
          class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-cover"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="A person in a tent"
        />
      </div>
      <div class="cdr-split-surface__bottom">
        <div style="padding:24px 0;">
          <h2 class="cdr-heading-display cdr-heading-display--scale-4">
            A life outdoors is a life well lived
          </h2>
        </div>
      </div>
    </div>
  </div>
`;

export default {
  title: 'Split Surface',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Split surfaces introduce a new surface layer to create visual impact and a smooth transition between content sections.',
      },
    },
  },
};

export const BottomSurface = {
  render: () => renderSurface('bottom'),
};

export const TopSurface = {
  render: () => renderSurface('top'),
};
