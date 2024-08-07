import { DEFAULT_EXCLUDE_OPTIONAL_CONFIG, type ExcludeOptionalParams } from './config';
import {
  BrewLine,
  type BrewStructure,
  CaskLine,
  MasLine,
  TapLine,
  VscodeLine,
  WhalebrewLine,
  isInGroup,
} from './structure';

export function parseBrewStructure(input: string[], excludeOptionalParams?: ExcludeOptionalParams) {
  const excludeOptionalConfig = { ...DEFAULT_EXCLUDE_OPTIONAL_CONFIG, ...excludeOptionalParams };

  return input.reduce<BrewStructure>(
    (accumulator, line) => {
      if (!line || line.length === 0) {
        return accumulator;
      }

      if (isInGroup(line, TapLine)) {
        accumulator.taps.push(line);
        accumulator.taps.sort();
        return accumulator;
      }

      if (isInGroup(line, BrewLine)) {
        accumulator.brews.push(line);
        accumulator.brews.sort();
        return accumulator;
      }

      if (isInGroup(line, CaskLine)) {
        accumulator.casks.push(line);
        accumulator.casks.sort();
        return accumulator;
      }

      if (isInGroup(line, MasLine) && excludeOptionalConfig.mas) {
        console.log(excludeOptionalConfig);
        return accumulator;
      }

      if (isInGroup(line, MasLine)) {
        accumulator.mass.push(line);
        accumulator.mass.sort();
        return accumulator;
      }

      if (isInGroup(line, WhalebrewLine) && excludeOptionalConfig.whalebrew) {
        return accumulator;
      }

      if (isInGroup(line, WhalebrewLine)) {
        accumulator.whalebrews.push(line);
        accumulator.whalebrews.sort();
        return accumulator;
      }

      if (isInGroup(line, VscodeLine) && excludeOptionalConfig.vscode) {
        return accumulator;
      }

      if (isInGroup(line, VscodeLine)) {
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
      mass: [],
      whalebrews: [],
      vscodes: [],
    }
  );
}

export function buildOutputContent(structure: BrewStructure) {
  return Object.values(structure)
    .reduce((accumulator, values) => {
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

export function arrangeBrewfile(input: string[], excludeOptionalParams?: ExcludeOptionalParams) {
  const structure = parseBrewStructure(input, excludeOptionalParams);
  const output = buildOutputContent(structure);
  return output;
}
