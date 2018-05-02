const webpack = require('webpack');
const path = require('path');
const pluginConfig = require('./package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = function (env) {
    const libraryName = pluginConfig.name;
    const isProd = env.NODE_ENV === "production";
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
                  plugins: function() {
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
            vendors: __dirname + '/src/vendors.js', 
            [pluginConfig.name]: __dirname + '/src/plugin.js',
        },
        output: {
            path: __dirname + '/dist',
            filename: isProd ? '[name]' + '.min.js' : '[name]' + '.js',
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
                        test: __dirname + '/src/vendors.js',
                        name: "vendors",
                        enforce: true,
                        chunks: 'initial'
                    },
                },
            },
        },

        plugins: [
            new ExtractTextPlugin({
                disable: !isProd,
                filename: isProd ? '[name].min.css' : '[name].css',
            })
        ]
    }
}