const express = require('express');
const morgan = require('morgan');
const path = require('path');
// const proxy = require('express-http-proxy');
var proxy = require('http-proxy-middleware');
// const app = express();
const port = process.env.PORT || 3000;
// app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));
// app.listen(3000);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/:company', express.static(path.join(__dirname, 'public')));
app.use('/api', proxy('localhost:3001'));
app.use('/data/company', proxy('localhost:3002'));
app.use('people-also-bought', proxy('localhost:3003'));
app.use('stocks/sideBar', proxy('localhost:3004'));


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
