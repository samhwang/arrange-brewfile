import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

export function parseFile(inputPath: string) {
  const pathToFile = path.resolve(__dirname, inputPath);
  const content = fs.readFileSync(pathToFile, { encoding: 'utf-8' }).trim();
  return content.split('\n');
}

type Keys = 'taps' | 'brews' | 'casks' | 'mas' | 'whalebrews' | 'vscodes';
type Block = string[];
type BrewStructure = Record<Keys, Block>;

const tapLine = z.string().startsWith('tap "');
const brewLine = z.string().startsWith('brew "');
const caskLine = z.string().startsWith('cask "');
const masLine = z.string().startsWith('mas "');
const whalebrewLine = z.string().startsWith('whalebrew "');
const vscodeLine = z.string().startsWith('vscode "');

export function parseBrewStructure(input: string[]) {
  return input.reduce<BrewStructure>(
    (accumulator, line) => {
      if (!line || line.length === 0) {
        return accumulator;
      }

      const isTapLine = tapLine.safeParse(line);
      if (isTapLine.success) {
        accumulator.taps.push(isTapLine.data);
        accumulator.taps.sort();
        return accumulator;
      }

      const isBrewLine = brewLine.safeParse(line);
      if (isBrewLine.success) {
        accumulator.brews.push(isBrewLine.data);
        accumulator.brews.sort();
        return accumulator;
      }

      const isCaskLine = caskLine.safeParse(line);
      if (isCaskLine.success) {
        accumulator.casks.push(line);
        accumulator.casks.sort();
        return accumulator;
      }

      const isMasLine = masLine.safeParse(line);
      if (isMasLine.success) {
        accumulator.mas.push(line);
        accumulator.mas.sort();
        return accumulator;
      }

      const isWhalebrewLine = whalebrewLine.safeParse(line);
      if (isWhalebrewLine.success) {
        accumulator.whalebrews.push(line);
        accumulator.whalebrews.sort();
        return accumulator;
      }

      const isVSCodeLine = vscodeLine.safeParse(line);
      if (isVSCodeLine.success) {
        accumulator.vscodes.push(line);
        accumulator.vscodes.sort();
        return accumulator;
      }

      console.error('INVALID LINE. SKIPPING!');
      return accumulator;
    },
    {
      taps: [],
      brews: [],
      casks: [],
      mas: [],
      whalebrews: [],
      vscodes: [],
    }
  );
}

export function buildOutputContent(structure: BrewStructure) {
  return Object.entries(structure)
    .reduce((accumulator, [key, values]: [string, string[]]) => {
      if (values.length === 0) {
        return accumulator;
      }

      const contentBlock = values.reduce((block, line) => {
        return `${block}\n${line}`;
      }, '');
      return `${accumulator}${contentBlock}\n`;
    }, '')
    .trim();
}

export function printToFile(outputPath: string, content: string) {
  return fs.writeFileSync(outputPath, content, { encoding: 'utf-8' });
}
