module.exports = (application, req, res) => {
  application.get('/', (req, res) => {
    res.render('index', { message: {} });
  });

  application.post('/file-modifier', (req, res) => {
    application.app.controllers.fileModifier.modify(application, req, res);
    res.render('index', { message: [{ msg: 'Arquivos gerados com sucesso!' }] })
  });
}