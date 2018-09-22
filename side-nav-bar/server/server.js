const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const parser = require('body-parser');
const sideBar = require('./router/sideBar');
const db = require('../db/db.js');
const logger = require('morgan');
const app = express();
const PORT = 3004;
app.use(parser.json());
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/:company', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

mongoose.connect('mongodb://localhost/fecdata', {useNewUrlParser: true}, (err) => {
	console.log(err||"mongoDB connected!")
});

app.get('/api/sideBar/:companyName', (req, res) => {
  const company = req.params.companyName;
  console.log(company);
  db.find({ companyName: company }, null, (err, company) => {
    if (err) {
      res.status('302').send(err);
    }
    return res.json(company);
  });
});

app.use('/api/sideBar', sideBar);


app.listen(PORT, () => {
  console.log("Listening to port: ", PORT);
});
