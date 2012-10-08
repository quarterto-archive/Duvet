(function(){
  var mime, path, toString$ = {}.toString;
  mime = require('mime');
  path = require('path');
  (function(){
    this.locals = function(obj){
      return function(res, last){
        return import$(res.locals || (res.locals = {}), (function(args$){
          switch (toString$.call(obj).slice(8, -1)) {
          case 'Function':
            return obj.apply(this, args$);
          default:
            return obj;
          }
        }.call(this, arguments)));
      };
    };
    this.set = function(obj){
      return function(res, last){
        return import$(res.headers || (res.headers = {}), (function(args$){
          switch (toString$.call(obj).slice(8, -1)) {
          case 'Function':
            return obj.apply(this, args$);
          default:
            return obj;
          }
        }.call(this, arguments)));
      };
    };
    this.staticFile = function(file){
      return function(res){
        (res.headers || (res.headers = {}))['content-type'] = mime.lookup(path.extname(file));
        return fs.createReadStream(file);
      };
    };
  }.call(exports));
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);