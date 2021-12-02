// import db from '../db/index.js';
// using pool directly for now 
import pool from '../db/index.js';
import express from 'express';
const router = express.Router();
// Example usage

// const db = require('../db')
// app.get('/:id', (req, res, next) => {
//   db.query('SELECT * FROM users WHERE id = $1', [req.params.id], (err, result) => {
//     if (err) {
//       return next(err)
//     }
//     res.send(result.rows[0])
//   })
// })




router.get('/', async (req, res, next) => {
  // I know this is not even close to ideal but just starting
  console.log("a req came")
  // console.log(pool)

  // I could use te pool.query method now , after my break i will try those out
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT * FROM mock_drawing', (err, result) => {
      release()
      if (err) {
        res.send("no!");
        return console.error('Error executing query', err.stack);

      }
      console.log(result.rows)
      res.send("yes")
    })
  })


  // db.query('SELECT * FROM mock_drawing', ["stuff"], (err, result) => {
  //   if (err) {
  //     console.log("error in get all => ",err)
  //     return next(err)
  //   }
  //   console.log("the result in get all ==> ", result)
  //   res.send()
  // })
})

// router.post('/')

export default router;