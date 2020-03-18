const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) FIRST MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use((req,res,next) => {
  console.log('Hello from app middleware 👋');
  next();
});
app.use((req, res, next) => {
 req.requestTime = new Date().toISOString();
  next();
  
});

// 2) ROUTE HANDLERS 



// 3) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

  
//  4) START SEVER
module.exports = app;