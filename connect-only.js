
const connect = require('connect'),
      http = require('http');

const app = connect();

app.use('/foo', function(req, res, next){
  console.log(1);
  next();
});
app.use('/foo', function(req, res, next){
  console.log(2);
  next();
});

app.use('/bar', function(req, res, next){
  console.log(1);
  next();
}).use('/bar', function(req, res, next){
  console.log(2);
  next();
});

app.use(function(req, res){
  res.end('Hello from Connect!\n');
});

http.createServer(app).listen(3000);
