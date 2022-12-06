class Stone {

  constructor(color) {
    this.r     = k*5
    this.x     = this.r
    this.y     = ch/2
    this.vx    = 0
    this.vy    = 0
    this.color = color
    this.state = 'stopped'
  }
  
  
  move() {
    const coord = new Coordinates()
    const vra     = coord.toRA(this.vx, this.vy)
    vra.mag       = (vra.mag - friction <= 0) ? 0 : vra.mag - friction
    const vxy   = coord.toXY(vra.mag, vra.ang)
    
    this.vx     = vxy.x
    this.vy     = vxy.y
    
    this.x      = this.x + this.vx
    this.y      = this.y + this.vy

    this.setState()
  }

  setState() {
    if (this.vx === 0 && this.vy === 0) {
      this.state = 'stopped'
    } else {
      this.state = 'moving'
    }
  }
    
  getNTComponents(bounceAngle) {
    const coord   = new Coordinates()
    const vStone  = coord.toRA(this.vx, this.vy)
    const delta   = (vStone.ang - bounceAngle)
    const vRad    = vStone.mag * Math.cos(delta)
    const vTan    = sqrt(vStone.mag**2 - vRad**2)
    const aTan    = (delta >= 0 && delta <= Math.PI || delta <= -Math.PI) ? bounceAngle + Math.PI/2 : bounceAngle - Math.PI/2
    
    return {vn:{mag: vRad, ang: bounceAngle}, vt:{mag: vTan, ang: aTan}}
  }

}