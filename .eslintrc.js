module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:import/errors',
    ],
    plugins: ['custom-rules'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'import/no-default-export': 2,
        'custom-rules/enforce-data-attributes': 2,
        'import/no-duplicates': 2,
        'import/order': 2,
        'no-restricted-imports': ['error', { patterns: ['../*', '~/modules/*/*'] }],
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/extensions': ['.ts', '.tsx'],
        'import/resolver': {
            webpack: {
                config: 'webpack.config.common.js',
            },
        },
    },
};
