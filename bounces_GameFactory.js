class GameFactory {
  
  constructor() {
  }
  
  createGame(gameName) {
    return this[gameName]()
  }
 
  fullyManual() {
    let game       = new Game()
    game.cw        = 400
    game.ch        = 300
    game. friction = 0
    
    const ball1 = new Ball(999, 150, 150, 2, 0)
    const ball3 = new Ball(91, 100, 150, 0, 0)
    const ball4 = new Ball(1000, 300, 150, 0, 0)
    const ball5 = new Ball(10, 200, 50, 0, 5)
    const ball6 = new Ball(10, 50, 230, 5, 1)
    const ball2 = new Ball(2000, 250, 150, 0, 0)
    
    game.ballSet = [ball1, ball2, ball3] //, ball4, ball5, ball6]
    return game
  }

  newtonsCradle() {
    let game    = new Game()
    game.cw     = 620
    game.ch     = 400
    
    const balls = []
    const dx    = 50
    const y     = 200
    
    const ball1 = new Ball(500, 50, y, 2, 0)
    balls.push(ball1)
    
    for (let i = 0; i < 8; i++) {
      const ball = new Ball(500, 150 + i * dx, y, 0, 0)
      balls.push(ball)
    }
    
    game.ballSet = balls
    return game
  }
  
  random6() {
    let game    = new Game()
    game.cw     = 600
    game.ch     = 400
    const balls = []
    
    for (let i = 0; i < 6; i++) {
      // Create new random balls until there is no overlapping with other balls
      let ball    
      do {
        ball = new Ball(100 + 5000*Math.random(), game.cw * Math.random(), game.ch * Math.random(), 2 * Math.random() - 1, 2 * Math.random() - 1) 
      }
      while (this.isOverlapping(ball, balls) === true)
    
      balls.push(ball)      
    }
    
    game.ballSet = balls
    return game
  }
  
  // Check that the new ball doesn't overlap with other balls or wall edges
  isOverlapping(ball, balls) {
    if (balls.length === 0) {return false}
    
    let overlap = false
    balls.forEach (refBall => {
      const dmin = ball.r + refBall.r
      const dx   = Math.abs(ball.x - refBall.x)
      const dy   = Math.abs(ball.y - refBall.y)
      
      if (dx <= dmin && dy <= dmin) {overlap = true}
    })
    
    if (ball.x - ball.r < 0 || ball.x + ball.r > this.cw) {overlap = true}
    if (ball.y - ball.r < 0 || ball.y + ball.r > this.ch) {overlap = true}
    
    return overlap
  }

  
  biljard() {
    let game  = new Game()
    game.cw        = 600
    game.ch        = 400
    game.friction  = 0.03
    game.state     = 'idle'    
    
    const ball1 = new Ball(500, 400, 150, 0, 0, 0)
    const ball2 = new Ball(500, 400, 200, 0, 0, 0)
    const ball3 = new Ball(500, 400, 250, 0, 0, 0)
    
    const ball4 = new Ball(500, 355, 175, 0, 0, 0)
    const ball5 = new Ball(500, 355, 225, 0, 0, 0)

    const ball6 = new Ball(500, 310, 200, 0, 0, 0)
    
    const ball0 = new Ball(500, 50, 150, 0, 0, 255)
        
    game.ballSet = [ball0, ball1, ball2, ball3, ball4, ball5, ball6]
    
    game.mouseClicked = () => {
      if (mouseY > 0 && mouseY < game.ch) {
        const dx   = mouseX - ball0.x
        const dy   = (game.ch - mouseY) - ball0.y
        const dist = Math.sqrt(dx**2 + dy**2)
        const k    = dist / 6

        ball0.vx   = dx / k
        ball0.vy   = dy / k
      }
    }
    
    return game    
  }
  
}