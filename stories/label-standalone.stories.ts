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
          <input class="cdr-input cdr-input--primary" id="label-standalone-base" type="email" />
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
          <br />
          <span class="cdr-label-standalone__helper" id="label-standalone-required-help">
            Use at least 8 characters.
          </span>
        </div>
        <div class="cdr-label-standalone__input-wrap cdr-label-standalone__input-spacing">
          <input
            class="cdr-input cdr-input--primary"
            id="label-standalone-required"
            type="password"
            aria-describedby="label-standalone-required-help"
          />
        </div>
      </div>
    `),
};

export const OptionalWithHelper = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-standalone">
        <div class="cdr-label-standalone__label-wrapper">
          <label class="cdr-label-standalone__label" for="label-standalone-optional">
            Company name
            <span class="cdr-label-standalone__optional">(optional)</span>
          </label>
          <br />
          <span
            class="cdr-label-standalone__helper"
            id="label-standalone-optional-helper"
          >
            Used on receipts only.
          </span>
        </div>
        <div class="cdr-label-standalone__input-wrap cdr-label-standalone__input-spacing">
          <input
            class="cdr-input cdr-input--primary"
            id="label-standalone-optional"
            type="text"
            aria-describedby="label-standalone-optional-helper"
          />
        </div>
      </div>
    `),
};

export const InfoLink = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-standalone">
        <div class="cdr-label-standalone__label-wrapper">
          <label class="cdr-label-standalone__label" for="label-standalone-info">
            Nickname
          </label>
        </div>
        <span class="cdr-label-standalone__info">
          <a class="cdr-link cdr-link--standalone" href="#">
            Why we ask
          </a>
        </span>
        <div class="cdr-label-standalone__input-wrap cdr-label-standalone__input-spacing">
          <input class="cdr-input cdr-input--primary" id="label-standalone-info" type="text" />
        </div>
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
          <input class="cdr-input cdr-input--primary" id="label-standalone-hidden" type="search" placeholder="Search" />
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
          <input class="cdr-input cdr-input--primary" id="label-standalone-disabled" type="text" disabled />
        </div>
      </div>
    `),
};
