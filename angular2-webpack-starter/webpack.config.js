/**
 * @author: @AngularClass
 */

 const autoprefixer = require('autoprefixer');


// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod')({env: 'production',  postcss: [autoprefixer] });
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/webpack.test')({env: 'test',  postcss: [autoprefixer]});
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.dev')({env: 'development',  postcss: [autoprefixer]});
}
