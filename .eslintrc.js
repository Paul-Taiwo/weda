module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ["plugin:react/recommended", "airbnb", "prettier", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react", "prettier"],
    rules: {
        "prettier/prettier": "error",
        "arrow-body-style": "off",
        "prefer-arrow-callback": "off",
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
        "react/function-component-definition": [2, { namedComponents: "arrow-function" }],
    },
    settings: {
        "import/resolver": {
            "node": {
                "moduleDirectory": ["node_modules", "./src/"],
            },
        },
    },
};
