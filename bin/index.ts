import path from 'node:path';
import { arrangeBrewfile } from '../src/arrange';
import { parseFile, printToFile } from '../src/file';

function go() {
  const inputPath = path.resolve(__dirname, '..', 'input', 'Brewfile');
  console.log(`Reading input from ${inputPath}`);
  const input = parseFile(inputPath);

  const content = arrangeBrewfile(input);

  const outputPath = path.resolve(__dirname, '..', 'output', 'Brewfile');
  console.log(`Printing out arranged brewfile to ${outputPath}`);
  printToFile(outputPath, content);
  console.log('Complete!');
}

go();
