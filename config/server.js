const express = require('express');
const app = express();
const open = require('open');
const consign = require('consign');
const SERVERPORT = 5500;


app.set('view engine', 'ejs');
app.set('views', './app/views');

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