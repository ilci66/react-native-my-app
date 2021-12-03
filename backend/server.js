import cors from 'cors';
import express from 'express';
import mountRoutes from './routes/index.js';
import dotenv from 'dotenv';
dotenv.config();
// const routes = require('./routes/index.js')


// import {
//     ApolloServer
// } from 'apollo-server-express';

const app = express();
mountRoutes(app);

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

// ==== >> GONNA START IMPLEMENTING THIS
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


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})