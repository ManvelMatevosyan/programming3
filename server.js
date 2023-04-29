var express = require("express")
var app = express()

var server = require("http").Server(app)
var io = require("socket.io")(server)
var fs = require("fs")




app.use(express.static("."))

app.get("/", function (req, res) {
        res.redirect("index.html")
})

server.listen(3001, function () {
        console.log("Server is run");
})

function matrixGenerator(matrixSize, grass, grassEater, predator, bomb, bombEater) {
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

matrix = matrixGenerator(20, 7, 7, 5, 3, 3)

io.sockets.emit("send matrix", matrix)


grassArr = []
grassEaterArr = []
predatorArr = []
bombArr = []
bombEaterArr = []

Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
Bomb = require("./bomb")
BombEater = require("./bombEater")

function crateObject() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)

                                grassArr.push(grass)


                        } else if (matrix[y][x] == 2) {
                                let grEat = new GrassEater(x, y)
                                grassEaterArr.push(grEat)
                        } else if (matrix[y][x] == 3) {
                                let pre = new Predator(x, y)
                                predatorArr.push(pre)
                        } else if (matrix[y][x] == 4) {
                                let bm = new Bomb(x, y)
                                bombArr.push(bm)
                        } else if (matrix[y][x] == 5) {
                                let bmEater = new BombEater(x, y)
                                bombEaterArr.push(bmEater)
                        }


                }
        }
        io.sockets.emit("send matrix", matrix)


}

function game() {
        for (let i in grassArr) {
                grassArr[i].mul()
        }


        for (let i in grassEaterArr) {
                grassEaterArr[i].eat()
        }



        for (let i in predatorArr) {
                predatorArr[i].eat()
        }

        for (let i in bombArr) {
                bombArr[i].move()
        }
        for (let i in bombEaterArr) {
                bombEaterArr[i].eat()
        }
        io.sockets.emit("send matrix", matrix)
}

setInterval(game, 300);

var weath;

function Winter() {
        weath = "winter";
        io.sockets.emit('Winter', weath);
}

function Summer() {
        weath = "summer";
        io.sockets.emit('Summer', weath);
}

function Spring() {
        weath = "spring";
        io.sockets.emit('Spring', weath);
}
function Autumn() {
        weath = "autumn";
        io.sockets.emit('Autumn', weath);
}


function AddGrass() {
        for (var i = 0; i < 20; i++) {
                var x = Math.floor(Math.random() * matrix[0].length)
                var y = Math.floor(Math.random() * matrix.length)
                if (matrix[y][x] == 0) {
                        matrix[y][x] = 1;
                        var gr = new Grass(x, y);
                        grassArr.push(gr)
                }
        }
        io.sockets.emit("send matrix", matrix);
}
function AddGrassEater() {
        for (var i = 0; i < 4; i++) {
                var x = Math.floor(Math.random() * matrix[0].length)
                var y = Math.floor(Math.random() * matrix.length)
                if (matrix[y][x] == 0) {
                        matrix[y][x] = 2;
                        var grEat = new GrassEater(x, y);
                        grassEaterArr.push(grEat);
                }
        }
        io.sockets.emit("send matrix", matrix);
}
function AddPredator() {
        for (var i = 0; i < 3; i++) {
                var x = Math.floor(Math.random() * matrix[0].length)
                var y = Math.floor(Math.random() * matrix.length)
                if (matrix[y][x] == 0) {
                        matrix[y][x] = 3;
                        var pre = new Predator(x, y);
                        predatorArr.push(pre);
                }
        }
        io.sockets.emit("send matrix", matrix);
}
function AddBomb() {
        for (var i = 0; i < 2; i++) {
                var x = Math.floor(Math.random() * matrix[0].length)
                var y = Math.floor(Math.random() * matrix.length)
                if (matrix[y][x] == 0) {
                        matrix[y][x] = 2;
                        var bm = new Bomb(x, y);
                        bombArr.push(bm);
                }
        }
        io.sockets.emit("send matrix", matrix);
}
function AddBombEater() {
        for (var i = 0; i < 1; i++) {
                var x = Math.floor(Math.random() * matrix[0].length)
                var y = Math.floor(Math.random() * matrix.length)
                if (matrix[y][x] == 0) {
                        matrix[y][x] = 2;
                        var bmEater = new BombEater(x, y);
                        bombEaterArr.push(bmEater);
                }
        }
        io.sockets.emit("send matrix", matrix);
}

io.on('connection', function (socket) {
        crateObject()
        socket.on("spring", Spring);
        socket.on("summer", Summer);
        socket.on("autumn", Autumn);
        socket.on("winter", Winter);
        socket.on("addGrass", AddGrass)
        socket.on("addGrassEater", AddGrassEater)
        socket.on("addPredator", AddPredator)
        socket.on("addBomb", AddBomb)
        socket.on("addBombEater", AddBombEater)
})

var statistics = {}
setInterval(function () {
        statistics.grass = grassArr.length
        statistics.grassEater = grassEaterArr.length
        statistics.predator = predatorArr.length
        statistics.bomb = bombArr.length
        statistics.bombEater = bombEaterArr.length

        fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
                // console.log("statistcs");
        })
}, 1000)