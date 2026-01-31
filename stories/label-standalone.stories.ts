const renderBlock = (content: string) => `
  <div style="display:grid;gap:16px;max-width:480px;">
    ${content}
  </div>
`;

export default {
  title: 'Forms/Label Standalone',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Standalone labels provide form label typography with helper, optional, and info treatments when you are composing custom form layouts.',
      },
    },
  },
};

export const Base = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-standalone">
        <div class="cdr-label-standalone__label-wrapper">
          <label class="cdr-label-standalone__label" for="label-standalone-base">
            Email address
          </label>
        </div>
        <div class="cdr-label-standalone__input-wrap cdr-label-standalone__input-spacing">
          <input id="label-standalone-base" type="email" />
        </div>
      </div>
    `),
};

export const RequiredWithHelper = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-standalone">
        <div class="cdr-label-standalone__label-wrapper">
          <label class="cdr-label-standalone__label" for="label-standalone-required">
            Password <span aria-hidden="true">*</span>
          </label>
          <span class="cdr-label-standalone__helper" id="label-standalone-required-help">
            Use at least 8 characters.
          </span>
        </div>
        <div class="cdr-label-standalone__input-wrap cdr-label-standalone__input-spacing">
          <input
            id="label-standalone-required"
            type="password"
            aria-describedby="label-standalone-required-help"
          />
        </div>
      </div>
    `),
};

export const OptionalWithInfoAction = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-standalone">
        <div class="cdr-label-standalone__label-wrapper">
          <label class="cdr-label-standalone__label" for="label-standalone-optional">
            Company name
            <span class="cdr-label-standalone__optional">(optional)</span>
          </label>
        </div>
        <div class="cdr-label-standalone__input-wrap cdr-label-standalone__input-spacing">
          <input id="label-standalone-optional" type="text" />
          <div class="cdr-label-standalone__info-action">
            <button type="button" aria-label="More info">i</button>
          </div>
        </div>
        <span class="cdr-label-standalone__info">Used on receipts only.</span>
      </div>
    `),
};

export const HiddenLabel = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-standalone">
        <div class="cdr-label-standalone__label-wrapper">
          <label
            class="cdr-label-standalone__label cdr-label-standalone__label--sr-only"
            for="label-standalone-hidden"
          >
            Search
          </label>
        </div>
        <div class="cdr-label-standalone__input-wrap">
          <input id="label-standalone-hidden" type="search" placeholder="Search" />
        </div>
      </div>
    `),
};

export const Disabled = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-standalone">
        <div class="cdr-label-standalone__label-wrapper">
          <label
            class="cdr-label-standalone__label cdr-label-standalone__label--disabled"
            for="label-standalone-disabled"
          >
            Disabled field
            <span class="cdr-label-standalone__optional">(optional)</span>
          </label>
        </div>
        <div class="cdr-label-standalone__input-wrap cdr-label-standalone__input-spacing">
          <input id="label-standalone-disabled" type="text" disabled />
        </div>
      </div>
    `),
};
