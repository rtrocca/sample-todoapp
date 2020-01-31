module.exports = {
    root: true,
    
    parser: '@typescript-eslint/parser',
    // this allows to use require and brower's globals like "window"
    env: {
        browser: true,
        es6: true,
        node: true,
        jquery: true 
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'jsx-a11y',
        'react-hooks'
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        'airbnb',
        "plugin:import/typescript",
    ],
    rules: {
        'import/prefer-default-export': 'off', // this is about using default export for modules where there is only one property exported
        'indent': 'off',
        'max-len': ['warn', {code: 120}],
        'no-param-reassign': 'off',
        'no-multi-assign': 'off', // let a = b = c,
        'no-console': 'error',
        'react/prop-types': 'off', // we do not use prop-types in tsx
        'linebreak-style': 'off', // Allow both LF and CRLF
        'func-names': 'off',
        'react/jsx-filename-extension': 'off',
        "jsx-a11y/anchor-is-valid": "warn",
        "jsx-a11y/alt-text": "warn",
        'react/destructuring-assignment': 'off',
        
    },
    globals: {
        "_": "readonly",
        "angular": "readonly"
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        },
        project: "./tsconfig.json"
    },
    overrides: [
        {
            files: ['**/*.js?(x)'],
            parserOptions: {
                ecmaVersion: 2018,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true
                },
            },
            plugins: [
            ],
            extends: [
                "eslint:recommended",
                "plugin:react/recommended"
            ],
            rules: {
                'no-console': 'error',
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/no-this-alias': 'off', // we use $ctrl = this in angularjs files
                '@typescript-eslint/no-var-requires': 'off' // we need it for importing templates
            },
        }
    ],
    settings: {
        react: {
            version: 'detect'
        }
    }
}
