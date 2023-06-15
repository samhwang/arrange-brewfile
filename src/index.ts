import fs from 'node:fs';
import path from 'node:path';

export function parseFile(inputPath: string) {
  const pathToFile = path.resolve(__dirname, inputPath);
  const content = fs.readFileSync(pathToFile, { encoding: 'utf-8' }).trim();
  return content.split('\n');
}

export function printToFile(outputPath: string, content: string) {
  return fs.writeFileSync(outputPath, content, { encoding: 'utf-8' });
}
