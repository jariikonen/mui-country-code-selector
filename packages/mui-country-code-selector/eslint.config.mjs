import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config([
  {
    ignores: ['**/dist'],
  },

  // Import plugin
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { import: importPlugin },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/order': ['warn', { groups: ['builtin', 'external', 'internal'] }],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
    },
  },

  // Base configuration for JavaScript & TypeScript
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs'],
          defaultProject: 'tsconfig.json',
        },
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // JavaScript-specific rules
  {
    files: ['**/*.js', '**/*.mjs'],
    rules: {
      ...tseslint.configs.disableTypeChecked.rules, // Apply eslint rules without type checking
    },
  },

  // TypeScript-specific rules (with type checking)
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      ...tseslint.configs.recommendedTypeChecked.rules,
      ...tseslint.configs.stylisticTypeChecked.rules,
    },
  },

  // React Rules
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      ...reactHooks.configs['recommended-latest'].rules,
      'react/jsx-props-no-spreading': ['error'],
      'react/jsx-no-useless-fragment': ['error'],
      'react/react-in-jsx-scope': 0,
      'react/require-default-props': [
        'error',
        {
          functions: 'defaultArguments',
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],
    },
  },

  // Accessibility - eslint-plugin-jsx-a11y
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
    },
  },

  // Prettier
  {
    plugins: { prettier },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  // General rules
  {
    rules: {
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
        },
      ],
      semi: ['error', 'always'],
      'no-console': ['error'],
      'no-void': ['error'],
      'no-var': ['error'],
      'no-unused-vars': 'off',
      'no-param-reassign': ['error'],
      'class-methods-use-this': ['error'],

      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/prefer-nullish-coalescing': ['error'],

      ...eslintConfigPrettier.rules.flat,
    },
  },
]);
