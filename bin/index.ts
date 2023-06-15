import path from 'node:path';
import { parseFile, printToFile } from '../src/index';

function go() {
  const inputPath = path.resolve(__dirname, '..', 'input', 'Brewfile');
  const input = parseFile(inputPath);

  const outputPath = path.resolve(__dirname, '..', 'output', 'Brewfile');
  printToFile(outputPath, '');
}

go();
