const fs = require('fs');
const variaveis = require('./variaveis');
const fileName = variaveis.nomeDoArquivo;
const md5 = require('md5');
const outputFile = variaveis.outputFile;
const readLine = require('readline')
  .createInterface({
    input: fs.createReadStream(fileName)
  })

  const matricula = variaveis.matricula;
fs.writeFile(outputFile, '', (err) => {
  if(err)
    throw err;
})
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
            let linhaLiquibase = '--changeset ' + matricula + ':' + toMD5(line) + '\n';
            fs.appendFile(outputFile, linhaLiquibase + line + '\n', (err) => {
              if(err){
                throw err;
              }
            })
          });
          
      } else if (fileStat.isDirectory()) {
          console.log('Directory found.');
      }
  }
});

function toMD5(string) {
  const date = new Date();
  return md5(string + date);
}