const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('clinic.db');
const script = fs.readFileSync('clinic.sql', 'utf-8');

db.exec(script, (err) => {
  if (err) {
    console.error('Erro ao executar o script:', err.message);
  } else {
    console.log('Script executado com sucesso!');
  }
  db.close();
});
