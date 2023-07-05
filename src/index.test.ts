import { describe, it, expect, vi } from 'vitest';
import { parseBrewStructure, buildOutputContent } from './index';

const consoleErrorSpy = vi.spyOn(console, 'error');
consoleErrorSpy.mockImplementation(() => {});

describe('End to End Process', () => {
  it("Should return empty if input doesn't have content", () => {
    const input = [''];
    const expected = '';

    const structure = parseBrewStructure(input);
    const output = buildOutputContent(structure);

    expect(output).toEqual(expected);
  });

  it('Should have a tap', () => {
    const input = ['tap "aws/tap"'];
    const expected = 'tap "aws/tap"';

    const structure = parseBrewStructure(input);
    const output = buildOutputContent(structure);

    expect(output).toEqual(expected);
  });

  it('Should have many taps', () => {
    const input = ['tap "beeftornado/rmtree"', 'tap "aws/tap"'];
    const expected = 'tap "aws/tap"\ntap "beeftornado/rmtree"';

    const structure = parseBrewStructure(input);
    const output = buildOutputContent(structure);

    expect(output).toEqual(expected);
  });

  it('Should have a brew', () => {
    const input = ['brew "ack"'];
    const expected = 'brew "ack"';

    const structure = parseBrewStructure(input);
    const output = buildOutputContent(structure);

    expect(output).toEqual(expected);
  });

  it('Should have many brews', () => {
    const input = ['brew "xz"', 'brew "ack"'];
    const expected = 'brew "ack"\nbrew "xz"';

    const structure = parseBrewStructure(input);
    const output = buildOutputContent(structure);

    expect(output).toEqual(expected);
  });

  it('Should have a cask', () => {
    const input = ['cask "fork"'];
    const expected = 'cask "fork"';

    const structure = parseBrewStructure(input);
    const output = buildOutputContent(structure);

    expect(output).toEqual(expected);
  });

  it('Should have many casks', () => {
    const input = ['cask "fork"', 'cask "canva"'];
    const expected = 'cask "canva"\ncask "fork"';

    const structure = parseBrewStructure(input);
    const output = buildOutputContent(structure);

    expect(output).toEqual(expected);
  });

  it('Should have a vscode package', () => {
    const input = ['vscode "rome.rome"'];
    const expected = 'vscode "rome.rome"';

    const structure = parseBrewStructure(input);
    const output = buildOutputContent(structure);

    expect(output).toEqual(expected);
  });

  it('Should have many vscode packages', () => {
    const input = ['vscode "rome.rome"', 'vscode "esbenp.prettier"'];
    const expected = 'vscode "esbenp.prettier"\nvscode "rome.rome"';

    const structure = parseBrewStructure(input);
    const output = buildOutputContent(structure);

    expect(output).toEqual(expected);
  });

  it('Should contain 1 tap, 1 brew, 1 cask, 1 vscode', () => {
    const input = ['tap "aws/tap"', 'brew "xz"', 'cask "fork"', 'vscode "rome.rome"'];
    const expected = 'tap "aws/tap"\n\nbrew "xz"\n\ncask "fork"\n\nvscode "rome.rome"';

    const structure = parseBrewStructure(input);
    const output = buildOutputContent(structure);

    expect(output).toEqual(expected);
  });

  it('Should ignore invalid lines', () => {
    const input = ['blah "blah.blah"'];
    const expected = '';
    const structure = parseBrewStructure(input);
    const output = buildOutputContent(structure);

    expect(output).toEqual(expected);
    expect(consoleErrorSpy).toBeCalled();
  });
});
