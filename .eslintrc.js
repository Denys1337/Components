const { eslintVue3Rc } = require('@agritask/frontend-configs');

eslintVue3Rc.rules['no-restricted-imports'][1].paths = [
  {
    name: 'lodash',
    message: 'Please use lodash-es instead.',
  },
];

module.exports = {
  ...eslintVue3Rc,
  globals: {
    google: 'readonly', // eslint fails to recognize google.maps namespace from "googlemaps" module without this
  },
  overrides: [
    ...eslintVue3Rc.overrides,
    {
      files: '*.{ts,js,vue}',
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-closing-bracket-newline': 'off', // conflicts with prettier
        'vue/attributes-order': 'off',
        'vue/require-default-prop': 'off',
        //TODO: we should remove this rule in the scope of this task
        // https://agritask.myjetbrains.com/youtrack/issue/PLAT-2105/Integrate-back-the-typing-removed-in-the-Vue-3-upgrade
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
