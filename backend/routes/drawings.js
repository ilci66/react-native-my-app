import db from '../db/index.js';
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




router.get('/drawings', (req, res, next) => {
  // I know this is not even close to ideal but just starting
  console.log("a req came")
  db.query('SELECT * FROM mock_drawing', [], (err, result) => {
    if (err) {
      console.log("error in get all => ",err)
      return next(err)
    }
    console.log("the result in get all ==> ", result)
    res.send(result.rows[0])
  })
})



export default router;