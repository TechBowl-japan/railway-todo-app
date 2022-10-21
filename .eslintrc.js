module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "standard",
        "prettier"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "object-shorthand": "off",
        "react/react-in-jsx-scope": "off",
        "no-unused-vars": "warn",
        "react/prop-types": "warn",
        "no-undef": "warn",
        "react-hooks/exhaustive-deps": "off",
    }
}
