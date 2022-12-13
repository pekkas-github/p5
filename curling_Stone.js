class Stone {

  constructor(color) {
    this.r     = k*5
    this.x     = this.r
    this.y     = ch/2
    this.vx    = 0
    this.vy    = 0
    this.vc    = 0
    this.color = color
  }
  
  
  move() {
    // Stone's xy-speed components to ra-components
    const coord = new Coordinates()
    const vra   = coord.toRA(this.vx, this.vy)

    // Apply curl speed after hogline and if stone is moving
    const curlAngle = (vra.mag > 0 && this.x > hogline) ? Math.atan(this.vc/vra.mag) : 0
    vra.ang     = vra.ang + curlAngle
    // Apply friction to speed magnitude
    vra.mag     = (vra.mag - friction <= 0) ? 0 : vra.mag - friction

    // Change ra-format back to xy-format
    const vxy   = coord.toXY(vra.mag, vra.ang)
    this.vx     = vxy.x
    this.vy     = vxy.y
    
    // Move the stone with vx*dt and vy*dt
    this.x      = this.x + this.vx
    this.y      = this.y + this.vy
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