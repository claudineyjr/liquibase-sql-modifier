const fs = require('fs');
// const variaveis = require('./variaveis');
const rl = require('readline');
const ENVIROMENT = require('./../../enviroment');
const md5 = require('md5');
// const outputFile = variaveis.outputFile;

// const readLine = require('readline')
//   .createInterface({
//     input: fs.createReadStream(fileName)
//   })

module.exports.modify = (application, req, res) => {
  let matricula = req.body.matricula;
  fs.readdir(ENVIROMENT.INPUTDIRECTORY, (err, files) => {
    files.forEach(file => {
      let fileName = ENVIROMENT.OUTPUTDIRECTORY + file;
      fs.appendFile(fileName, '--liquibase formatted sql\n', (err) => {
        if(err){
          console.log('ola');
          throw err;
        }
        let lineReader = rl.createInterface({
          input: fs.createReadStream(ENVIROMENT.INPUTDIRECTORY + file)
        });
        
        lineReader.on('line', function (line) {
          let linhaLiquibase = '--changeset ' + matricula + ':' + toMD5(line) + '\n';
          fs.appendFile(fileName, linhaLiquibase + line + '\n', (err) => {
            if(err){
              throw err;
            }
          })
        });
      });
    })
  });
};

function toMD5(string) {
  const date = new Date();
  return md5(string + date);
} 