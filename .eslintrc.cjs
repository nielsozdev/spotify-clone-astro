const DEBUG_RULES = {
  'no-console': ['off', { allow: ['error'] }]
}
const EXTRA_GENERAL_RULES = {
  ...DEBUG_RULES,
  'array-bracket-newline': ['error', { multiline: true }],
  'array-bracket-spacing': ['error', 'never'],
  'arrow-parens': ['error', 'always'],
  'brace-style': ['error', '1tbs', { allowSingleLine: true }],
  curly: ['error', 'multi-line'],
  'implicit-arrow-linebreak': ['error', 'beside'],
  'import/extensions': 'off',
  'import/no-unresolved': 'off',
  'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
  'multiline-ternary': ['error', 'always-multiline'],
  'no-extra-parens': ['error', 'all', { ignoreJSX: 'multi-line' }],
  'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
  'no-return-await': 'off',
  'no-undef': 'off',
  'no-var': 'warn',
  'object-curly-spacing': ['error', 'always'],
  'padded-blocks': ['error', { blocks: 'never' }],
  quotes: ['error', 'single'],
  semi: ['error', 'never'],
  strict: 'warn',
  'lines-around-comment': [
    'error', {
      beforeBlockComment: true,
      afterBlockComment: false,
      beforeLineComment: false,
      afterLineComment: false,
      allowBlockStart: true,
      allowBlockEnd: true,
      allowObjectStart: true,
      allowObjectEnd: true,
      allowArrayStart: true,
      allowArrayEnd: true
    },
  ],
  'key-spacing': [
    'error', {
      singleLine: { beforeColon: false, afterColon: true },
      multiLine: { beforeColon: false, afterColon: true }
    },
  ]
}

const EXTRA_TYPESCRIPT_RULES = {
  '@typescript-eslint/no-confusing-void-expression': 'off',
  '@typescript-eslint/no-misused-promises': 'off',
  'no-async-promise-executor': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/strict-boolean-expressions': 'off',
  '@typescript-eslint/restrict-template-expressions': 'off',
  '@typescript-eslint/no-floating-promises': 'off',
  '@typescript-eslint/consistent-type-assertions': 'off',
  '@typescript-eslint/consistent-type-definitions': 'error',
  '@typescript-eslint/no-unused-vars': 'error',
  '@typescript-eslint/member-ordering': 'error',
  '@typescript-eslint/type-annotation-spacing': 'error',
  'typescript-sort-keys/interface': 'error',
  'typescript-sort-keys/string-enum': 'error',
  'keyword-spacing': 'off',
  '@typescript-eslint/keyword-spacing': ['error'],
  'lines-between-class-members': 'off',
  '@typescript-eslint/lines-between-class-members': ['error'],
  'space-before-function-paren': 'off',
  '@typescript-eslint/space-before-function-paren': ['error'],
  'func-call-spacing': 'off',
  '@typescript-eslint/func-call-spacing': ['error'],
  'padding-line-between-statements': 'off',
  '@typescript-eslint/padding-line-between-statements': [
    'error',
    {
      blankLine: 'always',
      prev: ['return', 'var', 'block-like', 'multiline-block-like'],
      next: ['*']//  ["const", "let", "var", "return"]
    },
  ],
  indent: ['error', 2],

  'comma-spacing': 'off',
  '@typescript-eslint/comma-spacing': ['error'],
  'comma-dangle': 'off',
  '@typescript-eslint/comma-dangle': [
    'error', {
      arrays: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline'
    },
  ],
  '@typescript-eslint/no-empty-interface': [
    'error',
    {
      allowSingleExtends: false
    },
  ],
  '@typescript-eslint/member-delimiter-style': [
    'error',
    {
      multiline: { delimiter: 'none', requireLast: true },
      singleline: { delimiter: 'semi', requireLast: false }
    },
  ]
}

/*  */

