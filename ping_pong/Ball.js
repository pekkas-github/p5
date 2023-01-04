class Ball {

  constructor() {
    this.vx      = vs / Math.sqrt(2)
    this.vy      = Math.sqrt(vs**2 - this.vx**2)
    this.dirY    = 1
    this.xPos    = 50
    this.yPos    = 50
    this.rad     = 10
  }
  
  move() {
    if (gameOver) return 
    
// Bounce from the bat
    
    if (this.xPos < bat.batLevel + this.rad && 
        this.yPos > bat.batPos && 
        this.yPos < bat.batPos + bat.batSize) {
      this.xPos = bat.batLevel + this.rad
      this.vx = -this.vx
      score += 1
      if (score % 5 === 0) vs += 1
    }

// Bounce from borders
    
 // Left border - game over
    if (this.xPos - this.rad < 0) {
      gameOver = true
      this.vx = 0
      this.vy = 0
    }    

 // Right border - randomize direction 
    if (this.xPos + this.rad > width) {
      this.xPos = width - this.rad
      this.vx = -(vs*(1-1/Math.sqrt(2)) * Math.random() + vs/Math.sqrt(2))
      this.vy = Math.sqrt(vs**2 - this.vx**2)
    }

 // Bottom border - bounce
    if (this.yPos + this.rad > height) {
      this.yPos = height - this.rad
      this.dirY = -this.dirY
    }

 // Top border - bounce
    if (this.yPos - this.rad < topLine) {
      this.yPos = this.rad + topLine
      this.dirY = -this.dirY
    }    

 // Move the ball
    this.xPos += this.vx
    this.yPos += this.dirY * this.vy

  }
  
  
  draw() {
    circle(this.xPos, this.yPos, 2 * this.rad) 
  }
}