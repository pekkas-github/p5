class Stone {

  constructor(color) {
    this.r     = k*5
    this.x     = this.r
    this.y     = ch/2
    this.v     = {mag: 0, ang: 0}
    this.vCurl = 0
    this.color = color
  }
  
  
  move() {
    const vectors = new Vectors()
    
    // Apply curl speed after hogline and if stone is moving
    const curlAng = (this.v.mag > 0 && this.x > hogline) ? Math.atan(this.vCurl/this.v.mag) : 0
    this.v.ang  += curlAng
    // Apply friction to speed magnitude
    this.v.mag = (this.v.mag - friction <= 0) ? 0 : this.v.mag - friction
    // Change from polar to rect
    const vRect = vectors.getInRectMode(this.v)
    
    // Move the stone with vx*dt and vy*dt
    this.x      += vRect.x 
    this.y      += vRect.y
  }

}