const imageData =
  'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20viewBox%3D%270%200%201200%20600%27%20width%3D%271200%27%20height%3D%27600%27%3E%3Crect%20width%3D%271200%27%20height%3D%27600%27%20fill%3D%27%23dfe7e1%27/%3E%3Cpath%20d%3D%27M0%20420%20L200%20280%20L380%20360%20L520%20240%20L760%20420%20L980%20300%20L1200%20360%20L1200%20600%20L0%20600%20Z%27%20fill%3D%27%2390a59b%27/%3E%3Ccircle%20cx%3D%27900%27%20cy%3D%27140%27%20r%3D%2770%27%20fill%3D%27%23f4f1ea%27/%3E%3C/svg%3E';

export default {
  title: 'Prose',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Optional prose styles for rich text and CMS content wrapped in cdr-prose.',
      },
    },
  },
};

export const Overview = {
  render: () => `
    <div style="display:grid;gap:24px;padding:24px">
      <article class="cdr-prose" style="max-width:72ch">
        <h2>Rich text editing</h2>
        <p>
          <strong>Rich Text</strong> components are <u>powerful tools</u> that enable
          users to enhance their content with a wide range of formatting options,
          <a href="https://www.rei.com">transforming</a> ordinary text into visually
          appealing and dynamic representations. With their versatile capabilities,
          Rich Text components offer numerous benefits to users, making them a
          valuable asset in various <em>contexts</em>.
        </p>
        <h3>Benefits</h3>
        <ol>
          <li>
            <strong>Enhanced Visual Appeal</strong>: Rich Text components allow users
            to apply formatting options such as bold, italics, underlining, font
            styles, sizes, and colors, resulting in visually <em>appealing</em> and
            attractive content.
          </li>
          <li>
            <strong>Improved Readability</strong>: By utilizing headings, subheadings,
            bullet points, and numbered lists, Rich Text components help users
            organize and structure their content, making it easier to read and
            comprehend.
          </li>
          <li>
            <strong>Emphasizing Key Points</strong>: With features like bold and
            italics, Rich Text components enable users to highlight important
            information and emphasize key points, ensuring that crucial details
            stand out to the reader.
          </li>
          <li>
            <strong>Flexibility in Content Organization</strong>: <u>Rich Text</u>
            components offer the flexibility to align text, adjust margins, create
            indents, and format paragraphs, allowing users to optimize the layout and
            presentation of their content.
            <ol>
              <li>
                <strong>Nested </strong><a href="https://www.rei.com">hyperlink</a>
                <em>italic</em> <u>underline</u>
                <ol>
                  <li>
                    <strong>Nested </strong><a href="https://www.rei.com">hyperlink</a>
                    <em>italic</em> <u>underline</u>
                    <ol>
                      <li>
                        <strong>Nested </strong><a href="https://www.rei.com">hyperlink</a>
                        <em>italic</em> <u>underline</u>
                      </li>
                      <li>
                        <strong>Nested </strong><a href="https://www.rei.com">hyperlink</a>
                        <em>italic</em> <u>underline</u>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
            </ol>
          </li>
        </ol>
        <h3>Why we should use it?</h3>
        <ul>
          <li>
            <strong>Multimedia Integration</strong>: Users can <em>seamlessly</em>
            incorporate multimedia elements such as images, videos, audio files,
            <a href="https://www.rei.com">hyperlinks</a>, and interactive elements
            into their text, enriching the content and enhancing the user
            <u>experience</u>.
          </li>
          <li>
            <strong>Collaboration and Version Control</strong>: Rich Text components
            facilitate collaborative work by allowing multiple users to make real-time
            edits, track changes, add comments, and revert to previous versions,
            promoting efficient teamwork and effective communication.
          </li>
          <li>
            <strong>Accessibility</strong>: Rich Text components often support
            accessibility features such as screen readers, making the content
            accessible to individuals with disabilities and ensuring inclusivity.
          </li>
          <li>
            <strong>Cross-Platform Compatibility</strong>: Rich Text components are
            compatible with various platforms and devices, allowing users to access
            and edit their content seamlessly across desktop computers, laptops,
            tablets, and mobile phones.
            <ul>
              <li>
                <strong>Nested</strong> <a href="https://www.rei.com">hyperlink</a>
                <em>italic </em><u>underline</u>
                <ul>
                  <li>
                    <strong>Nested</strong> <a href="https://www.rei.com">hyperlink</a>
                    <em>italic </em><em><u>italic underline</u></em>
                    <ul>
                      <li>
                        <strong>Nested</strong> <a href="https://www.rei.com">hyperlink</a>
                        <em>italic </em><strong><em><u>bold italic underline</u></em></strong>
                      </li>
                      <li>
                        <strong>Nested</strong> <a href="https://www.rei.com">hyperlink</a>
                        <em>italic </em><a href="https://www.rei.com"><strong><em>bold italic hyperlink</em></strong></a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <strong>Time Efficiency</strong>: With intuitive interfaces and
            user-friendly controls, Rich Text components simplify the content creation
            process, saving users time and effort in formatting and structuring their
            text.
          </li>
        </ul>
        <p>
          <strong>Rich Text</strong> components are also <strong>user-friendly</strong>
          and accessible. Users with limited technical knowledge can easily navigate
          the intuitive interface, and the formatting options are often presented in a
          familiar and straightforward manner.
        </p>
        <blockquote>
          Never doubt that a small group of thoughtful, committed citizens can change
          the world; indeed, it's the only thing that ever has.
        </blockquote>
      </article>
    </div>
  `,
};

