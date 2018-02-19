const path = require('path')

module.exports = {
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
      // 使用 stylus 语言写css， http://stylus-lang.com/try.html#
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  }
}