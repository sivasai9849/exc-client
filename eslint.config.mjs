import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';

const config = [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'no-console': 'warn',
      'prettier/prettier': 'error',
    },
  },
];

export default config;
