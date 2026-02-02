import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const iconsDir = path.join(rootDir, 'src', 'icons');

/**
 * Check if SVG contains a viewBox.
 * @param svg - Raw SVG markup.
 */
const hasViewBox = (svg: string): boolean => /viewBox="[^"]+"/.test(svg);
/**
 * Check if SVG contains explicit width/height attributes.
 * @param svg - Raw SVG markup.
 */
const hasDimensions = (svg: string): boolean =>
  /\s(width|height)="[^"]+"/.test(svg);
/**
 * Check if SVG contains a title element.
 * @param svg - Raw SVG markup.
 */
const hasTitle = (svg: string): boolean => /<title[\s>]/.test(svg);
/**
 * Check if SVG contains a desc element.
 * @param svg - Raw SVG markup.
 */
const hasDesc = (svg: string): boolean => /<desc[\s>]/.test(svg);
/**
 * Check if SVG contains fill or stroke attributes.
 * @param svg - Raw SVG markup.
 */
const hasFillOrStroke = (svg: string): boolean =>
  /\s(fill|stroke)="[^"]+"/.test(svg);

/**
 * Validate a single SVG against Cedar icon constraints.
 * @param _name - Icon filename (unused).
 * @param svg - Raw SVG markup.
 */
const validateSvg = (_name: string, svg: string): string[] => {
  const errors: string[] = [];

  if (!svg.trim().startsWith('<svg')) {
    errors.push('missing <svg> root element');
  }
  if (!hasViewBox(svg)) {
    errors.push('missing viewBox attribute');
  }
  if (hasDimensions(svg)) {
    errors.push('contains width/height attributes');
  }
  if (hasTitle(svg) || hasDesc(svg)) {
    errors.push('contains <title> or <desc> elements');
  }
  if (hasFillOrStroke(svg)) {
    errors.push('contains fill or stroke attributes');
  }

  return errors;
};

type Failure = { file: string; errors: string[] };

/**
 * Validate all icons under src/icons.
 */
const run = async (): Promise<void> => {
  const files = (await fs.readdir(iconsDir)).filter((file) =>
    file.endsWith('.svg'),
  );
  const failures: Failure[] = [];

  for (const file of files) {
    const svg = await fs.readFile(path.join(iconsDir, file), 'utf8');
    const errors = validateSvg(file, svg);

    if (errors.length > 0) {
      failures.push({ file, errors });
    }
  }

  if (failures.length > 0) {
    console.error('Icon validation failed:');
    for (const failure of failures) {
      console.error(`- ${failure.file}: ${failure.errors.join(', ')}`);
    }
    process.exitCode = 1;
  }
};

run();
