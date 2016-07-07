const webpack = require('webpack')
const { resolve } = require('path')
const isProd = process.env.NODE_ENV === 'production'
const isTest= process.env.NODE_ENV === 'test'
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {

    const addPlugin = (add, plugin) => add ? plugin : undefined
    const ifProd = plugin => addPlugin(env.prod, plugin)
    const removeEmpty = array => array.filter(i => !!i)

    return {
        entry: {
            app: './index.js'
        },
        output: {
            filename: 'bundle.js',
            path: resolve(__dirname, 'dist'),
            pathinfo: true
        },
        context: resolve(__dirname, 'src'),
        devtool: isProd ? 'source-map' : 'eval',
        bail: env.prod,
        module: {
            loaders: [
                {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
                {test: /\.css$/, loader: 'style!css'}
            ]
        },
        plugins: removeEmpty([
            new HtmlWebpackPlugin({
                template: './index.html'
            }),

            ifProd(new webpack.optimize.DedupePlugin()),

            ifProd(new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            })),

            ifProd(new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            })),

            ifProd(new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true,
                    warnings: false
                }
            }))
        ])
    }
}
