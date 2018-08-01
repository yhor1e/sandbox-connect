const connect = require('connect'),
      http = require('http'),
      serveStatic = require('serve-static'),
      st = require('connect-static-transform');

var app = connect()

app.use('/foo', function(req, res, next){
  console.log(1);
  next();
});
app.use('/foo', serveStatic('public'));
app.use('/foo', function(req, res, next){
  console.log(2);
  next();
});


app.use('/bar', function(req, res, next){
  console.log(1);
  next();
});
app.use('/bar', st({
  root: 'public',
  match: /.*/,
  transform: function (path, text, send) {
    send(text);
  }
}));
app.use('/bar', function(req, res, next){
  console.log(2);
  next();
});

app.use(function(req, res){
  res.end('Hello from Connect!\n');
});

http.createServer(app).listen(3000);
