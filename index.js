const fs = require('fs');
const variaveis = require('./variaveis');
const fileName = variaveis.nomeDoArquivo;
const outputFile = './output.sql';
const readLine = require('readline')
  .createInterface({
    input: fs.createReadStream(fileName)
  })

  const matricula = variaveis.matricula;
  var idTransacao = variaveis.numeroInicial;

fs.stat(fileName, function(err, fileStat) {
  if (err) {
      if (err.code == 'ENOENT') {
          console.log('Does not exist.');
      }
  } else {
      if (fileStat.isFile()) {
        fs.appendFile(outputFile, '--liquibase formatted sql\n', (err) => {
          if(err){
            throw err;
          }
        });
          console.log('File found.');
          readLine.on('line', (line) => {
            let linhaLiquibase = '--changeset ' + matricula + ':' + idTransacao++ + '\n';
            fs.appendFile(outputFile, linhaLiquibase + line + '\n', (err) => {
              console.log(err);
            })
          });
          
      } else if (fileStat.isDirectory()) {
          console.log('Directory found.');
      }
  }
});