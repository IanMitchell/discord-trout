const express = require('express');
const { createServer } = require('http');
const dotenv = require('dotenv');
const handleRequest = require('./api/index.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.post('/', (req, res) => {
  console.log("Incoming request: " + req)
  handleRequest(req, res);
});

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});