const autoprefixer = require('autoprefixer')

// css 编译完成后，会调用postcss， 现在 postcss 调用 autoprefixer 去处理css，autoprefixer 会加入不同浏览器对应的css属性 如 -webkit* -moz*
module.exports = {
  plugins: [
    autoprefixer()
  ]
}