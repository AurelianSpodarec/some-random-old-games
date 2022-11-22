const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'] //reverse order
			},
			{
				test: /\.(png|jpg|jpeg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 5000,
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({template: './src/index.html'})
	]

};