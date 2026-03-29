// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  vue: {
    // Enable or disable specific rules
    overrides: {
      'vue/block-order': ['error', {
        order: [['template', 'script'], 'style'],
      }],
      'no-console': 'off',
      'vue/no-v-text-v-html-on-component': ['error', {
        allow: ['router-link', 'nuxt-link'],
        ignoreElementNamespaces: false,
      }],
      // 'vue/html-self-closing': ['error', {
      //   html: {
      //     normal: 'never',
      //   },
      // }],
    },
  },
  react: {
    overrides: {
      'no-empty-pattern': 'off',
      'no-console': 'off',
      'ts/no-use-before-define': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },

  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,

  formatters: {
    css: true,
  },
}, {
  files: ['packages/onequote-vue/**/*.{ts,tsx,vue,md}'],
  rules: {
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
}, {
  // Override or add specific rules
  files: ['**/**/*.ts'],
  rules: {
    'no-console': 'off',
  },
})
