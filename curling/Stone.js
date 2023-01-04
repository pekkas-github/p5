class Stone {

  constructor(color) {
    
    this.r     = k*5
    this.x     = this.r
    this.y     = board.height / 2
    this.v     = {mag: 0, ang: 0}
    this.curl  = 0
    this.color = color
  
  }
  
  
  move() {
  
    const vectors = new Vectors()
    
    // Apply curl speed after hogline and if stone is moving
    const curlAng = (this.v.mag > 0 && this.x > board.hogline) ? Math.atan(this.curl * curlSpeed / this.v.mag) : 0
    this.v.ang  += curlAng
    
    // Apply friction to speed magnitude
    if (this.v.mag - friction <= 0) {
      this.v.mag = 0
      this.curl  = 0
    } else {
      this.v.mag = this.v.mag - friction
    }
    
    // Change from polar to rect
    const vRect = vectors.getInRectMode(this.v)
    
    // Move the stone with vx*dt and vy*dt
    this.x      += vRect.x 
    this.y      += vRect.y
  
  }
  
  shoot(x, y) {
    
    this.v.mag = 5 * Math.sqrt(x**2 + y**2) / board.width
    this.v.ang = Math.atan((board.height/2 - y) / x)
  
  }
  
  incCurl() {

    if (this.curl < 3) {this.curl++}
    if (this.curl === 0) this.curl = 1
  
  }

  decCurl() {
  
    if (this.curl > -3) {this.curl--} 
    if (this.curl === 0) this.curl = -1
  
  }


}