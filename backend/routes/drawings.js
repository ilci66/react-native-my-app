import db from '../db/index.js';
// using pool directly for now 
// import pool from '../db/index.js';
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
  console.log("a req came")

  // maybe later get the page number from incoming request in order to limit the items to send
  db.query('SELECT info, ARRAY_AGG(type) type FROM drawing_object_relation INNER JOIN mock_drawing USING(drawing_uid) INNER JOIN mock_object USING(object_uid) GROUP BY info;', [], (err, result) => {
    if (err) {
      console.log("error in get all => ",err)
      res.send("no")
      return next(err)
    }
    console.log("the result in get all ==> ", result.rows)
    let resultArray = [];
    result.rows.forEach(drawing => {
    })
    res.send("yes")
  })
})

// router.post('/')

export default router;