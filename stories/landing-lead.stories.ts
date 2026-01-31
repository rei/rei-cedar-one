const renderLead = (options: { wrapperStyles?: string }) => {
  const wrapperStyles = options.wrapperStyles
    ? `style="${options.wrapperStyles}"`
    : '';
  return `
    <div ${wrapperStyles}>
      <div class="cdr-split-surface cdr-split-surface--bottom cdr-landing-lead">
        <div class="cdr-split-surface__top">
          <img
            class="cdr-image cdr-landing-lead__image"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="A person in a tent"
          />
        </div>
        <div class="cdr-split-surface__bottom">
          <header class="cdr-heading-subheading-block cdr-landing-lead__copy-block">
            <h1 class="cdr-heading-display cdr-heading-display--scale-4 cdr-heading-subheading-block__heading">
              Camp with no reservations.
            </h1>
            <span class="cdr-subheading-sans cdr-heading-subheading-block__subheading">
              We have the know-how to equip you to camp in the middle of nowhere.
            </span>
          </header>
        </div>
      </div>
    </div>
  `;
};

export default {
  title: 'Landing Lead',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Landing leads introduce a landing page with a prominent image, heading, and subheading near the top of the page.',
      },
    },
  },
};

export const Default = {
  render: () => renderLead({}),
};

export const OnPalette = {
  render: () =>
    renderLead({
      wrapperStyles: 'background-color:#f4f2ed;padding:24px;',
    }),
};
