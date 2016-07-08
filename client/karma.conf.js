const webpackEnv = { test: true }
const webpackConfig = require('./webpack.config')(webpackEnv)
process.env.BABEL_ENV = 'test' // so we load correct babel plugins
const testGlob = 'test/**/*.test.js'

module.exports = function setKarmaConfig(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [testGlob],
        preprocessors: {
            [testGlob]: ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackServer: { noInfo: true },
        webpackMiddleware: { noInfo: true },
        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-webpack',
            'karma-jasmine',
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
        ],
        babelPreprocessor: {
            options: {
                presets: ['react', 'es2015', 'stage-0']
            }
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity
    })
}
