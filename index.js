var fs = require('fs');
var http = require('http');
var mime = require('mime-types'); // https://github.com/jshttp/mime-types

var port = process.env.PORT || 5000;
http.createServer(function (request, response) {
    let contentType = 'text/plain';

    var file;
    path = request.url
    path = path.split('?')[0]

    if (path === '/') {
        file = 'index.html';
    } else {
        file = '.' + decodeURIComponent(request.url);
    }

    let data;
    try {
        console.log('Serving ' + file);
        data = fs.readFileSync(file);
        contentType = mime.lookup(file);
    } catch (error) {
        console.log(error);
        // todo: confirm this is a file not found error
        data = "Error: " + error.toString();
        response.statusCode = 404;
    }

    response.setHeader('Content-Type', contentType + '; charset=utf-8');
    response.write(data);
    response.end();
}).listen(port);

console.log("Listening on port " + port);
