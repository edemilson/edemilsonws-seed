/**
 * Dependencias
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  partials = require('./routes/partials'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuracoes
 */

// Todos os ambientes
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// Somente no desenvolvimento
if (env === 'development') {
  app.use(errorHandler());
}

// Somente em producao
if (env === 'production') {
  // codigo
}


/**
 * Rotas
 */

// Arquivo Index
app.use('/', routes);

// Partials
app.use('/partials', partials);

// Api
app.use('/api', api);

// Todas as outras requisicoes serao enviadas para indexs
app.get('*', function(req, res, next) {
  res.render('index');
});


/**
 * Inicia o serviço
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Rodando na porta: ' + app.get('port'));
});