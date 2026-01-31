const renderSurface = (modifier: 'top' | 'bottom') => `
  <div style="background:#f4f2ed;padding:24px;">
    <div
      class="cdr-split-surface cdr-split-surface--${modifier}"
      style="--cdr-split-surface-surface-color:#ffffff;"
    >
      <div class="cdr-split-surface__top">
        <div style="padding:24px 0;">
          <strong>Top content</strong>
        </div>
      </div>
      <div class="cdr-split-surface__bottom">
        <div style="padding:24px 0;">
          <strong>Bottom content</strong>
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
