module.exports = {
  env: {
    browser: true,
  },
  extends: ["airbnb", "prettier"],
  globals: {
    FilteredReactTable: true,
    Immutable: true,
    LOGGER: true,
    PropTypes: true,
    QUnit: true,
    R: true,
    React: true,
    ReactComponent: true,
    ReactDOM: true,
    ReactDOMFactories: true,
    ReactRedux: true,
    Redux: true,
    StringUtilities: true,
  },
  rules: {
    "import/extensions": ["error", { js: "always" }],
    "max-len": ["error", { code: 100, ignoreUrls: true }],
  },
};
