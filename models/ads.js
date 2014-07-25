var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/state');
 
var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err)
});
db.once('open', function () {
  console.log('Conexão aberta.')
});
 
var Schema = mongoose.Schema;
 
var adsSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  value: { type: Number, min: 0},
  category: { type: String, default: ''},
  created: { type: Date, default: Date.now }
});
 
var _model = mongoose.model('ads', adsSchema);


var create = function(request, response, data){
  var model = new _model(data);

  model.save(function (err, data) {
    if (err){
      console.log('Erro: ', err);
    }
    makeResponse(response, data);
  });
}

var find = function(request, response){
  _model.find(function (err, ads) {
    if(err) {
      console.log(err);
    } else {
        makeResponse(response, ads);
    }
  });
}

var update = function(request, response, query, mod){
  _model.update(query, mod, function(err, ad) {
    if(err) {
      console.log(err);
    } else {
      makeResponse(response, ad);
    }
  });
}

var get = function(request, response, query){
  _model.findOne(query, function (err, ads) {
    if(err) {
      console.log(err);
    } else {
      makeResponse(response, ads);
    }
  })
}

var remove = function(request, response, query){
  _model.remove(query, function(err, ad) {
    if(err) {
      console.log(err);
    } else {
      makeResponse(response, ad);
    }
  });
}


var makeResponse = function(res, data){
  res.json(data);
}


exports.create = create;
exports.find = find;
exports.update = update;
exports.get = get;
exports.delete = remove;