const connect = require('connect'),
      http = require('http'),
      serveStatic = require('serve-static'),
      cheerio     = require('cheerio'),
      interceptor = require('express-interceptor');

const SSI = require('node-ssi');
const ssi = new SSI({
  baseDir: 'public',
  encoding: 'utf-8'
});

//const iconv = require('iconv-lite');
var Iconv  = require('iconv').Iconv;
var iconv = new Iconv('Shift_JIS', 'UTF-8');

const app = connect()

const finalParagraphInterceptor = interceptor(function(req, res){
  return {
    // Only HTML responses will be intercepted
    isInterceptable: function(){
      return /text\/html/.test(res.getHeader('Content-Type'));
    },
    // Appends a paragraph at the end of the response body
    intercept: function(body, send) {
      debugger;
      ssi.compileFile(ssi.options.baseDir + req.url, {} , function(err, content){
        var $document = cheerio.load(content);
        $document('body').append('<p>From interceptor!</p>');
        debugger;
        console.log(iconv.convert($document.html()).toString());
        send(iconv.convert($document.html()).toString());
//        send($document.html());
      });
    }
  };
})

app.use('/foo', finalParagraphInterceptor);
app.use('/foo', serveStatic('public', {'setHeaders': setHeaders}));

app.use(function(req, res){
  res.end('Hello from Connect!\n');
});

http.createServer(app).listen(3000);

function setHeaders (res, path) {
  res.setHeader('Content-Type', 'text/html; charset=shift_jis"')
}
