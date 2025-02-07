const path = require('path');
const webpack = require('webpack')
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env')
} );

module.exports = function(env) {
  const production = process.env.NODE_ENV === 'production';
  return {
    devtool: production ? 'source-maps' : 'eval',
    entry: './js/app.js',
    output: {
      path: path.resolve(__dirname, '../priv/static/js'),
      filename: '[name].bundle.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: '/js'
              }
            }
          ]
        },
      ],
    },
    resolve: {
      modules: ['node_modules', path.resolve(__dirname, 'js')],
      extensions: ['.js', '.jsx'],
    },
    optimization: {
      minimize: true,
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          antdVendor: {
            test: /[\\/]node_modules[\\/](antd)[\\/]/,
            name: "antd"
          },
          chartjsVendor: {
            test: /[\\/]node_modules[\\/](chart.js)[\\/]/,
            name: "chartjs"
          },
          flowVendor: {
            test: /[\\/]node_modules[\\/](react-flow-renderer)[\\/]/,
            name: "reactflow"
          },
          apolloVendor: {
            test: /[\\/]node_modules[\\/](@apollo)[\\/]/,
            name: "apollo"
          },
          amplitudeVendor: {
            test: /[\\/]node_modules[\\/](amplitude-js)[\\/]/,
            name: "amplitude"
          },
          antDesignVendor: {
            test: /[\\/]node_modules[\\/](@ant-design)[\\/]/,
            name: "antdesign"
          },
          auth0Vendor: {
            test: /[\\/]node_modules[\\/](@auth0)[\\/]/,
            name: "auth0"
          },
          utilityVendor: {
            test: /[\\/]node_modules[\\/](lodash|moment)[\\/]/,
            name: "utility"
          },
          sanitizeVendor: {
            test: /[\\/]node_modules[\\/](sanitize-html)[\\/]/,
            name: "sanitize"
          },
          reactReduxVendor: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-redux|redux)[\\/]/,
            name: "reactredux"
          },
          vendor: {
            test: /[\\/]node_modules[\\/](!antd)(!chart.js)(!react-flow-renderer)(!@apollo)(!amplitude-js)(!@ant-design)(!@auth0)(!lodash)(!moment)(!sanitize-html)(!react)(!react-dom)(!react-redux)(!redux)[\\/]/,
            name: "vendor"
          },
        },
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.SELF_HOSTED': true
      }),
    ],
  };
};
