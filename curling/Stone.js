class Stone {

  constructor(color) {
    
    this.radius     = k * 5
    this.velocity   = new p5.Vector(0, 0)
    this.position   = new p5.Vector(this.radius, 0)
    this.curlFactor = 0
    this.color      = color
  }
  
  
  applyForce(force) {
    if (this.velocity.mag() > force.mag()) {
      this.velocity.add(force)
    } else {
      this.velocity.setMag(0)
    }
  }


  move() {
    this.position.add(this.velocity)
  }
    
    
  decCurl() {

    if (this.curlFactor < 3) {this.curlFactor++}
    if (this.curlFactor === 0) this.curlFactor = 1
  }

  incCurl() {
  
    if (this.curlFactor > -3) {this.curlFactor--} 
    if (this.curlFactor === 0) this.curlFactor = -1
  }
}
