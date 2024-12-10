import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nextEslintPluginNext from '@next/eslint-plugin-next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends('next', 'next/core-web-vitals', 'eslint:recommended'),
  {
    plugins: {
      '@next/next': nextEslintPluginNext,
    },
    rules: {
      quotes: ['error', 'single'],
      indent: ['warn', 2],
    },
  },
];
