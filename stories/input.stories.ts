const renderBlock = (content: string) => `
  <div style="display:grid;gap:16px;max-width:520px;">
    ${content}
  </div>
`;

const iconSvg = `
  <svg
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    style="display:block;"
  >
    <path d="M11 4a7 7 0 1 0 4.3 12.5l3.6 3.6 1.4-1.4-3.6-3.6A7 7 0 0 0 11 4zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10z"></path>
  </svg>
`;

const iconActionSvg = `
  <svg
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    style="display:block;"
  >
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-2h2zm0-4h-2V7h2z"></path>
  </svg>
`;

const inlineActionSvg = `
  <svg
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
  >
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-2h2zm0-4h-2V7h2z"></path>
  </svg>
`;

export default {
  title: 'Forms/Input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Inputs support freeform data entry and search. Use them for open-ended responses; use select when options are predefined.',
      },
    },
  },
};

export const Base = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-standalone">
        <div class="cdr-label-standalone__label-wrapper">
          <label class="cdr-label-standalone__label" for="input-base">
            Input label
          </label>
        </div>
        <div class="cdr-label-standalone__input-wrap cdr-label-standalone__input-spacing">
          <div class="cdr-input-wrap">
            <input class="cdr-input cdr-input--primary" id="input-base" type="text" />
          </div>
        </div>
      </div>
    `),
};

export const HelperTextTop = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-standalone">
        <div class="cdr-label-standalone__label-wrapper">
          <label class="cdr-label-standalone__label" for="input-helper-top">
            Input label
          </label>
          <br />
          <span class="cdr-label-standalone__helper" id="input-helper-top-text">
            Helper text above the field.
          </span>
        </div>
        <div class="cdr-label-standalone__input-wrap cdr-label-standalone__input-spacing">
          <div class="cdr-input-wrap">
            <input
              class="cdr-input cdr-input--primary"
              id="input-helper-top"
              type="text"
              aria-describedby="input-helper-top-text"
            />
          </div>
        </div>
      </div>
    `),
};

export const HelperTextBottom = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-standalone">
        <div class="cdr-label-standalone__label-wrapper">
          <label class="cdr-label-standalone__label" for="input-helper-bottom">
            Input label
          </label>
        </div>
        <div class="cdr-label-standalone__input-wrap cdr-label-standalone__input-spacing">
          <div class="cdr-input-wrap">
            <input
              class="cdr-input cdr-input--primary"
              id="input-helper-bottom"
              type="text"
              aria-describedby="input-helper-bottom-text"
            />
          </div>
        </div>
        <div class="cdr-label-standalone__post-content">
          <span class="cdr-input__helper-text" id="input-helper-bottom-text">
            Helper text below the field.
          </span>
        </div>
      </div>
    `),
};

export const Error = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-standalone">
        <div class="cdr-label-standalone__label-wrapper">
          <label class="cdr-label-standalone__label" for="input-error">
            Input label
          </label>
        </div>
        <div class="cdr-label-standalone__input-wrap cdr-label-standalone__input-spacing">
          <div class="cdr-input-wrap">
            <input
              class="cdr-input cdr-input--primary cdr-input--error"
              id="input-error"
              type="text"
              aria-describedby="input-error-text"
              aria-invalid="true"
            />
          </div>
        </div>
        <div class="cdr-label-standalone__post-content">
          <div
            class="cdr-form-error --active-error"
            id="input-error-text"
            style="display:flex;align-items:center;gap:4px;"
          >
            <span
              class="cdr-form-error__icon"
              style="display:inline-flex;align-items:center;justify-content:center;height:20px;"
            >
              ${inlineActionSvg}
            </span>
            <div role="status" aria-atomic="true" aria-relevant="all">
              <div>Please enter a valid value.</div>
            </div>
          </div>
        </div>
      </div>
    `),
};

