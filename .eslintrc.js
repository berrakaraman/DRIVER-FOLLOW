//yazım kuralları
module.exports = {
  env: {
    node: true,
    commonjs: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    indent: "off",
    "linebreak-style": "off",
    quotes: "off",
    semi: "off",
  },
};
/*module.exports = {
    'env': {
        'node': true,
        'commonjs': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 12
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};*/
