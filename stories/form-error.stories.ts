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
    width="16"
    height="16"
  >
    <path d="M12 2.5c-.5 0-.9.3-1.1.7L3 19.1c-.4.7.1 1.6.9 1.6h16.2c.8 0 1.3-.9.9-1.6L13.1 3.2c-.2-.4-.6-.7-1.1-.7zM11 9h2v6h-2V9zm0 8h2v2h-2v-2z" />
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
      <div class="cdr-form-error --active-error">
        <span class="cdr-form-error__icon">${iconSvg}</span>
        <div role="status" aria-atomic="true" aria-relevant="all" style="display:inline-block">
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
