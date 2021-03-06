const pluginName = 'RemoveCommentsPlugin';

class RemoveCommentsPlugin {
  apply(compiler) {
    console.log('RemoveCommentsPlugin 启动');
    compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
      // compilation可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        if (name.endsWith('.js')) {
          const contents = compilation.assets[name].source();
          const noComments = contents.replace(/\/\*{2,}\/\s?/g, '');
          compilation.assets[name] = {
            source: () => noComments,
            size: () => noComments.length
          }
        }
      }
    })
  }
}
module.exports = RemoveCommentsPlugin;