export const Sizes = {
  render: () => `
    <div style="display:grid;gap:24px;padding:24px">
      <article class="cdr-prose cdr-prose--sm" style="max-width:60ch">
        <h2>Small</h2>
        <p>Smaller text for tight layouts or secondary content blocks.</p>
      </article>
      <article class="cdr-prose" style="max-width:60ch">
        <h2>Default</h2>
        <p>Default prose sizing for readable long-form content.</p>
      </article>
      <article class="cdr-prose cdr-prose--lg" style="max-width:60ch">
        <h2>Large</h2>
        <p>Large prose for editorial layouts and generous spacing.</p>
      </article>
    </div>
  `,
};

export const MeasuredLineLength = {
  render: () => `
    <div style="display:grid;gap:24px;padding:24px">
      <article class="cdr-prose cdr-prose--measure">
        <h2>Measured line length</h2>
        <p>
          The measure variant keeps paragraphs within a comfortable reading width
          that aligns with Cedar’s typography guidance for long-form content.
        </p>
        <p>
          Use it for CMS pages, editorial content, or any block of copy that spans
          multiple paragraphs.
        </p>
      </article>
    </div>
  `,
};

export const SerifHeadings = {
  render: () => `
    <div style="display:grid;gap:24px;padding:24px">
      <article class="cdr-prose cdr-prose--serif-headings" style="max-width:72ch">
        <h1>Field journal: early season snowfall</h1>
        <p>
          Serif headings provide a warmer, more expressive tone while the body
          copy remains sans for readability. This combination works well for
          editorial or brand storytelling content.
        </p>
        <h2>Summary</h2>
        <p>
          Light snow fell overnight above 6,500 feet, with a thin crust lingering
          on shaded slopes. South-facing sections remain mostly clear.
        </p>
        <h3>Notes from the crew</h3>
        <ul>
          <li>Expect soft footing after noon as temperatures rise.</li>
          <li>Microspikes recommended for shaded switchbacks.</li>
          <li>Carry extra layers for exposed ridgelines.</li>
        </ul>
        <blockquote>
          We’re seeing the first hints of winter, but most lower trails are still in
          excellent shape.
        </blockquote>
        <h4>What’s next</h4>
        <p>
          We’ll post another update midweek once the forecast stabilizes. Check the
          trail bulletin for closures and seasonal advisories.
        </p>
      </article>
    </div>
  `,
};

