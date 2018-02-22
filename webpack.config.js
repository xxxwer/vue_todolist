const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'dev'
const ExtractPlugin = require('extract-text-webpack-plugin')

const config = {
  target: 'web',
  // 打包开始的入口文件
  entry: path.join(__dirname, 'src/index.js'),
  // 打包完成后 输出的文件 和 目录
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },

  module: {
    rules: [
      // webpack 加载 打包 .vue 的文件
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // webpack 加载 打包 .jsx 的文件
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      // webpack 加载 打包 .css 的文件
      {
        test: /\.css$/,
        use: [
          'style-loader', //该 loader 将 css 写入js里面, 最终页面渲染时用 js 代码加载css
          'css-loader'
        ]
      },
      // webpack 加载 打包 图片 的文件，需要 style-loader url-loader file-loader
      {
        test: /\.(jpg|gif|jpeg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024, // 限制图片大小，只有小于1024的图片才会转为 base64 码
            name: '[name]-x.[ext]'
          }
        }
      },
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"dev"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
}

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8100,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
  config.module.rules.push(
    // 使用 stylus 语言写css， http://stylus-lang.com/try.html#
    {
      test: /\.styl$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }
  )
} else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue'],
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    // 使用 stylus 语言写css， http://stylus-lang.com/try.html#
    {
      test: /\.styl$/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      })
    }
  )
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}

module.exports = config