export const PreIcon = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-standalone">
        <div class="cdr-label-standalone__label-wrapper">
          <label class="cdr-label-standalone__label" for="input-pre-icon">
            Input label
          </label>
        </div>
        <div class="cdr-label-standalone__input-wrap cdr-label-standalone__input-spacing">
          <div class="cdr-input-wrap">
            <input
              class="cdr-input cdr-input--primary cdr-input--preicon"
              id="input-pre-icon"
              type="text"
            />
            <span class="cdr-input__pre-icon">${iconSvg}</span>
          </div>
        </div>
      </div>
    `),
};

export const PostIcon = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-standalone">
        <div class="cdr-label-standalone__label-wrapper">
          <label class="cdr-label-standalone__label" for="input-post-icon">
            Input label
          </label>
        </div>
        <div class="cdr-label-standalone__input-wrap cdr-label-standalone__input-spacing">
          <div class="cdr-input-wrap">
            <input
              class="cdr-input cdr-input--primary cdr-input--posticon"
              id="input-post-icon"
              type="text"
            />
            <span class="cdr-input__post-icon">${iconActionSvg}</span>
          </div>
        </div>
      </div>
    `),
};

export const PostIcons = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-standalone">
        <div class="cdr-label-standalone__label-wrapper">
          <label class="cdr-label-standalone__label" for="input-post-icons">
            Input label
          </label>
        </div>
        <div class="cdr-label-standalone__input-wrap cdr-label-standalone__input-spacing">
          <div class="cdr-input-wrap">
            <input
              class="cdr-input cdr-input--primary cdr-input--posticons"
              id="input-post-icons"
              type="text"
            />
            <span class="cdr-input__post-icon">
              <button
                type="button"
                class="cdr-button cdr-button--primary cdr-button--icon-only cdr-input__button"
                aria-label="Clear input"
              >
                ${iconActionSvg}
              </button>
              <button
                type="button"
                class="cdr-button cdr-button--primary cdr-button--icon-only cdr-input__button"
                aria-label="More info"
              >
                ${iconSvg}
              </button>
            </span>
          </div>
        </div>
      </div>
    `),
};

export const SecondaryBackground = {
  render: () =>
    renderBlock(`
      <div style="background: var(--cdr-color-background-input-default-active); padding:16px; border-radius:12px;">
        <div class="cdr-label-standalone">
          <div class="cdr-label-standalone__label-wrapper">
            <label class="cdr-label-standalone__label" for="input-secondary">
              Input label
            </label>
          </div>
          <div class="cdr-label-standalone__input-wrap cdr-label-standalone__input-spacing">
            <div class="cdr-input-wrap">
              <input
                class="cdr-input cdr-input--secondary"
                id="input-secondary"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
    `),
};

export const Large = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-standalone">
        <div class="cdr-label-standalone__label-wrapper">
          <label class="cdr-label-standalone__label" for="input-large">
            Large input label
          </label>
        </div>
        <div class="cdr-label-standalone__input-wrap cdr-label-standalone__input-spacing">
          <div class="cdr-input-wrap">
            <input
              class="cdr-input cdr-input--primary cdr-input--large"
              id="input-large"
              type="text"
            />
          </div>
        </div>
      </div>
    `),
};

export const Multiline = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-standalone">
        <div class="cdr-label-standalone__label-wrapper">
          <label class="cdr-label-standalone__label" for="input-multiline">
            Input label
          </label>
        </div>
        <div class="cdr-label-standalone__input-wrap cdr-label-standalone__input-spacing">
          <div class="cdr-input-wrap">
            <textarea
              class="cdr-input cdr-input--primary cdr-input--multiline"
              id="input-multiline"
              rows="4"
            ></textarea>
          </div>
        </div>
      </div>
    `),
};

export const Date = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-standalone">
        <div class="cdr-label-standalone__label-wrapper">
          <label class="cdr-label-standalone__label" for="input-date">
            Choose a date
          </label>
        </div>
        <div class="cdr-label-standalone__input-wrap cdr-label-standalone__input-spacing">
          <div class="cdr-input-wrap">
            <input
              class="cdr-input cdr-input--primary"
              id="input-date"
              type="date"
            />
          </div>
        </div>
      </div>
    `),
};
