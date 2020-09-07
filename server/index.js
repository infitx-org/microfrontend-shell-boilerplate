const express = require('express');
var jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.get('/api', function generateToken(req, res) {
  res.send({
    access_token: jwt.sign(
      { provider: 'test-server', sessionId: uuidv4() },
      'MY_SECRET_PASSWORD',
      { expiresIn: 60 * 60 }
    ),
  });
});

app.listen(80);
