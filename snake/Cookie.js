class Cookie {

  constructor() {
    this.xPos = -1
    this.yPos = -1
  }
  
  create() {
    let cell
    
    do {
      cell = getRandomCell()
    }
    while (snake.hitsSnake(cell))  

    this.xPos = cell.xPos
    this.yPos = cell.yPos
  }
  
  print() {
    square(cookie.xPos * CELL_SIZE, cookie.yPos * CELL_SIZE + TOP_LINE, CELL_SIZE)  
  }


}
