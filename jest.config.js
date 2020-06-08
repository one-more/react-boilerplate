module.exports = {
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js', 'jest-date-mock'],
    moduleNameMapper: {
        '\\.(css|sass|scss)$': 'identity-obj-proxy',
        '\\.(svg)$': '<rootDir>/mocks/file-mock.js',
        '~(.*)$': '<rootDir>/src/$1',
    },
    testRegex: '(\\.test)\\.(ts|tsx)$',
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        'node_modules',
        '\\.js',
        'global-styles',
        'app-actions',
        'components/layout',
        'i18n',
        'form-error',
        'steps-indicator',
        'context',
        'api/sagas',
        'get-module',
        'layout/index',
    ],
    coverageThreshold: {
        global: {
            lines: 100,
            functions: 90,
            statements: 90,
        },
    },
};
