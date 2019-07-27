module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  plugins: [
    'react'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    "ecmaFeatures": {
      "jsx": true
    }
  },
  rules: {
    "no-unused-vars": "off",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/prop-types": 0
    //"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    //"implicit-arrow-linebreak": "off",
    //"comma-dangle": "off",
    //"indent": "off",
    //"no-trailing-spaces": "off"
  }
}

