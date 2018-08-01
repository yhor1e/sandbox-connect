# sandbox-connect

## connect-only.js

```
$ node connect-only.js
```

http://localhost:3000/foo

```
app.use('/foo', function(req, res, next){
  console.log(1);
  next();
});
app.use('/foo', function(req, res, next){
  console.log(2);
  next();
});

//-> 1
//-> 2
```

http://localhost:3000/bar

```
app.use('/bar', function(req, res, next){
  console.log(1);
  next();
}).use('/bar', function(req, res, next){
  console.log(2);
  next();
});

//-> 1
//-> 2
```

## connect-static.js

```
$ node connect-static.js
```

http://localhost:3000/foo

```
app.use('/foo', function(req, res, next){
  console.log(1);
  next();
});
app.use('/foo', serveStatic('public'));
app.use('/foo', function(req, res, next){
  console.log(2);
  next();
});

//-> 1
```


http://localhost:3000/foo

```
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

//-> 1
```

静的ファイルを返してくれ、Transform できる点では `connect-static-transform` が良いが、
response のヘッダー情報が Apache などの HTTP サーバと比較すると不足している印象。

