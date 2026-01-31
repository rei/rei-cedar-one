const renderBlock = (content: string) => `
  <div style="display:grid;gap:16px;max-width:480px;">
    ${content}
  </div>
`;

const iconSvg = `
  <svg
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
  >
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-2h2zm0-4h-2V7h2z" />
  </svg>
`;

export default {
  title: 'Forms/Form Error',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Form errors display validation feedback with an icon and error text, expanding only when the error state is active.',
      },
    },
  },
};

export const Active = {
  render: () =>
    renderBlock(`
      <div class="cdr-form-error --active-error" style="display:flex;align-items:center;gap:4px;">
        <span
          class="cdr-form-error__icon"
          style="display:inline-flex;align-items:center;justify-content:center;height:20px;"
        >
          ${iconSvg}
        </span>
        <div role="status" aria-atomic="true" aria-relevant="all">
          <div>Please enter a valid email address.</div>
        </div>
      </div>
    `),
};

export const Base = {
  render: () =>
    renderBlock(`
      <p class="cdr-text">
        No error is shown until the active modifier is applied.
      </p>
      <div class="cdr-form-error"></div>
    `),
};
