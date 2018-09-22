const express = require('express');
const path = require('path');
const parser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const Company = require('../database/index.js');
const handleListen = require('./handleListen.js');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err) => {
  console.log(err || 'MongoDB connected');
});

const app = express();
const PORT = 3003;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(logger('dev'));
// app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/:company', express.static('public'));
app.get('/api/people-also-bought/:company', (req, res) => {
  const { company } = req.params;
  Company.find({ company }, null, (err, result) => {
    if (err) {
      console.log('find company error');
    } else {
      let group = result[0].group;
      console.log('this is groups', group)
      if (group === 8) {
        group = 1;
      } else {
        group += 1;
      }
      Company.find({ group }, null, (err, result) => {
        console.log('made it this far');
        if (err) {
          res.status('302').send(err);
        } else {
          res.json(result);
        }
      });
    }
  });
});


app.listen(PORT, handleListen(console.log, PORT));
