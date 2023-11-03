module.exports = {
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  plugins: [
    require.resolve('prettier-plugin-tailwindcss'),
    '@trivago/prettier-plugin-sort-imports',
  ],
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  importOrderSeparation: false,
}
