// const Pool = require('pg').Pool

import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
let Pool = pg.Pool;

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.POSTGRESQL_PORT,
});

// might use the methods i exported below in the future but for now i wanna try working like this 
// export default pool;

// using this caused couple of errors, or maybe i couldn't figure out how yet, gonna export pool instead and try to work like that first
export default {
  query: (text, params, callback) => {
    const start = Date.now()
    // console.log("pool query made at:", start);
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start
      console.log('executed query', { text, duration, rows: res.rowCount })
      callback(err, res)
    })
  },
  async getClient() {
    const client = await pool.connect()
    const query = client.query
    const release = client.release
    // set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
      console.error('A client has been checked out for more than 5 seconds!')
      console.error(`The last executed query on this client was: ${client.lastQuery}`)
    }, 5000)
    // monkey patch the query method to keep track of the last query executed
    client.query = (...args) => {
      client.lastQuery = args
      return query.apply(client, args)
    }
    client.release = () => {
      // clear our timeout
      clearTimeout(timeout)
      // set the methods back to their old un-monkey-patched version
      client.query = query
      client.release = release
      return release.apply(client)
    }
    return client
  }
}
// instead of importing pg everywhere just import this file