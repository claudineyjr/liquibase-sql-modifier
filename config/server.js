const express = require('express');
const app = express();
const open = require('open');
const consign = require('consign');
const SERVERPORT = 5500;

const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '1mb'
}));
app.use(bodyParser.json({
  limit: '1mb'
}));

app.use(express.static('./app/public'));

consign()
  .include('./app/routes')
  .then('./app/controllers')
  .into(app)

module.exports = {
  app,
  open,
  SERVERPORT
}