module.exports = {
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    moduleNameMapper: {
        '\\.(css|sass|scss)$': 'identity-obj-proxy',
        '~(.*)$': '<rootDir>/src/$1',
    },
    testRegex: '(\\.test)\\.(ts|tsx)$',
    collectCoverage: true,
    coveragePathIgnorePatterns: ['node_modules', '\\.js'],
};
