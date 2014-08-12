var ids = 0;
var storedMessages = {results: [{username: 'luby', message: 'hello'}]};
exports.handler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);


  if(request.url.slice(0, 8) !== '/classes'){
    var statusCode = 404;
  } else {
    var statusCode = '';
  }


  var http = require('http'),
    fs = require('fs');

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";

  switch(request.method) {

    case 'GET':
      statusCode = statusCode ? statusCode : 200;
      response.writeHead(statusCode, headers);
      console.log(storedMessages);
      response.end(JSON.stringify(storedMessages));
      break;

    case 'POST':
      var body = '';

      request.setEncoding('utf8');
      request.on('data', function(chunk) {
        body += chunk;
      });

      request.on('end', function() {
        var parsedData = JSON.parse(body);
        console.log('parsedData is:', parsedData);
        console.log('typeof parsedData is: ', typeof parsedData);
        ids++;
        parsedData.odjectId = ids;

        storedMessages.results.push(parsedData);
        statusCode = statusCode ? statusCode : 201;
        response.writeHead(statusCode, headers);
        response.end('done!');
      });
      break;

    default:
      response.writeHead(statusCode, headers);
      statusCode = 400;
      response.end('error you dope');
  }

};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
