module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ],
        "multiline-comment-style": [
            "error",
            "starred-block"
        ],
        "no-unused-vars": [
            "off"
        ],
        "no-trailing-spaces": [
            "error"
        ]
    }
};
