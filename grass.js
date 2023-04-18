let LeavingCreauture = require("./LeavingCreature")
module.export = class Grass extends LeavingCreauture{
    constructor(x,y){
        super(x,y)
        this.multiply = 0
        this.directions = [];
    
    }
    

    boom(){
        matrix[this.y][this.x] = 9
        if(bombArr.length == 0){
        matrix[this.y][this.x] = 0
    }
    }
    
    mul(){
        this.multiply++
        let emptyCell = this.chooseCell(4)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]
        
        if(newCell && this.multiply >= 5){
            let newX  =   newCell[0]
            let newY  =   newCell[1]
            if (matrix[newY][newX] == 4) {
                this.die()
                this.boom()
            } else {
            
            matrix[newY][newX] = 1
            
            
            let grass = new Grass(newX,newY)
            grassArr.push(grass)
            
            
            this.multiply = 0
            }
           
            
            
        }
        
    }
    die() {
        matrix[this.y][this.x] = 0

        for (let i in grassArr) {
            if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                grassArr.splice(i, 1)
            }
        }
    }
    
    
}

