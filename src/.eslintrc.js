module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'react/style-prop-object': 'warn',
    'no-unused-vars': 'warn'
  }
};
