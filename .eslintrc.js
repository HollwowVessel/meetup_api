module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      extends: ['xo-typescript'],
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/object-curly-spacing': 'off',
        'new-cap': 'off',
        'no-template-curly-in-string': 'off',
        '@typescript-eslint/comma-dangle': 'off',
      },
    },
  ],
  extends: ['xo', 'prettier'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/indent': 0,
    'no-constant-binary-expression': 0,
  },
};
