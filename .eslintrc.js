module.exports = {
    rules: {
        semi: [2, 'always', { omitLastInOneLineBlock: true }],
        'semi-spacing': [2, { before: false, after: true }],
        'wrap-iife': [2, 'inside'],
        'no-use-before-define': [2, 'nofunc'],
        'no-caller': 2,
        'no-cond-assign': [2, 'except-parens'],
        'no-constant-condition': 2,
        'no-debugger': 2,
        'no-dupe-args': 2,
        'no-dupe-keys': 2,
        'no-duplicate-case': 2,
        'no-empty': [2, { allowEmptyCatch: true }],
        'no-extra-boolean-cast': 2,
        'no-extra-semi': 2,
        'no-func-assign': 2,
        'no-new': 2,
        'no-sparse-arrays': 2,
        'no-undef': 2,
        'no-unexpected-multiline': 2,
        'no-unreachable': 2,
        'no-unused-vars': [2, { vars: 'all', args: 'after-used' }],
        strict: 2,
        'max-params': [2, 5],
        'max-depth': [2, 4],
        'no-eq-null': 0,
        'no-unused-expressions': 0,
        'dot-notation': 2,
        'use-isnan': 2,

        // Best practices
        'block-scoped-var': 2,
        complexity: 2,
        curly: [2, 'multi-line'],
        eqeqeq: [2, 'always', { null: 'ignore' }],
        'no-else-return': 2,
        'no-extra-bind': 2,
        'no-implicit-coercion': 2,
        'no-return-assign': 0,
        'no-sequences': 2,
        yoda: 2,

        // Variables
        'no-restricted-globals': [2, 'fdescribe', 'fit'],
        'no-var': 1,

        // Codestyle
        'arrow-parens': [2, 'as-needed'],
        'array-bracket-spacing': [2, 'never'],
        'brace-style': [2, '1tbs', { allowSingleLine: true }],
        camelcase: [2, { properties: 'never' }],
        'comma-dangle': ['warn', 'always-multiline'],
        'comma-spacing': [2, { before: false, after: true }],
        'eol-last': 2,
        'func-call-spacing': 2,
        'block-spacing': 2,
        'keyword-spacing': [2, { before: true, after: true }],
        'max-len': [2, {
            code: 120,
            ignoreUrls: true,
            ignoreRegExpLiterals: true,
            ignoreTemplateLiterals: true,
            ignorePattern: 'require',
        }],
        'no-lonely-if': 2,
        'no-mixed-spaces-and-tabs': 2,
        'no-multi-spaces': 2,
        'no-multiple-empty-lines': [2, { max: 1, maxBOF: 0, maxEOF: 0 }],
        'no-trailing-spaces': 2,
        'no-unneeded-ternary': 2,
        'no-nested-ternary': 2,
        'object-curly-spacing': [2, 'always'],
        'one-var-declaration-per-line': [2, 'initializations'],
        'one-var': [2, { let: 'never', const: 'never' }],
        'operator-linebreak': [2, 'after'],
        'padded-blocks': [2, 'never'],
        'quote-props': [2, 'as-needed', { numbers: true }],
        quotes: [2, 'single', { avoidEscape: true }],
        'space-before-blocks': [2, 'always'],
        'space-before-function-paren': [2, 'never'],
        'space-in-parens': 2,
        'no-console': [2, { allow: ['assert', 'error', 'warn'] }],
        'key-spacing': [2, { beforeColon: false, afterColon: true, mode: 'strict' }],
        'space-infix-ops': 2,

        // REACT
        // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
        'jsx-quotes': [2, 'prefer-double'],
        'react/jsx-boolean-value': 2,
        'react/destructuring-assignment': 2,
        'react/display-name': 0,
        'react/forbid-component-props': 2,
        'react/forbid-prop-types': [2, { forbid: ['any', 'array', 'object'] }],
        'react/jsx-closing-tag-location': 2,
        'react/jsx-equals-spacing': 2,
        'react/jsx-first-prop-new-line': [2, 'multiline'],
        'react/jsx-handler-names': 0,
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-key': 2,
        'react/jsx-no-bind': 2,
        'react/jsx-no-duplicate-props': 2,
        'react/jsx-no-literals': 0,
        'react/jsx-no-undef': 2,
        'react/jsx-sort-props': 0,
        'react/jsx-tag-spacing': [2, { beforeClosing: 'never', beforeSelfClosing: 'always' }],
        'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 2,
        'react/jsx-wrap-multilines': 2,
        'react/no-find-dom-node': 2,
        'react/no-multi-comp': 0,
        'react/no-set-state': 0,
        'react/prop-types': 0, // не находит propTypes в decl()
        'react/react-in-jsx-scope': 2,
        'react/require-optimization': 0,
        'react/self-closing-comp': 2,
        'react/style-prop-object': 2,
        'react/void-dom-elements-no-children': 2,
    },
};