const connect = require('connect'),
      http = require('http'),
      serveStatic = require('serve-static'),
      cheerio     = require('cheerio'),
      interceptor = require('express-interceptor');

var app = connect()

app.use('/foo', function(req, res, next){
  console.log(1);
  next();
});

const finalParagraphInterceptor = interceptor(function(req, res){
  return {
    // Only HTML responses will be intercepted
    isInterceptable: function(){
      return /text\/html/.test(res.getHeader('Content-Type'));
    },
    // Appends a paragraph at the end of the response body
    intercept: function(body, send) {
      var $document = cheerio.load(body);
      $document('body').append('<p>From interceptor!</p>');

      send($document.html());
    }
  };
})

app.use(finalParagraphInterceptor);
app.use('/foo', serveStatic('public'));
app.use('/foo', function(req, res, next){
  console.log(2);
  next();
});

app.use(function(req, res){
  res.end('Hello from Connect!\n');
});

http.createServer(app).listen(3000);
