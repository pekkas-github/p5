let vs        = 6
const bat     = new Bat()
const ball    = new Ball()
const topLine = 30
let score     = 0
let gameOver  = false
let running   = true

function setup() {
  createCanvas(700, 500)
//  frameRate = 20
}

function draw() {
  if (running) {
    background(0)
    
    stroke(255)
    line(0, topLine, width, topLine)
    
    bat.move()
    bat.draw()

    ball.move()
    ball.draw()
  
    textSize(20)
    fill(255)
    text('Score: ' + score, 20, 20)
    text('Rate: ' + vs, 150, 20)
  
    if (gameOver) {
      running = false
      text('GAME OVER!', 300, 250)
    }
  }
}
