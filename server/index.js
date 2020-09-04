const { v4: uuidv4 } = require('uuid');
const express = require('express');

const app = express();

app.get('/api', function generateToken(req, res) {
  res.send({
    access_token: uuidv4(),
  });
});

app.listen(3000);
