import { defineConfig } from '@rspack/cli';
import { execSync } from 'child_process';

let env =
	execSync('git branch --show-current').toString().trim() == 'main'
		? 'production'
		: 'development';
env = 'production';

export default defineConfig([
	{
		mode: env,
		entry: {
			main: './src/universal-remote-card.ts',
		},
		output: {
			path: './dist',
			filename: 'universal-remote-card.min.js',
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js'],
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
				},
				{
					test: /\.(jsx?|tsx?)$/,
					loader: 'minify-html-literals-loader',
				},
				{
					test: /\.m?js/,
					resolve: {
						fullySpecified: false,
					},
				},
			],
		},
		performance: {
			hints: false,
			maxEntrypointSize: 512000,
			maxAssetSize: 512000,
		},
		devtool: env == 'production' ? false : 'eval',
	},
]);
