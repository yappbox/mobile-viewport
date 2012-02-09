var static = require('node-static');
var file = new(static.Server)('.');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    });
}).listen(9292);
