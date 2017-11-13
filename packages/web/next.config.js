module.exports = {
	webpack: config => {
		config.module.rules.push({
			test: /\.css$/,
			use: [
				{
					loader: 'emit-file-loader',
					options: {
						name: 'dist/[path][name].[ext].js'
					}
				},
				{
					loader: 'babel-loader',
					options: {
						presets: ['next/babel'],
						plugins: [
							require.resolve('babel-plugin-transform-es2015-modules-commonjs')
						]
					}
				},
				'styled-jsx-css-loader'
			]
		})

		return config
	}
}
