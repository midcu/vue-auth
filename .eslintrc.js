module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        quotes: "off",
        semi: 'off',
        "space-before-function-paren": 'off',
        "no-unused-expressions": 'off',
        indent: ['error', 4],
        'vue/html-indent': ['error', 4],
        'import/no-webpack-loader-syntax': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/component-definition-name-casing': ['error', 'kebab-case'],
        'vue/require-prop-types': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
}
