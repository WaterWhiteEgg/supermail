module.exports = {
    // 具体看vuecli2的处理学习，webpack的学习
    configureWebpack: {
        resolve: {
            alias: {
                // extensions: ['.js','.vue'],
                'assets': '@/assets',
                'components': '@/components',

            }
        }
    }

}
