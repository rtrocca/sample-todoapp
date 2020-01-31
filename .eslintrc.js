module.exports = {
    root: true,
    // this allows to use require and browser's globals like "window"
    env: {
        browser: true,
        es6: true,
        node: true,
        jquery: true 
    },
    plugins: [
        'react',
        'jsx-a11y',
        'react-hooks'
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        
    ],
    rules: {
        'import/prefer-default-export': 'off', // this is about using default export for modules where there is only one property exported
        'indent': 'off',
        'max-len': ['warn', {code: 120}],
        'no-param-reassign': 'off',
        'no-multi-assign': 'off', // let a = b = c,
        'no-console': 'error',
        'linebreak-style': 'off', // Allow both LF and CRLF
        'func-names': 'off',
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
        }
        
    },
    overrides: [
        {
            files: ['**/*.ts?(x)'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 2018,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true
                },
                project: "./tsconfig.json"
            },
            plugins: [
                '@typescript-eslint',
            ],
            extends: [
                "eslint:recommended",
                "plugin:react/recommended",
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended",
                'airbnb',
                "plugin:import/typescript",
            ],
            rules: {
                'no-console': 'error',
                'linebreak-style': 'off', // Allow both LF and CRLF
                'react/jsx-filename-extension': 'off',
                'react/destructuring-assignment': 'off',
                'react/prop-types': 'off', // we do not use prop-types in tsx
                'react/destructuring-assignment': 'off',
                "jsx-a11y/anchor-is-valid": "warn",
                "jsx-a11y/alt-text": "warn",
                //'@typescript-eslint/explicit-function-return-type': 'off',
                //'@typescript-eslint/no-this-alias': 'off', // we use $ctrl = this in angularjs files
                //'@typescript-eslint/no-var-requires': 'off' // we need it for importing templates
            },
        }
    ],
    settings: {
        react: {
            version: 'detect'
        }
    }
}
