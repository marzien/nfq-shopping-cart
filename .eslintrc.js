module.exports = {
	'env': {
		'browser': true,
		'es6': true,
		'node': true
	},
	globals: {
		angular: true,
		_: true,
		moment: true,
	},
	'extends': 'eslint:recommended',
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'key-spacing': [
			'error', { "beforeColon": false, "afterColon": true }
		],
		'no-trailing-spaces': 'error',
		'space-before-blocks': 'error',
		'space-before-function-paren': ["error", {"anonymous": "always", "named": "ignore"}],
		'keyword-spacing': ["error", { "before": true }],
		'space-in-parens': ["error", "never"],
		'object-curly-spacing': ["error", "always"],
		'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
		'comma-dangle': ['error', 'always-multiline'],
		'indent': ['error', 'tab', { 'SwitchCase': 1 }],
	}
}