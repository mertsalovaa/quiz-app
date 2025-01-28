module.exports = {
    preset: 'jest-preset-angular', 
    setupFilesAfterEnv: [ "./src/setup-jest.ts" ], 
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json', 
            stringifyContentPathRegex: '\\.html$',
        },
    },
    transform: {
        '^.+\\.(ts|js|html)$': 'jest-preset-angular', 
    },
    testEnvironment: 'jsdom', 
    testMatch: ['<rootDir>/src/**/*.spec.ts'], 
    moduleFileExtensions: ['ts', 'html', 'js', 'json'], 
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    coverageDirectory: '<rootDir>/coverage/', 
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/main.ts',
        '!<rootDir>/src/**/*.module.ts',
        '!<rootDir>/src/**/index.ts',
        '!<rootDir>/src/environments/**',
    ],
    coverageReporters: ['html', 'lcov', 'text-summary'], 
    verbose: true, 
    silent: false,
};