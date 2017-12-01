const { app, open, SERVERPORT } = require('./config/server');

app.listen(SERVERPORT, (req, res) => {
  console.log('Servidor rodando em: ' + SERVERPORT);
});