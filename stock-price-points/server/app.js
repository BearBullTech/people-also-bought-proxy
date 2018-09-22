const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const database = require('../database/index.js');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/stockPricePoints/:company', (req, res) => {
  const { company } = req.params;

  database.Company.find({ company }, null, (err, result) => {
    if (err) {
      return console.log('CALLBACK ERROR!');
    }
    return res.json(result);
  });
});

module.exports = {
  app,
};
