import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const source = JSON.parse(readFileSync(new URL('../src/resume/resume-content.json', import.meta.url), 'utf8'));
const paragraphs = [source.name, `${source.location} | ${source.email}`, `Portfolio: ${source.portfolio}`];
for (const section of source.sections) {
  paragraphs.push(section.heading);
  for (const block of section.blocks) {
    if (block.title) paragraphs.push(block.title);
    paragraphs.push(...block.paragraphs, ...block.links, ...block.bullets);
  }
}
const result = spawnSync('pdftotext', ['-layout', fileURLToPath(new URL('../src/resume/merle-klein-resume.pdf', import.meta.url)), '-'], { encoding: 'utf8' });
assert.equal(result.status, 0, 'Resume parity requires Poppler pdftotext on PATH.');
const pdfText = result.stdout.replace(/^\s*Merle Klein\s*\|\s*\d+\s*$/gm, '');
const normalize = text => text.toLowerCase().replace(/[^a-z0-9]/g, '');
assert.equal(normalize(pdfText), normalize(paragraphs.join('\n')), 'Public PDF and HTML content differ; update both before publishing.');
assert.equal(source.email, 'merlek.apps.support@gmail.com');
assert.deepEqual(pdfText.match(/[\w.+-]+@[\w.-]+\.[a-z]+/gi), [source.email]);
assert.doesNotMatch(pdfText, /\(?\d{3}\)?[ -]\d{3}[ -]\d{4}/, 'Public resume must not contain a phone number.');
console.log('Public resume HTML/PDF text parity and contact checks passed.');
