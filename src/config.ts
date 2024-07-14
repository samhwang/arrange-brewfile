import { Keys } from './structure';

/**
 * Config for excluding optional tools like mas, whalebrew, and vscode.
 * These are not required to be installed, only tap, cask and brew.
 */
export type ExcludeOptionalConfig = Record<Extract<Keys, 'mas' | 'whalebrew' | 'vscode'>, boolean>;
export const DEFAULT_EXCLUDE_OPTIONAL_CONFIG: ExcludeOptionalConfig = {
  mas: false,
  whalebrew: false,
  vscode: false,
};
