import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// const merchant_model = require('./models/merchant_model');
import {createMerchant, deleteMerchant, getMerchants} from './models/merchant_model.js';

// import {
//     ApolloServer
// } from 'apollo-server-express';

const app = express();

app.use(cors({
  // origin: "http://localhost:3000",
  // methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  // allowedHeaders: ['Content-Type', 'Authorization', "Access-Control-Request-Headers"]
}));

app.use(express.json());

// well I had cors
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//   next();
// });

// const server = new ApolloServer({});

// server.applyMiddleware({
//     app,
//     path: '/graphql'
// });

// app.listen({
//     port: 8000
// }, () => {
//     console.log('Apollo Server on http://localhost:8000/graphql');
// });

const port = process.env.PORT;

// create a routes folder for these later maybe, cluttering here is not athe best way to do it

app.get('/', (req, res) => {
  console.log("a request's been made")
  getMerchants()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
});

app.post('/merchants', (req, res) => {
  createMerchant(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.delete('/merchants/:id', (req, res) => {
 deleteMerchant(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})