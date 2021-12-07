require('dotenv').config();
// async errors

const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const productRouter = require('./routes/products');

// middleware
app.use(express.json());
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

// routes
app.get('/', (req, res) => {
  res.send('<h1>Storing API</h1><a href="/api/v1/products">Products</a>');
});

app.use('/api/v1/products', productRouter);

// product route
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Port
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.DATABASE_URI);
    app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
