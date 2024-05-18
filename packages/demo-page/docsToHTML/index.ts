/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import markdownit from 'markdown-it';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('typescript', typescript);

const TARGET_DIR = 'public'; // relative (to package root) path to where the converted docs are written
const SOURCE_DIR = '../mui-country-code-selector/docs'; // relative (to package root) path to where the .mds are read from

const rootDir = path.dirname(import.meta.dirname); // package root directory
const scriptDir = path.join(rootDir, 'docsToHTML'); // where this script is located
const sourceDir = path.join(rootDir, SOURCE_DIR); // where the docs are read from
const targetDir = path.join(rootDir, TARGET_DIR); // where the converted files are written
const htmlDir = path.join(targetDir, 'docs'); // actual document directory within the target directory

if (!fs.existsSync(targetDir)) {
  console.error(`Error: no public/ directory (${targetDir}) => quitting`);
  process.exit(1);
}
if (!fs.existsSync(htmlDir)) {
  console.log(`creating docs/ directory (${targetDir})`);
  fs.mkdirSync(htmlDir);
}

const headerHTML = fs
  .readFileSync(path.join(scriptDir, 'header.txt'))
  .toString();
const footerHTML = fs
  .readFileSync(path.join(scriptDir, 'footer.txt'))
  .toString();

const md = markdownit({
  html: true,
  typographer: true,
  highlight: (str) => {
    try {
      return hljs.highlight(str, { language: 'typescript' }).value;
    } catch (__) {
      /* empty */
    }
    return ''; // use external default escaping
  },
});

// override the fenced block renderer to remove the pre tag from around the
// code blocks (https://github.com/markdown-it/markdown-it/issues/269)
md.renderer.rules.fence = (tokens, idx, options) => {
  const token = tokens[idx];
  const info = token.info ? md.utils.unescapeAll(token.info).trim() : '';
  let langName = '';
  let highlighted;

  if (info) {
    [langName] = info.split(/\s+/g);
  }

  if (options.highlight) {
    highlighted =
      options.highlight(token.content, langName, '') ||
      md.utils.escapeHtml(token.content);
  } else {
    highlighted = md.utils.escapeHtml(token.content);
  }

  return `<div><code class="hljs language-typescript">${highlighted}</code></div>\n`;
};

fs.readdir(sourceDir, (dirErr, files) => {
  if (dirErr) {
    console.error(
      `Error: reading directory "${dirErr.path}" failed (${dirErr.code})`
    );
    process.exit(1);
  }

  console.log('writing files ...');

  files.forEach((file) => {
    fs.readFile(path.join(sourceDir, file), 'utf8', (fileErr, data) => {
      if (fileErr) {
        console.error(
          `Error: reading file ${fileErr.path} failed (${fileErr.code})`
        );
        process.exit(1);
      }

      const filePath = path.join(htmlDir, `${path.basename(file, '.md')}.html`);
      console.log(filePath);

      const fileContent = `${headerHTML}\n${md.render(data)}\n${footerHTML}`;

      fs.writeFile(filePath, fileContent, (writeErr) => {
        if (writeErr) {
          console.error(
            `Error: writing file ${writeErr.path} failed (${writeErr.code})`
          );
          process.exit(1);
        }
      });
    });
  });
});
