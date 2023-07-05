import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

export function parseFile(inputPath: string) {
  const pathToFile = path.resolve(__dirname, inputPath);
  const content = fs.readFileSync(pathToFile, { encoding: 'utf-8' }).trim();
  return content.split('\n');
}

export function parseBrewStructure(input: string[]) {
  const taps: string[] = [];
  const brews: string[] = [];
  const casks: string[] = [];
  const vscodes: string[] = [];

  input.forEach((line) => {
    if (!line || line.length === 0) {
      return;
    }

    const tapLine = z.string().startsWith('tap "');
    const isTapLine = tapLine.safeParse(line);
    if (isTapLine.success) {
      taps.push(isTapLine.data);
      taps.sort();
      return;
    }

    const brewLine = z.string().startsWith('brew "');
    const isBrewLine = brewLine.safeParse(line);
    if (isBrewLine.success) {
      brews.push(isBrewLine.data);
      brews.sort();
      return;
    }

    const caskLine = z.string().startsWith('cask "');
    const isCaskLine = caskLine.safeParse(line);
    if (isCaskLine.success) {
      casks.push(line);
      casks.sort();
      return;
    }

    const vscodeLine = z.string().startsWith('vscode "');
    const isVSCodeLine = vscodeLine.safeParse(line);
    if (isVSCodeLine.success) {
      vscodes.push(line);
      vscodes.sort();
      return;
    }

    console.error('INVALID LINE. SKIPPING!');
    return;
  });

  return [taps, brews, casks, vscodes];
}

export function buildOutputContent(structure: string[][]) {
  return structure
    .reduce((accumulator, part) => {
      if (part.length === 0) {
        return accumulator;
      }

      const contentBlock = part.reduce((block, line) => {
        return `${block}\n${line}`;
      }, '');
      return `${accumulator}${contentBlock}\n`;
    }, '')
    .trim();
}

export function printToFile(outputPath: string, content: string) {
  return fs.writeFileSync(outputPath, content, { encoding: 'utf-8' });
}
