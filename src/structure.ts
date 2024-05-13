import { z } from 'zod';

type Keys = 'taps' | 'brews' | 'casks' | 'mas' | 'whalebrews' | 'vscodes';
type Block = string[];
export type BrewStructure = Record<Keys, Block>;

export const TapLine = z.string().startsWith('tap');
export type TapLine = z.infer<typeof TapLine>;

export const BrewLine = z.string().startsWith('brew');
export type BrewLine = z.infer<typeof BrewLine>;

export const CaskLine = z.string().startsWith('cask');
export type CaskLine = z.infer<typeof CaskLine>;

export const MasLine = z.string().startsWith('mas');
export type MasLine = z.infer<typeof MasLine>;

export const WhalebrewLine = z.string().startsWith('whalebrew');
export type WhalebrewLine = z.infer<typeof WhalebrewLine>;

export const VscodeLine = z.string().startsWith('vscode');
export type VscodeLine = z.infer<typeof VscodeLine>;

export function isInGroup<TSchema extends z.ZodString, TResult extends z.infer<z.ZodString>>(
  line: string,
  schema: TSchema
): line is TResult {
  return schema.safeParse(line).success;
}
