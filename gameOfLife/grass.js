class Grass extends LeavingCreauture{
    constructor(x,y){
        super(x,y)
        this.multiply = 0
        this.directions = [];
    
    }
    
//qgftyf
    chooseCell(char,char1){
         let found = []


         for(let i in this.directions){
                          let x =   this.directions[i][0]
                          let y =   this.directions[i][1]
               if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                            if(matrix[y][x] == char ){
                                    found.push(this.directions[i])
                            }
               }
               if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char1) {
                    found.push(this.directions[i])
                }
            }
         }


         return found

    }
    
    boom(){
        matrix[this.y][this.x] = 9
        if(bombArr.length == 0){
        matrix[this.y][this.x] = 0
    }
    }
    
    mul(){
        this.multiply++
        let emptyCell = this.chooseCell(0,4)
        let newCell = random (emptyCell)
        
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

