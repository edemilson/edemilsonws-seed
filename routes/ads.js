var _model = require("../models/ads");
 
var adsCreate = function(req, res){
  var dados = req.body;
  _model.create(req, res, dados);
}
 
var adsRetrieve = function(req, res){
  _model.find(req, res);
}
 
var adsUpdate = function(req, res){
  var id = req.params.id;
  var query = {_id: id};
  var mod = req.body;
  _model.update(req, res, query, mod);
}
 
var adsDelete = function(req, res){
  var url = req.url;
  var id = req.params.id;
  var query = {_id: id};
  _model.delete(req, res, query);
}

var adsGet = function(req, res){
  var id = req.params.id;
  var query = {_id: id};
  _model.get(req, res, query);
}

exports.create = adsCreate;
exports.retrieve = adsRetrieve;
exports.update = adsUpdate;
exports.delete = adsDelete;
exports.get = adsGet;