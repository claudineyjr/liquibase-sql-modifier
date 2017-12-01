module.exports = (app, req, res) => {
  app.get('/', (req, res) => {
    res.render('index');
  });
}