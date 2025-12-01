import { defineConfig } from 'eslint/config';

export default defineConfig([
	{
		plugins: { '@typescript-eslint': {} },
		rules: {
			'no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
		},
		ignores: ['node_modules/*', 'dist/*'],
	},
]);
