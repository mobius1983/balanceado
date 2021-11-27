const express = require('express');
const path = require('path');
const app = express();
const nunjucks = require('nunjucks');

const _templates = path.join(__dirname, './views');

const nunjucksEnv = nunjucks.configure(_templates, {
  autoescape: true,
  express: app,
  noCache: true,
});

app.set('view engine', 'njk');

app.get('/', function (req, res) {
  const result = tipo(req.query.word);
  res.render('index', { result, word: req.query.word });
});

app.get('/favicon.ico', (req, res) => res.status(204));

function tipo(text = '') {
  const reg = /\({1}[a-zA-Z0-9\:]\){1}/gi;

  text = text.replace(reg, '').replace(/\:\)/gi, '').replace(/\:\)/gi, '');

  const count_1 = (text.match(/\)/g) || []).length;
  const count_2 = (text.match(/\(/g) || []).length;
  console.log(count_1, count_2);
  console.log(text);
  return count_1 == count_2 ? 'balanceado' : 'desbalanceado';
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
