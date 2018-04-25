const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const projectRoot = process.cwd()

module.exports = {
  webpack: {
    common: {
      resolve: {
        alias: {},
        mainFields: ['moduleExternal', 'module', 'main']
      },
      externals: {
        'intl-messageformat': 'intl-messageformat'
      }
    },
    tasks: [
      {
        mode: 'production',
        context: path.join(projectRoot, 'src/'),
        entry: './driver.js',
        externals: [],
        output: {
          path: path.join(projectRoot, 'dist/'),
          filename: 'alpheios-data-models.min.js',
          libraryTarget: 'umd'
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              use: ['source-map-loader'],
              enforce: 'pre'
            },
            {
              test: /\.json$/,
              use: 'raw-loader',
              type: 'javascript/auto' // To prevent running Webpack's default JSON parser on the output of raw-loader
            }
          ]
        },
        optimization: {
          minimizer: [
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: true // set to true if you want JS source maps
            })
          ]
        },
        plugins: []
      }
    ],
    devTasks: [
      {
        mode: 'development',
        context: path.join(projectRoot, 'src/'),
        entry: './driver.js',
        externals: [],
        output: {
          path: path.join(projectRoot, 'dist/'),
          filename: 'alpheios-data-models.js',
          libraryTarget: 'umd'
        },
        devtool: 'source-map',
        module: {
          rules: [
            {
              test: /\.vue$/,
              loader: 'vue-loader'
            },
            {
              test: /\.js$/,
              use: ['source-map-loader'],
              enforce: 'pre'
            },
            {
              test: /\.json$/,
              use: 'raw-loader',
              type: 'javascript/auto' // To prevent running Webpack's default JSON parser on the output of raw-loader
            },
            {
              test: /\.(jpg|png)$/,
              use: [{
                loader: 'url-loader',
                options: {
                  limit: 25000
                }
              }]
            },
            {
              test: /\.svg$/,
              loader: 'vue-svg-loader', // `vue-svg` for webpack 1.x
              options: {
                // optional [svgo](https://github.com/svg/svgo) options
                svgo: {
                  plugins: [
                    {removeDoctype: true},
                    {removeComments: true}
                  ]
                }
              }
            }
          ]
        },
        plugins: []
      }
    ]
  }
}
