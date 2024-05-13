import path from 'node:path';
import { parseFile, printToFile } from '../src/file';
import { buildOutputContent, parseBrewStructure } from '../src/index';

function go() {
  const inputPath = path.resolve(__dirname, '..', 'input', 'Brewfile');
  console.log(`Reading input from ${inputPath}`);
  const input = parseFile(inputPath);

  const structure = parseBrewStructure(input);
  const content = buildOutputContent(structure);

  const outputPath = path.resolve(__dirname, '..', 'output', 'Brewfile');
  console.log(`Printing out arranged brewfile to ${outputPath}`);
  printToFile(outputPath, content);
  console.log('Complete!');
}

go();
