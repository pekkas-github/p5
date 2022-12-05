class Ball {

  constructor(m, x, y, vx, vy, color) {
    this.m  = m
    this.r  = 3 * m**0.333
    this.d  = 2 * this.r
    this.x  = x
    this.y  = y
    this.vx = vx
    this.vy = vy
    this.color  = color || 0
  }
  
  draw() {
    fill(this.color)
    circle(this.x, game.ch - this.y, this.d)  
  }
  
  move() {
    const coord = new Coordinates()
    const v     = coord.toRA(this.vx, this.vy)
    v.mag       = (v.mag - game.friction <= 0) ? 0 : v.mag - game.friction
    const vxy   = coord.toXY(v.mag, v.ang)
    
    this.vx     = vxy.x
    this.vy     = vxy.y
    
    this.x      = this.x + this.vx
    this.y      = this.y + this.vy
  }
    
  getNTComponents(bounceAngle) {
    const coord        = new Coordinates()
    const ballSpeed    = coord.toRA(this.vx, this.vy)
    const deltaAngle   = (ballSpeed.ang - bounceAngle)
    const normalSpeed  = ballSpeed.mag * Math.cos(deltaAngle)
    const tangentAngle = (deltaAngle >= 0 && deltaAngle <= Math.PI || deltaAngle <= -Math.PI) ? bounceAngle + Math.PI/2 : bounceAngle - Math.PI/2
    const tangentSpeed = sqrt(ballSpeed.mag**2 - normalSpeed**2)
    
    return {vn:{mag: normalSpeed, ang: bounceAngle}, vt:{mag: tangentSpeed, ang: tangentAngle}}
  }

}