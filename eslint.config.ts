import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import {
  defineConfigWithVueTs,
  vueTsConfigs,
  configureVueProject,
} from '@vue/eslint-config-typescript'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import unusedImports from 'eslint-plugin-unused-imports'

configureVueProject({
  scriptLangs: ['ts', 'tsx'],
  tsSyntaxInTemplates: true,
})

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-ignore',
    ignores: [
      'assets',
      '!.storybook',
      'src/stories',
      'src/auto-generated',
      'dist',
      'node_modules',
      'coverage',
      '__snapshot__',
      '**/*.js',
      '.idea',
      '.git',
      '.gitignore',
    ],
  },
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
        globals: {
          ...globals.browser,
        },
      },
    },
  },
  vueTsConfigs.recommendedTypeChecked,
  ...pluginVue.configs['flat/recommended'],
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/*.spec.ts'],
  },
  skipFormatting,
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-shadow': [
        'error',
        { builtinGlobals: true, hoist: 'never', allow: [], ignoreOnInitialization: false },
      ],
      'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['off'],
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: false,
          allowNullableBoolean: false,
          allowNullableString: false,
          allowNullableNumber: false,
          allowNullableEnum: false,
          allowAny: false,
          allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
        },
      ],
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      'no-extra-boolean-cast': 'error',
      'no-implicit-coercion': 'error',
      'no-plusplus': 'off',
      'unicode-bom': ['error', 'never'],
      'vue/html-indent': 'off',
      'no-console': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/prefer-as-const': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
)
