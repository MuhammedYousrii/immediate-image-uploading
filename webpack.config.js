const webpack = require('webpack');
const path = require('path');
const pluginConfig = require('./package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const htmlGen = require('html-webpack-plugin');

module.exports = function (env) {
    const libraryName = pluginConfig.name;
    const isProd = env.NODE_ENV === 'production';
    const sass = function () {
        let config;
        //If Production mode
        if (isProd) {
            //Extract all Css Into single file
            config = ExtractTextPlugin.extract({
                fallback: 'style-loader',
                publicPath: '../',
                allChunks: true,
                use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    //   require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'resolve-url-loader'
                    }, {
                        loader: 'sass-loader'
                    }
                ]
            });

            return config;
        }
        // if Development Mode
        config = ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader'];
        return config;
    };


    return {
        entry: {
            vendors: path.join(__dirname, 'src/vendors.js'),
            [libraryName]: path.join(__dirname, 'src/plugin.js')
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: isProd ? `${'[name].min.js'}` : `${'[name].js'}`,
            chunkFilename: '[name].js',
            library: pluginConfig.name,
            libraryTarget: 'umd',
            umdNamedDefine: true
        },

        module: {
            rules: [

                // JS LOADER
                {
                    test: /.js?$/,
                    exclude: [
                        path.resolve(__dirname, 'node_modules'),
                        path.resolve(__dirname, 'bower_components')
                    ],

                    use: {
                        loader: 'babel-loader',
                    }

                },

                // PUG LOADER
                {
                    test: /\.pug$/,
                    exclude: path.resolve(__dirname, 'node_modules/'),
                    use: [{
                        loader: 'pug-loader'
                    }]
                },

                // SASS LOADER
                {
                    test: /\.scss$/,
                    exclude: path.resolve(__dirname, 'node_modules'),
                    use: sass(isProd)
                },

            ]
        },

        optimization: {
            splitChunks: {
                // chunks: 'all',
                cacheGroups: {
                    vendors: {
                        test: path.join(__dirname, 'src/vendors.js'),
                        name: "vendors",
                        enforce: true,
                        chunks: 'initial'
                    },
                },
            },
        },

        devServer: {
            // Serve Content From Dist Folder
            contentBase: path.join(__dirname, 'dist'),
            // Compress With Gzip
            compress: true,
            port: 8080,
            // OPEN IN SPECIFIC BROWSER
            open: 'chrome',
            // ENABLE HOT MODULE REPLACEMENT 
            hot: true,
            // WATCHING CONTENT BASE 
            watchContentBase: true,

            // SUPPORT HISTORY APIS
            historyApiFallback: true,


            // WATCHING CONFIG
            watchOptions: {
                aggregateTimeout: 500,
                ignored: './node_modules/',
                poll: 1000,
            },

            /* DEVELOPMENT-SERVER STATE */
            stats: {
                colors: true,
                providedExports: true,
                depth: true

            }
        },


        plugins: [
            new ExtractTextPlugin({
                disable: !isProd,
                filename: isProd ? '[name].min.css' : '[name].css',
            }),
            new webpack.HotModuleReplacementPlugin(),
            new htmlGen({
                filename: 'index.html',
                title: libraryName,
                minify: {
                    collapseWhitespace: isProd,
                    collapseBooleanAttributes: isProd
                },
                cache: true,
                hash: !isProd,
                // favicon: path.resolve(__dirname, '../favicon.ico'),
                template: path.resolve(__dirname, `src/index.${pluginConfig.htmlPreprocessor 
                    ? pluginConfig.htmlPreprocessor : 'html'}`),
            })
        ]

    };
};