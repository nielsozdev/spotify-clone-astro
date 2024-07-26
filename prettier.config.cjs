/** @type {import("prettier").Config} */
const config = {
  useTabs: false,
  singleQuote: true,
  singleAttributePerLine: true,
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: true,
  jsxSingleQuote: true,
  trailingComma: 'none',
  quoteProps: 'as-needed',
  semi: false,
  astroAllowShorthand: false,
  htmlWhitespaceSensitivity: 'css',
  ...require('prettier-config-standard'),
  pluginSearchDirs: [__dirname],
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    },
  ]
}

module.exports = config
