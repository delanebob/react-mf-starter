const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(
  '/static',
  express.static(
    path.join(__dirname, './../dist/static'),
    { maxAge: '7d' }
  )
);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + './../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});