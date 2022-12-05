const CELL_SIZE = 10  // pixels
const TOP_LINE  = 30  // pixels
const X_DIM     = 40  // cells
const Y_DIM     = 40  // cells
const snake     = new Snake()
const cookie    = new Cookie()

function setup() {
  createCanvas(X_DIM * CELL_SIZE, Y_DIM * CELL_SIZE + TOP_LINE)
  frameRate(10)
  snake.init()
  cookie.create()
}

function draw() {
  background(0)
  stroke(255)
  line(0, TOP_LINE, width, TOP_LINE)

  fill(255)
  snake.print()
  
  fill(125)
  cookie.print()
  
  snake.move()
  showScore()
}


function showScore() {
  fill(255)
  textSize(16)
  text('Score: ' + snake.length, 20, 20)
  if (snake.game === 'over') {
    text('GAME OVER!', (X_DIM-10)*CELL_SIZE/2, Y_DIM*CELL_SIZE/2)
  }
}

function getRandomCell() {
  const xPos = Math.floor(Math.random() * X_DIM)
  const yPos = Math.floor(Math.random() * Y_DIM)
  
  return new Cell(xPos, yPos)
}


function keyPressed() {
  
  if (keyCode === LEFT_ARROW) {
    snake.direction = 'left'
    return false
  }

  if (keyCode === UP_ARROW) {
   snake.direction = 'up'
   return false
 }

  if (keyCode === RIGHT_ARROW) {
   snake.direction = 'right'
   return false
  }
  
  if (keyCode === DOWN_ARROW) {
    snake.direction = 'down'  
    return false
  }
  
}

