exports.SC_200 = function(res,data){
    return res.status(200).json(data);
}
exports.SC_201 = function(res, data){
    return res.status(201).json(data);
}
exports.SC_204 = function(res){
    return res.status(204).json({message:'No Content'});
}


exports.SC_304 = function(res){
    return res.status(304).json({message:'Not Modified'});
}


exports.SC_400 = function(res){
    return res.status(400).json({message:'Bad Request'});
}
exports.SC_401 = function(res){
    return res.status(401).json({message:'Unauthorized'});
}
exports.SC_403 = function(res){
    return res.status(403).json({message:'Not Allowed or Forbidden'});
}
exports.SC_404 = function(res){
    return res.status(404).json({message:'Not Found'});
}


exports.SC_500 = function(res){
    return res.status(500).json({message:'Internal Server Error'});
}