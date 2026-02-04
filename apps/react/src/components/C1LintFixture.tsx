import { C1IconInformationStroke, C1IconSearch } from '@rei/c1-icons/react';

import C1Input from './C1Input';

const iconInfo = (
  <C1IconInformationStroke aria-hidden="true" focusable={false} inheritColor />
);

const iconSearch = (
  <C1IconSearch aria-hidden="true" focusable={false} inheritColor />
);

const C1LintFixture = () => {
  return (
    <section className="fixture">
      <h2 className="fixture-title">Cedar Lint Fixture</h2>
      <section className="fixture-group">
        <h3>Input</h3>
        <div className="fixture-stack" style={{ maxWidth: '520px' }}>
          <C1Input
            label="Input label"
            slots={{
              'helper-text-top': 'Helper text above the field.',
              'helper-text-bottom': 'Helper text below the field.',
              'pre-icon': iconSearch,
              'post-icon': (
                <>
                  <button
                    type="button"
                    className="cdr-button cdr-button--primary cdr-button--icon-only cdr-input__button"
                    aria-label="Clear input"
                  >
                    {iconInfo}
                  </button>
                  <button
                    type="button"
                    className="cdr-button cdr-button--primary cdr-button--icon-only cdr-input__button"
                    aria-label="More info"
                  >
                    {iconSearch}
                  </button>
                </>
              ),
            }}
            postIcons
          />
          <C1Input label="Input label" error="Please enter a valid value." />
        </div>
      </section>
    </section>
  );
};

export default C1LintFixture;
