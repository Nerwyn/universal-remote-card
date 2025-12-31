import { defineConfig } from '@rspack/cli';
import rspack from '@rspack/core';

export default defineConfig([
	{
		mode: 'production',
		entry: {
			main: './src/universal-remote-card.ts',
		},
		output: {
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
		plugins: [
			new rspack.ProvidePlugin({
				process: 'process/browser',
			}),
		],
		performance: {
			hints: false,
			maxEntrypointSize: 512000,
			maxAssetSize: 512000,
		},
		devtool: false,
	},
]);
