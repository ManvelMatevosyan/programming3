var socket = io()
let side = 30
///օբյեկտներ պահելու զանգվածներ
var grassArr = []
var grassEaterArr = []
var predatorArr = []
var bombArr = []
var bombEaterArr = []


function setup() {
        createCanvas(20 * side, 20 * side)
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)

                                grassArr.push(grass)


                        } else if(matrix[y][x] == 2){
                             let grEat = new  GrassEater(x,y)
                             grassEaterArr.push(grEat)
                        }else if(matrix[y][x] ==  3){
                             let pre = new Predator(x,y)
                             predatorArr.push(pre)
                        }else if(matrix[y][x] == 4){
                                let bm = new Bomb(x,y)
                                bombArr.push(bm)
                        }else if(matrix[y][x] == 5){
                                let bmEater = new BombEater(x,y)
                                bombEaterArr.push(bmEater)
                        }


                }
        }

}


function draw() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                fill("green")
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



                for (let i in grassArr) {
                        grassArr[i].mul()
                }


                for(let i in grassEaterArr){
                        grassEaterArr[i].eat()
                }

             

                for(let i in predatorArr){
                        predatorArr[i].eat()
                }
 
                for(let i in bombArr){
                        bombArr[i].move()
                }
                for(let i in bombEaterArr){
                        bombEaterArr[i].eat()
                }
}
//add