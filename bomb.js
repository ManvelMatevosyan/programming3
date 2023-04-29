let LeavingCreature = require("./LeavingCreature")
module.exports = class Bomb extends LeavingCreature{
    constructor(x, y) {
       super(x,y)
        this.energy = 10
        this.directions = []
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        this.getNewCoordinates()
return super.chooseCell(char)

    }
    mul() {
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 4

            let bm = new Bomb(newX, newY)

            bombArr.push(bm)


        }
    }
    move(){
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

            if(newCell){
                let newX = newCell[0]
                let newY = newCell[1]

                matrix[newY][newX] = 4
                matrix[this.y][this.x] = 0
                
                this.x = newX
                this.y = newY
                
            }
     }
}