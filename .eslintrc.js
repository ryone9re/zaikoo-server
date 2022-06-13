module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'semi': ['error', 'always'],
    'semi-spacing': ['error', {'after': true, 'before': false}],
    'semi-style': ['error', 'last'],
    'no-extra-semi': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error'
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  overrides: [
    {
      files: ["src/**/*.{js,ts}"],
      rules: {
        "import/order": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "parent",
              "sibling",
              "index",
              "object",
              "type",
            ],
            pathGroups: [
              {
                pattern: "@alias/**",
                group: "parent",
                position: "before",
              },
            ],
            alphabetize: {
              order: "asc",
            },
            "newlines-between": "always",
          },
        ],
      },
    },
  ]
};