export const Invert = {
  render: () => `
    <div style="display:grid;gap:24px;padding:24px">
      <article
        class="cdr-prose cdr-prose--invert"
        style="background:var(--cdr-color-background-button-dark-rest);padding:24px;border-radius:var(--cdr-radius-softer);max-width:60ch"
      >
        <h2>Dark surface</h2>
        <p>
          Use the invert variant when prose appears on a dark background.
          Link colors inherit the default link tokens unless overridden.
        </p>
        <p>
          <a href="#">Learn more about accessible contrast</a>
        </p>
      </article>
    </div>
  `,
};

export const EscapeHatch = {
  render: () => `
    <div style="display:grid;gap:24px;padding:24px">
      <article class="cdr-prose" style="max-width:72ch">
        <h2>Prose with embedded components</h2>
        <p>
          Use <code>.cdr-not-prose</code> to prevent prose styles from leaking into
          Cedar components or custom UI blocks.
        </p>
        <div
          class="cdr-not-prose"
          style="padding:16px;border:1px dashed var(--cdr-prose-rule);border-radius:var(--cdr-prose-radius)"
        >
          <p class="cdr-text">This block opts out of prose styling.</p>
          <button type="button" class="cdr-button cdr-button--primary cdr-button--medium">
            Call to action
          </button>
        </div>
      </article>
    </div>
  `,
};

export const ContentTypes = {
  render: () => `
    <div style="display:grid;gap:24px;padding:24px">
      <article class="cdr-prose" style="max-width:72ch">
        <h1>Spring gear guide</h1>
        <p>
          This story exercises common CMS elements in one place for quick visual
          verification of spacing, color, and rhythm.
        </p>
        <h2>Layering essentials</h2>
        <p>
          Start with a breathable base, add a warm midlayer, then finish with a
          shell. Pack light, but plan for changing conditions.
        </p>
        <h3>Checklist</h3>
        <ul>
          <li>Wicking tee and a light fleece.</li>
          <li>Packable shell for wind and rain.</li>
          <li>Extra socks and a dry layer.</li>
        </ul>
        <h4>Field note</h4>
        <blockquote>
          The best system is the one you can adjust quickly without stopping.
        </blockquote>
        <p>
          Learn more in the <a href="#">full guide</a>. Inline code looks like
          <code>layering = [base, mid, shell]</code>.
        </p>
        <pre><code>const layers = ['base', 'mid', 'shell'];\nconst packed = layers.filter(Boolean);\n</code></pre>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Use</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wind shell</td>
              <td>Wind protection</td>
              <td>6 oz</td>
            </tr>
            <tr>
              <td>Fleece</td>
              <td>Warmth</td>
              <td>12 oz</td>
            </tr>
            <tr>
              <td>Base layer</td>
              <td>Moisture control</td>
              <td>7 oz</td>
            </tr>
          </tbody>
        </table>
        <figure>
          <img src="${imageData}" alt="Illustrated ridge line with a pale sky" />
          <figcaption>Layering keeps you comfortable as conditions change.</figcaption>
        </figure>
        <figure class="cdr-not-prose">
          <img
            class="cdr-image"
            src="https://cedar.rei.com/rei-passage-2-tent.jpg"
            alt="Person in an REI Passage 2 tent"
          />
          <div class="cdr-caption">
            <p class="cdr-caption__summary">
              Person in an REI Passage 2 tent.
            </p>
            <cite class="cdr-caption__cite">Photo by Cedar Studio</cite>
          </div>
        </figure>
      </article>
    </div>
  `,
};

