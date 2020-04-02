module.exports = {
    roots: ['<rootDir>/.storybook'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    moduleNameMapper: {
        '\\.(css|sass|scss)$': 'identity-obj-proxy',
        '~(.*)$': '<rootDir>/src/$1',
    },
    testRegex: '(\\.test)\\.(ts|tsx)$',
};
