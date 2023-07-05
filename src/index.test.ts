import { describe, it, expect, vi } from 'vitest';
import { parseBrewStructure, buildOutputContent } from './index';

const consoleErrorSpy = vi.spyOn(console, 'error');
consoleErrorSpy.mockImplementation(() => {});

describe('parseBrewStructure', () => {
  it("Should return empty if input doesn't have content", () => {
    const input = [''];
    const expected = [[], [], [], []];
    expect(parseBrewStructure(input)).toEqual(expected);
  });

  it('Should add a tap', () => {
    const input = ['tap "aws/tap"'];
    const expected = [['tap "aws/tap"'], [], [], []];
    expect(parseBrewStructure(input)).toEqual(expected);
  });

  it('Should add and sort taps', () => {
    const input = ['tap "beeftornado/rmtree"', 'tap "aws/tap"'];
    const expected = [['tap "aws/tap"', 'tap "beeftornado/rmtree"'], [], [], []];
    expect(parseBrewStructure(input)).toEqual(expected);
  });

  it('Should add a brew', () => {
    const input = ['brew "ack"'];
    const expected = [[], ['brew "ack"'], [], []];
    expect(parseBrewStructure(input)).toEqual(expected);
  });

  it('Should add and sort brews', () => {
    const input = ['brew "xz"', 'brew "ack"'];
    const expected = [[], ['brew "ack"', 'brew "xz"'], [], []];
    expect(parseBrewStructure(input)).toEqual(expected);
  });

  it('Should add a cask', () => {
    const input = ['cask "fork"'];
    const expected = [[], [], ['cask "fork"'], []];
    expect(parseBrewStructure(input)).toEqual(expected);
  });

  it('Should add and sort casks', () => {
    const input = ['cask "fork"', 'cask "canva"'];
    const expected = [[], [], ['cask "canva"', 'cask "fork"'], []];
    expect(parseBrewStructure(input)).toEqual(expected);
  });

  it('Should add vscode package', () => {
    const input = ['vscode "rome.rome"'];
    const expected = [[], [], [], ['vscode "rome.rome"']];
    expect(parseBrewStructure(input)).toEqual(expected);
  });

  it('Should add and sort vscode packages', () => {
    const input = ['vscode "rome.rome"', 'vscode "esbenp.prettier"'];
    const expected = [[], [], [], ['vscode "esbenp.prettier"','vscode "rome.rome"']];
    expect(parseBrewStructure(input)).toEqual(expected);
  });

  it('Should ignore invalid lines', () => {
    const input = ['blah "blah.blah"'];
    const expected = [[], [], [], []];
    expect(parseBrewStructure(input)).toEqual(expected);
    expect(consoleErrorSpy).toBeCalled();
  });
});

describe('buildOutputContent', () => {
  it('Should return blank if input is empty', () => {
    const input = [[], [], []];
    const expected = '';
    expect(buildOutputContent(input)).toEqual(expected);
  });

  it('Should have a tap', () => {
    const input = [['tap "aws/tap"'], [], []];
    const expected = 'tap "aws/tap"';
    expect(buildOutputContent(input)).toEqual(expected);
  });

  it('Should have many taps', () => {
    const input = [['tap "aws/tap"', 'tap "beeftornado/rmtree"'], [], []];
    const expected = 'tap "aws/tap"\ntap "beeftornado/rmtree"';
    expect(buildOutputContent(input)).toEqual(expected);
  });

  it('Should have a brew', () => {
    const input = [[], ['brew "ack"'], []];
    const expected = 'brew "ack"';
    expect(buildOutputContent(input)).toEqual(expected);
  });

  it('Should have many brews', () => {
    const input = [[], ['brew "ack"', 'brew "xz"'], []];
    const expected = 'brew "ack"\nbrew "xz"';
    expect(buildOutputContent(input)).toEqual(expected);
  });

  it('Should have a cask', () => {
    const input = [[], [], ['cask "fork"']];
    const expected = 'cask "fork"';
    expect(buildOutputContent(input)).toEqual(expected);
  });

  it('Should have many casks', () => {
    const input = [[], [], ['cask "canva"', 'cask "fork"']];
    const expected = 'cask "canva"\ncask "fork"';
    expect(buildOutputContent(input)).toEqual(expected);
  });

  it('Should have a vscode package', () => {
    const input = [[], [], [], ['vscode "rome.rome"']];
    const expected = 'vscode "rome.rome"';
    expect(buildOutputContent(input)).toEqual(expected);
  });

  it('Should have many packages', () => {
    const input = [[], [], [], ['vscode "esbenp.prettier"', 'vscode "rome.rome"']];
    const expected = 'vscode "esbenp.prettier"\nvscode "rome.rome"';
    expect(buildOutputContent(input)).toEqual(expected);
  })

  it('Should have 1 tap 1 brew 1 cask with a newline between them', () => {
    const input = [['tap "aws/tap"'], ['brew "ack"'], ['cask "canva"'], ['vscode "rome.rome"']];
    const expected = 'tap "aws/tap"\n\nbrew "ack"\n\ncask "canva"\n\nvscode "rome.rome"';
    expect(buildOutputContent(input)).toEqual(expected);
  });
});
