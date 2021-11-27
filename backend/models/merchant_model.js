// now the environment variables work properly
import dotenv from 'dotenv';
dotenv.config();
import toPool from 'pg';

let Pool = toPool.Pool;

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.POSTGRESQL_PORT,
});

// Looks a little strange, gotta understand why

export const getMerchants = () => {
  return new Promise(function(resolve, reject) {
    // they say using * is dangerous for couple of reasons but as I don't have entries yet this should be cool
    pool.query('SELECT * FROM merchants ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      console.log("results ==>", typeof results)
      resolve(results.rows);
    })
  }) 
}
export const createMerchant = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, email } = body
    pool.query('INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new merchant has been added added: ${results.rows[0]}`)
    })
  })
}
// commented the faulty code, leaving as a reminder to myself
// export const deleteMerchant = () => {
export const deleteMerchant = (id) => {
  return new Promise(function(resolve, reject) {
    // const id = parseInt(request.params.id)
    pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Merchant deleted with ID: ${id}`)
    })
  })
}

// 
// module.exports = {
//   getMerchants,
//   createMerchant,
//   deleteMerchant,
// }
