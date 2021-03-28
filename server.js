const express = require('express');
require('dotenv').config();
const app = express();

app.listen(3000, () => console.log('Listening on: 3000'));

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.get('/data', (request, response) => {
  response.send(data);
  console.log(request);
});

const data = [];

// app.use(logger);

app.post('/data', (request, response) => {
  let newData = request.body;

  let newEntry = {
    city: newData.city,
    temp: newData.temp,
    description: newData.description,
    text: newData.text,
    date: newData.date,
    icon: newData.icon,
  };

  data.push(newEntry);
  response.send(data);
  console.log(data);
});

// function logger(req, res, next) {
//   console.log('logger');
//   next();
// }
