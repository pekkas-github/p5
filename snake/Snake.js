class Snake {
  
  constructor() {
    this.game      = 'on'
    this.direction = 'idle'
    this.cells     = []
    this.length    = 0
    
  }
  
  init() {
    this.cells.push(getRandomCell())
    this.length = 1
  }
 
 print() {
  snake.cells.forEach(cell => {
    square(cell.xPos * CELL_SIZE, cell.yPos * CELL_SIZE + TOP_LINE, CELL_SIZE) 
  })  
}

  hitsSnake(refCell) {
    let result = false
    this.cells.forEach(cell => {
      if (refCell.xPos === cell.xPos && refCell.yPos === cell.yPos) {
        result = true
      }
    })
    return result
  }
  
  move() {
    const headCell = snake.cells[0]
    let nextCell
    if (this.game === 'over') {return}
        
    switch (this.direction) {
      case 'up':
        nextCell = new Cell(headCell.xPos, headCell.yPos - 1)        
        break
      case 'down':
        nextCell = new Cell(headCell.xPos, headCell.yPos + 1)
        break
      case 'left':
        nextCell = new Cell(headCell.xPos - 1, headCell.yPos)
        break
      case 'right':
        nextCell = new Cell(headCell.xPos + 1, headCell.yPos)
        break
      default:
        return
    } //end of switch
    
    if (this.isGameOver(nextCell)) {
      console.log('Game Over')
      this.game = 'over'      
    } else {
      snake.cells.splice(0, 0 , nextCell)
      if (this.isCookieEaten(nextCell)) {
        this.length++
        console.log(this.length)
      } else {
        snake.cells.pop()
      }
    }
  }
  
  isGameOver(nextCell) {
    if (nextCell.xPos < 0 || nextCell.xPos > X_DIM-1 ||
        nextCell.yPos < 0 || nextCell.yPos > Y_DIM-1 ||
        this.hitsSnake(nextCell)) {
      return true
    }
  }
  
  isCookieEaten(nextCell) {
    if (nextCell.xPos === cookie.xPos && nextCell.yPos === cookie.yPos) {
      cookie.create()
      return true 
    } else {
      return false 
    }
  }
}