export const ComponentMix = {
  render: () => `
    <div style="display:grid;gap:24px;padding:24px">
      <article class="cdr-prose" style="max-width:72ch">
        <h2>Mixed content with Cedar components</h2>
        <p>
          Prose styling should not leak into Cedar components. Wrap component
          blocks with <code>.cdr-not-prose</code> when needed.
        </p>
        <div
          class="cdr-not-prose"
          style="display:grid;gap:12px;padding:16px;border:1px solid var(--cdr-prose-rule);border-radius:var(--cdr-prose-radius)"
        >
          <p class="cdr-text">Component title</p>
          <a class="cdr-link" href="#">Cedar link</a>
          <button
            type="button"
            class="cdr-button cdr-button--secondary cdr-button--medium"
            style="justify-self:start"
          >
            Secondary action
          </button>
        </div>
        <p>
          After the embedded block, prose styles resume for additional paragraphs
          and inline elements like <code>cdr-not-prose</code>.
        </p>
      </article>
    </div>
  `,
};

export const Editorial = {
  render: () => `
    <div style="display:grid;gap:24px;padding:24px">
      <article class="cdr-prose cdr-prose--measure">
        <h1>Weekend dispatch: shifting weather</h1>
        <p>
          A calm start gave way to gusts by early afternoon. The crew noted
          faster drying trails on south-facing slopes but lingering moisture
          in shaded gullies.
        </p>
        <h2>Why conditions change so quickly</h2>
        <p>
          Microclimates vary over short distances. Elevation, exposure, and
          vegetation all play a role. When planning, check the forecast and
          monitor local advisories.
        </p>
        <p>
          The report references <abbr title="National Weather Service">NWS</abbr>
          data and a historical average of 14 days. A follow-up update is planned
          for Thursday, April 18.
        </p>
        <h3>What we learned</h3>
        <ul>
          <li>Expect breezier ridgelines after 1 p.m.</li>
          <li>Carry a lightweight shell even on sunny starts.</li>
          <li>Plan turnaround times before the temperature drops.</li>
        </ul>
        <blockquote>
          A little extra preparation keeps a short trip comfortable and safe.
        </blockquote>
        <h4>Footnotes</h4>
        <p>
          Forecast details are sourced from regional stations.<sup>1</sup> Always
          check trail status before you go.
        </p>
      </article>
    </div>
  `,
};

export const ResponsiveMeasure = {
  render: () => `
    <div style="display:grid;gap:24px;padding:24px">
      <div style="display:grid;gap:24px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">
        <article class="cdr-prose cdr-prose--sm cdr-prose--measure">
          <h3>Small</h3>
          <p>Compact measure for tight layouts.</p>
        </article>
        <article class="cdr-prose cdr-prose--measure">
          <h3>Default</h3>
          <p>Standard measure for long-form content.</p>
        </article>
        <article class="cdr-prose cdr-prose--lg cdr-prose--measure">
          <h3>Large</h3>
          <p>Generous measure for editorial layouts.</p>
        </article>
      </div>
    </div>
  `,
};

export const DarkSurface = {
  render: () => `
    <div style="display:grid;gap:24px;padding:24px">
      <article
        class="cdr-prose cdr-prose--invert"
        style="background:var(--cdr-color-background-button-dark-rest);padding:24px;border-radius:var(--cdr-radius-softer);max-width:60ch"
      >
        <h2>Prose on dark surfaces</h2>
        <p>
          Use the invert variant to keep text legible on dark backgrounds while
          still relying on tokenized colors.
        </p>
        <pre><code>const alert = {\n  status: 'updated',\n  message: 'Storm watch in effect',\n};\n</code></pre>
        <table>
          <thead>
            <tr>
              <th>Alert</th>
              <th>When</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wind</td>
              <td>Tonight</td>
              <td>Ridge</td>
            </tr>
            <tr>
              <td>Rain</td>
              <td>Tomorrow</td>
              <td>Valley</td>
            </tr>
          </tbody>
        </table>
        <p>
          <a href="#">Review safety checklist</a>
        </p>
      </article>
    </div>
  `,
};
