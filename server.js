var express = require("express")
var app = express()

var server = require("http").Server(app)
var io = require("socket.io")(server)
var fs = require("fs")
const { uptime } = require("process")


app.use(express.static("."))

app.get("/",function(req,res){
    res.redirect("index.html")
})

server.listen(3000 , function(){
    console.log("Server is run");
})

function matrixGenerator(matrixSize, grass,grassEater,predator,bomb,bombEater) {
    var matrix = []
    ////  matrix սարքելու հատված
    for (let i = 0; i < matrixSize; i++) {
            matrix.push([])
            for (let j = 0; j < matrixSize; j++) {
                    matrix[i].push(0)
            }
    }

    // 1 -եր այսինքն խոտեր քցելու հատված մատռիքսում
    for (let i = 0; i < grass; i++) {
            let x = Math.floor(Math.random() * matrixSize)
            let y = Math.floor(Math.random() * matrixSize)
            matrix[y][x] = 1
    }
     //GrassEater 2

     for (let i = 0; i < grassEater; i++) {
            let x = Math.floor(Math.random() * matrixSize)
            let y = Math.floor(Math.random() * matrixSize)
            matrix[y][x] = 2
    }
    //3 predator


    for (let i = 0; i < predator; i++) {
            let x = Math.floor(Math.random() * matrixSize)
            let y = Math.floor(Math.random() * matrixSize)
            matrix[y][x] = 3
    }

    //4 bomb

    for (let i = 0; i < bomb; i++) {
            let x = Math.floor(Math.random() * matrixSize)
            let y = Math.floor(Math.random() * matrixSize)
            matrix[y][x] = 4
    }
    
    //5 bombEater

    for (let i = 0; i < bombEater; i++) {
            let x = Math.floor(Math.random() * matrixSize)
            let y = Math.floor(Math.random() * matrixSize)
            matrix[y][x] = 5
    }
   
    return matrix
}

matrix = matrixGenerator(20,30,7,5,3,3)

io.sockets.emit("send matrix",matrix)