class Stones {

  constructor(color) {
    this.bouncer      = new BounceEngine()
    this.currentStone = new Stone(color)
    this.stonesInPlay = [this.currentStone]
    this.state        = 'ready' // stopped, running, ready
   
    // API
    this.run = () => {
      if (this.state === 'running') { this.moveStones() }
    }
    this.add = (color) => {
      if (this.state === 'stopped') { this.addStone(color) }
    }
    this.shoot = (x,y) => {
      if (this.state === 'ready') { this.shootStone(x, y)}
    }
  }
  
  addStone(color) {
    this.currentStone = new Stone(color)
    this.stonesInPlay.push(this.currentStone)
    this.state = 'ready'
  }

  
  shootStone(x, y) {
    const vx = (x / cw) * 5
    const vy = (ch/2 - y)/x * vx
    this.currentStone.vx = vx
    this.currentStone.vy = vy
    this.state = 'running' 
  }
  
  moveStones() {
    this.bouncer.moveStones(this.stonesInPlay)
    if (this.stonesStopped()) {
      this.removeStones()
      this.state = 'stopped'  
    }
  }
  
  stonesStopped() {
    let status = true
    this.stonesInPlay.forEach( stone => {
      if (stone.vx > 0 || stone.vy > 0) {
        status = false  // at least one stone is moving
      }
    })
    return status
  }
  
  removeStones() {
    this.stonesInPlay.forEach( (stone, index) => {
      if (stone.y > (ch - stone.r) || stone.y < stone.r || (stone.x - stone.r) > backline || (stone.x - stone.r) < hogline) {
        this.stonesInPlay.splice(index, 1)
      }
    })
  }
  
  getValidStones() {
    const hx          = teeline
    const hy          = ch/2

    this.stonesInPlay.sort( (a, b) => {
       const distA = Math.sqrt((a.x - hx)**2 + (a.y - hy)**2)
       const distB = Math.sqrt((b.x - hx)**2 + (b.y - hy)**2)
       a.dist = distA
       b.dist = distB
       return distA - distB
    })

    const validStones = this.stonesInPlay.filter( stone => {
      return (stone.dist - stone.r) < (backline - teeline) 
    })
    
    return validStones
  }
}