const REACT_RULES = {
  'react-hooks/exhaustive-deps': 'warn',
  'react-hooks/rules-of-hooks': 'error',
  'react/default-props-match-prop-types': 'warn',
  'react/function-component-definition': ['warn', { namedComponents: 'function-declaration' }],
  'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
  'react/jsx-equals-spacing': ['error', 'never'],
  'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
  'react/jsx-first-prop-new-line': ['error', 'multiline'],
  'react/jsx-handler-names': 'warn',
  'react/jsx-indent-props': ['error', 2],
  'react/jsx-indent': ['error', 2],
  'react/jsx-max-props-per-line': ['error', { maximum: 5, when: 'always' }],
  'react/jsx-no-duplicate-props': ['warn', { ignoreCase: true }],
  'react/jsx-no-undef': 'warn',
  'react/jsx-pascal-case': ['warn', { allowAllCaps: true, ignore: [] }],
  'react/jsx-props-no-multi-spaces': 'error',
  'react/jsx-uses-react': 'off',
  'react/jsx-uses-vars': 'warn',
  'react/no-children-prop': 'off',
  'react/no-deprecated': 'warn',
  'react/no-direct-mutation-state': 'error',
  'react/no-is-mounted': 'warn',
  'react/no-multi-comp': ['warn', { ignoreStateless: true }],
  'react/no-unescaped-entities': 'off',
  'react/prop-types': 'off',
  'react/react-in-jsx-scope': 'off',
  'react/require-render-return': 'warn',
  'react/self-closing-comp': ['warn', { component: true, html: true }],
  'react/jsx-tag-spacing': [
    'error', {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never'
    },
  ],
  'react/jsx-sort-props': [
    'error', {
      callbacksLast: true,
      shorthandFirst: true,
      reservedFirst: true,
      noSortAlphabetically: false,
      ignoreCase: true
    },
  ],
  'react/jsx-wrap-multilines': [
    'warn',
    {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line'

    },
  ]
}

const IMPORT_ORDER_RULES = {
  'import/newline-after-import': ['error', { count: 1 }],
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'unknown'],
      pathGroups: [
        { pattern: 'react', group: 'builtin', position: 'before' },
        { pattern: 'react-dom', group: 'builtin', position: 'after' },
        { group: 'builtin', pattern: 'react-router-dom', position: 'after' },
        { group: 'external', pattern: '@mui/**', position: 'after' },
        { group: 'external', pattern: '@noz/**', position: 'after' },
        { group: 'external', pattern: '@core', position: 'after' },
        { group: 'external', pattern: '@core/**', position: 'after' },
        { pattern: '~/**', group: 'external', position: 'after' },
        { group: 'sibling', pattern: './styles', position: 'after' },
      ],
      'newlines-between': 'always',
      pathGroupsExcludedImportTypes: ['react'],
      warnOnUnassignedImports: true,
      alphabetize: { order: 'asc', caseInsensitive: true }
    },
  ]
}

const TS_RULES = {
  'require-await': 'off',
  '@typescript-eslint/require-await': 'error',
  '@typescript-eslint/restrict-plus-operands': 'off',
  ...EXTRA_TYPESCRIPT_RULES
}

const RULES = {
  'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
  'import/no-unused-modules': 'error',
  'no-use-before-define': ['error', { functions: true, classes: true, variables: true, allowNamedExports: false }],

  ...EXTRA_GENERAL_RULES
}

const ASTRO_PROJECT_RULES = {
  'no-extra-parens': 'off'
}
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    ...RULES,
    ...ASTRO_PROJECT_RULES,
    ...IMPORT_ORDER_RULES
  },
  plugins: ['import'],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      extends: ['plugin:astro/recommended'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {
      }
    },
    {
      files: ['*.js', '*.cjs', '*.mjs', '*.ts'],
      extends: [
        'standard-with-typescript',
        'plugin:react/recommended',
      ],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
        sourceType: 'module',
        ecmaVersion: 'latest'
      },
      rules: {
        ...TS_RULES
      }

    },
    {
      files: ['*.jsx', '*.tsx'],
      extends: [
        'standard-with-typescript',
        'plugin:react/recommended',
      ],
      plugins: ['react', 'react-hooks', 'typescript-sort-keys'],
      rules: { ...TS_RULES, ...REACT_RULES }

    },
  ],
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.d.ts']
      }
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.d.ts']
    }
  },
  ignorePatterns: [
    'cypress/*',
    '**/node_modules/**',
    '**/bak/**',
    '.turbo',
    '.next',
    'public',
    'dist',
    'build',
  ]

}
