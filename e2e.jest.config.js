module.exports = {
    roots: ['<rootDir>/e2e'],
    globalSetup: '<rootDir>/jest-global-setup.js',
    globalTeardown: '<rootDir>/jest-global-teardown.js',
    setupFilesAfterEnv: ['<rootDir>/e2e.jest.setup.js'],
    testRegex: '(\\.test)\\.(ts|tsx)$',
};
