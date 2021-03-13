const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;
const Tasks = require('./scripts/tasks');
module.exports = env => {
  return {
    entry: './src/index.js',
    module: {
      rules: [{
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
      ]
    },
    resolve: {
      extensions: ['*', '.js']
    },
    output: {
      path: __dirname + '/build',
      publicPath: '/',
      filename: 'main.js'
    },
    plugins: [
      new WatchExternalFilesPlugin({
        files: [
          './src/**/*.json',
          './src/**/*.txt'
        ]
      }),
      {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
            if (env.LIVE_RELOAD === 'yes') {
              Tasks.buildWithLiveReload();
            } else {
              Tasks.build();
            }
          });
        }
      }
    ]
  };

};