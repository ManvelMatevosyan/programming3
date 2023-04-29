let LeavingCreature = require("./LeavingCreature")
module.exports =  class BombEater extends LeavingCreature {
    constructor(x, y) {
     super(x,y)
        this.energy = 10
        this.directions = []
    }


    getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseCell(char) {
        this.getNewCoordinates()
        return super.chooseCell(char)
    }



    move() {
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY

        }
    }
    eat() {
        let emptyCell = this.chooseCell(4)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell) {
            this.energy += 5
            let newX = newCell[0]
            let newY = newCell[1]





            for (let i in bombArr) {
                if (newX == bombArr[i].x && newY == bombArr[i].y) {
                    bombArr.splice(i, 1)
                }
            }




            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY

            this.die()
        } else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0

        for (let i in bombEaterArr) {
            if (this.x == bombEaterArr[i].x && this.y == bombEaterArr[i].y) {
                bombEaterArr.splice(i, 1)
            }
        }
    }
}