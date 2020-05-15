/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
    mutator: 'typescript',
    packageManager: 'npm',
    reporters: ['html', 'clear-text', 'progress', 'dashboard'],
    testRunner: 'jest',
    coverageAnalysis: 'off',
    thresholds: { high: 100, low: 100, break: 99 },
    mutate: [
        'src/**/*.ts',
        '!src/**/*.tsx',
        '!src/**/*.test.ts',
        '!src/**/*.stories.tsx',
        '!src/routes.ts',
    ],
};
