var socket = io()
var side = 30
///օբյեկտներ պահելու զանգվածներ


function setup() {
        createCanvas(40 * side, 40 * side)
        }
        socket.on("Winter", function (data) {
        weath = data;
    })
    socket.on("Summer", function (data) {
        weath = data;
    })
    socket.on("Spring", function (data) {
        weath = data;
    })
    socket.on("Autumn", function (data) {
        weath = data;
    })
     var weath = "spring";

        function nkarel(matrix) {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                if (weath == "spring") {
                                    fill("darkgreen");
                                }
                                else if (weath == "summer") {
                                    fill("#79a83b");
                                }
                                else if (weath == "autumn") {
                                    fill("#ff8453");
                                }
                                if (weath == "winter") {
                                    fill("#ffffff");
                                }
                            }
                         else if (matrix[y][x] == 0) {
                                fill("gray")
                        } else if(matrix[y][x] == 2){
                                fill ("yellow")
                        }else if(matrix[y][x] == 3){
                                fill ("red")
                        }else if(matrix[y][x] == 4){
                                fill("black")
                        }else if (matrix[y][x] == 5){
                                fill("azure")
                        }else if (matrix[y][x] == 8){
                                fill("orange")
                        }else if (matrix[y][x] == 9){
                                fill("blue")
                        }else {
                                fill("gray")
                        }
                        rect(x * side, y * side, side, side)

        }
}

}


socket.on("send matrix",nkarel)

function AddGrass() {
        socket.emit("addGrass")
}
function AddGrassEater() {
        socket.emit("addGrassEater")
}
function AddPredator() {
        socket.emit("addPredator")
}
function AddBomb() {
        socket.emit("addBomb")
}
function AddBombEater() {
        socket.emit("addBombEater")
}
function Winter() {
        socket.emit("winter");
    }
    function Summer() {
        socket.emit("summer");
    }
    function Spring() {
        socket.emit("spring");
    }
    function Autumn() {
        socket.emit("autumn");
    }