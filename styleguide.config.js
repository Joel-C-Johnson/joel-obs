module.exports = {
    components: ['src/components/**/[A-Z]*.jsx','src/hooks/**.js'],
    webpackConfig: {
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader"
          }
        ]
      }
    },
  };