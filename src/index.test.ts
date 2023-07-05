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

  it('Should have a mas package', () => {
    const input = ['mas "GarageBand", id: 682658836'];
    const expected = 'mas "GarageBand", id: 682658836';

    const structure = parseBrewStructure(input);
    const output = buildOutputContent(structure);

    expect(output).toEqual(expected);
  });

  it('Should have many mas packages', () => {
    const input = ['mas "Pages", id: 409201541', 'mas "GarageBand", id: 682658836'];
    const expected = 'mas "GarageBand", id: 682658836\nmas "Pages", id: 409201541';

    const structure = parseBrewStructure(input);
    const output = buildOutputContent(structure);

    expect(output).toEqual(expected);
  });

  it('Should have a whalebrew package', () => {
    const input = ['whalebrew "whalebrew/wget"'];
    const expected = 'whalebrew "whalebrew/wget"';

    const structure = parseBrewStructure(input);
    const output = buildOutputContent(structure);

    expect(output).toEqual(expected);
  });

  it('Should have many whalebrew packages', () => {
    const input = ['whalebrew "whalebrew/wget"', 'whalebrew "whalebrew/whalesay"'];
    const expected = 'whalebrew "whalebrew/wget"\nwhalebrew "whalebrew/whalesay"';

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

  it('Should contain 1 of each packages', () => {
    const input = [
      'tap "aws/tap"',
      'brew "xz"',
      'cask "fork"',
      'mas "GarageBand", id: 682658836',
      'whalebrew "whalebrew/wget"',
      'vscode "rome.rome"',
    ];
    const expected =
      'tap "aws/tap"\n\nbrew "xz"\n\ncask "fork"\n\nmas "GarageBand", id: 682658836\n\nwhalebrew "whalebrew/wget"\n\nvscode "rome.rome"';

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
