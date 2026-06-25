// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['dist/**', 'coverage/**', 'node_modules/**', 'src/data/**', '*.tgz'],
    },
    {
        files: ['**/*.{ts,mts,cts}'],
        extends: [
            eslint.configs.recommended,
            tseslint.configs.recommendedTypeChecked,
            tseslint.configs.stylisticTypeChecked,
        ],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    fixStyle: 'inline-type-imports',
                },
            ],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-unnecessary-condition': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/prefer-nullish-coalescing': 'error',
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/array-type': [
                'error',
                {
                    default: 'array-simple',
                },
            ],
            eqeqeq: ['error', 'always', { null: 'ignore' }],
            'no-console': 'error',
            'prefer-const': 'error',
            'no-var': 'error',
            'object-shorthand': ['error', 'always'],
        },
    },
    {
        files: ['**/*.{test,spec}.{ts,mts,cts}'],
        rules: {
            'no-console': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
        },
    },
    {
        files: ['**/*.config.{js,ts,mjs,cjs}', 'eslint.config.js'],
        rules: {
            ...tseslint.configs.disableTypeChecked.rules,
        },
    },
);
