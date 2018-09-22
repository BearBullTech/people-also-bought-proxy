const express = require('express');
const morgan = require('morgan');
const path = require('path');
const parser = require('body-parser');
const logger = require('morgan');
var proxy = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/:company', express.static(path.join(__dirname, 'public')));
app.use('/api/graph/', proxy({target:'http://localhost:3001'}));
app.use('/api/stockPricePoints/', proxy({target:'http://localhost:3002'}));
app.use('/api/people-also-bought/', proxy({target:'http://localhost:3003'}));
app.use('/api/sideBar/', proxy({target:'http://localhost:3004'}));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
