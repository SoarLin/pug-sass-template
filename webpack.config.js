const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');



module.exports = (env, options) => {
  // Test webpack 4.x pass enviroment variables
  console.log('env = ', env);
  console.log('options.mode = ', options.mode);

  // Pass variables in to pug files (https://www.npmjs.com/package/pug-html-loader)
  // - add 'options.data' in pug-html-loader to pass into pug
  // Pass variables into Sass/SCSS (https://www.npmjs.com/package/sass-loader#additionaldata)
  // - add 'options.additionalData' in sass-loader to pass variables
  const _gParams = {
    FILE_PREFIX: (options.mode === 'production') ? '/dist/' : '/',
    IMG_PREFIX_URL: (options.mode === 'production') ? 'https://soarlin.github.io/' : '/'
  };

  var config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
      index: './js/index.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './js/[name].js?[hash:8]'
    },
    devServer: {
      compress: true,
      port: 3000,
      stats: {
        assets: true,
        cached: false,
        chunkModules: false,
        chunkOrigins: false,
        chunks: false,
        colors: true,
        hash: false,
        modules: false,
        reasons: false,
        versions: false,
        warnings: false
      }
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: (options.mode === 'production') ? true : false
              }
            },
            {
              loader: 'pug-html-loader',
              options: {
                data: _gParams,
                pretty: true // 美化 HTML 的編排 (不壓縮HTML的一種)
              }
            }
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader', // Creates `style` nodes from JS strings
            'css-loader', // Translates CSS into CommonJS
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                additionalData: "$env: '" + options.mode + "'; $imgPrefix: '" + _gParams.IMG_PREFIX_URL + "';"
              }
            }
          ]
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader', // Creates `style` nodes from JS strings
            'css-loader' // Translates CSS into CommonJS
          ]
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: '[path][name].[ext]?[hash:8]'
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: false
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          { from: 'css', to: 'css' },
          { from: 'images', to: 'images' },
          { from: 'assets', to: 'assets' }
        ]
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery' //這邊以上是新增
      }),
      // For single pug file
      new HtmlWebpackPlugin({
        template: './pug/index.pug',
        filename: 'index.html',
        inject: true,
        chunks: ['index'],
        minify: {
          sortAttributes: true,
          collapseWhitespace: false, // 折疊空白字元就是壓縮Html
          collapseBooleanAttributes: true, // 折疊布林值属性，例:readonly checked
          removeComments: true, // 移除註釋
          removeAttributeQuotes: true // 移除屬性的引號
        }
      }),
    ]
  };

  // For mutiple pug files
  // glob.sync('./src/pug/*.pug').forEach((path) => {
  //   const start = path.indexOf('/pug/') + 5;
  //   const end = path.length - 4;
  //   const name = path.slice(start, end);
  //   config.plugins.push(
  //     new HtmlWebpackPlugin({
  //       template: './pug/' + name + '.pug',
  //       filename: name + '.html',
  //       inject: true,
  //       chunks: ['index'],
  //       minify: {
  //         sortAttributes: true,
  //         collapseWhitespace: false,
  //         collapseBooleanAttributes: true,
  //         removeComments: true
  //       }
  //     })
  //   );
  // });

  return config;
};
