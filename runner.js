// A test runner for the browser with Vitest's syntax. `expect` is Vitest's own (@vitest/expect), so the
// matchers and the failure messages are the ones `npm test` shows; only `test` and `expect` are provided.
// Used by index.html (the import map maps 'vitest' here) and, inlined, by the JSFiddle version
// (../fiddle/build.js), where each spec's imports are pointed at the code of the JS panel.
import * as vitestExpect from 'https://esm.sh/@vitest/expect@4.1.12';

const { chai } = vitestExpect;
chai.use(vitestExpect.JestExtend);
chai.use(vitestExpect.JestChaiExpect);
chai.use(vitestExpect.JestAsymmetricMatchers);
export const expect = chai.expect;

let registered = [];
export function test(name, fn) {
  registered.push({ name, fn });
}

// Imports one spec file (its `test` calls register here), then runs its tests one by one.
async function runFile(file, load) {
  registered = [];
  try {
    await load();
  } catch (error) {
    return { file, error, tests: [] };
  }
  const tests = [];
  for (const t of registered) {
    try {
      await t.fn();
      tests.push({ name: t.name });
    } catch (error) {
      tests.push({ name: t.name, error });
    }
  }
  return { file, tests };
}

// index.html: runs every spec of the list that exists in tests/; a missing file is skipped, so moving a
// card's file into tests/ is enough to run it.
export async function run(names) {
  const files = [];
  for (const name of names) {
    const url = `./tests/${name}.spec.js`;
    if (!(await fetch(url, { method: 'HEAD', cache: 'no-store' })).ok) continue;
    files.push(await runFile(`tests/${name}.spec.js`, () => import(url)));
  }
  return files;
}

// JSFiddle: the specs are texts (fetched from the repository) and the code under test is the text of the
// JavaScript panel. Each spec's `from 'vitest'` and `from '../src/alerts.js'` are pointed at modules made
// from those texts. A spec given as { file, error } (not found) is reported as a file that did not run.
export async function runSources(specs, code, vitestModule) {
  const url = text => URL.createObjectURL(new Blob([text], { type: 'text/javascript' }));
  const codeUrl = url(code);
  const vitestUrl = url(vitestModule);
  const files = [];
  for (const { file, source, error } of specs) {
    if (error) {
      files.push({ file, error, tests: [] });
      continue;
    }
    const linked = source
      .replace(/from\s+['"]vitest['"]/g, `from '${vitestUrl}'`)
      .replace(/from\s+['"]\.\.\/src\/alerts\.js['"]/g, `from '${codeUrl}'`);
    const result = await runFile(file, () => import(url(linked)));
    // An error names the module by its blob: address; name it the way the spec file does.
    if (result.error) result.error.message = result.error.message.replaceAll(codeUrl, '../src/alerts.js').replaceAll(vitestUrl, 'vitest');
    files.push({ ...result, source });
  }
  return files;
}

// Shows the results the way Vitest lists them: ✓ or × per test, the message under a failure, a summary.
export function render(files, element) {
  const escape = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
  const html = [];
  let passed = 0;
  let failed = 0;
  for (const f of files) {
    html.push(`<div class="file">${f.file}</div>`);
    if (f.source) html.push(`<details><summary>Показати код тестів</summary><pre>${escape(f.source)}</pre></details>`);
    if (f.error) {
      failed++;
      html.push(`<div class="fail">× файл не запустився</div><div class="msg">${escape(f.error.message)}</div>`);
    }
    for (const t of f.tests) {
      if (t.error) {
        failed++;
        html.push(`<div class="fail">× ${escape(t.name)}</div><div class="msg">${escape(t.error.message)}</div>`);
      } else {
        passed++;
        html.push(`<div class="pass">✓ ${escape(t.name)}</div>`);
      }
    }
  }
  const summary = failed
    ? `<span class="fail">${failed} failed</span> | <span class="pass">${passed} passed</span>`
    : `<span class="pass">${passed} passed</span>`;
  element.innerHTML = `${html.join('')}<div class="summary">${summary}</div>`;
  console.log(failed ? `${failed} failed | ${passed} passed` : `${passed} passed`);
}
