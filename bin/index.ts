import path from 'node:path';
import { arrangeBrewfile } from '../src/arrange';
import type { ExcludeOptionalParams } from '../src/config';
import { parseFile, printToFile } from '../src/file';

const excludeOptionalParams: ExcludeOptionalParams = {
  vscode: true,
  whalebrew: true,
};

function go(excludeOptionalParams?: ExcludeOptionalParams) {
  const inputPath = path.resolve(__dirname, '..', 'input', 'Brewfile');
  console.log(`Reading input from ${inputPath}`);
  const input = parseFile(inputPath);

  const content = arrangeBrewfile(input, excludeOptionalParams);

  const outputPath = path.resolve(__dirname, '..', 'output', 'Brewfile');
  console.log(`Printing out arranged brewfile to ${outputPath}`);
  printToFile(outputPath, content);
  console.log('Complete!');
}

go(excludeOptionalParams);
