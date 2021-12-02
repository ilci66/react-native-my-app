// const users = require('./user')
import drawings from './drawings.js';

export default  app => {
  // app.use('/users', users)
  app.use('/drawings', drawings)
}