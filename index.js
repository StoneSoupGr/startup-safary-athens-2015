var http = require("http"),
    path = require("path"),
    fs = require("fs")

var server = http.createServer(function(request, response) {

  if (request.url == "/") {
    var htmlPath = path.join(__dirname, "index.html")
    var htmlFileStream = fs.createReadStream(htmlPath)

    response.writeHead(200, {
      "Content-Type": "text/html"
    })

    htmlFileStream.pipe(response)
  } else if (request.url == "/info.json") {

    var responseObject = {
      name: "Emma",
      date: new Date().toJSON()
    }

    var responseJSON = JSON.stringify(responseObject)
    response.writeHead(200, {
      "Content-Type": "application/json"
    })

    response.write(responseJSON)
    response.end()

  } else {
    response.writeHead(404, {})
    response.write("File not found")
    response.end()
  }
})

server.listen(9090)
