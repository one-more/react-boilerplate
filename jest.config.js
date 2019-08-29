module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "setupFilesAfterEnv": ["<rootDir>/setupTests.js"],
    "moduleNameMapper": {
        "\\.(css|sass|scss)$": "identity-obj-proxy",
        "~(.*)$": "<rootDir>/src/$1",
    },
};
