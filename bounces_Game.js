class Game {

  constructor() {
    this.cw
    this.ch
    this.ballSet
    this.friction = 0
    this.walls    = true
    this.engine   = new BounceEngine()
  }

  run() {
    this.ballSet.forEach(ball => { 
      ball.draw()
      ball.move()  
    })
    
    if (this.walls) {
      this.engine.bounceFromWalls(this.ballSet)
    }
    
    this.engine.bounceFromBalls(this.ballSet)
  }


}