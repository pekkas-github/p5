class End {

  constructor(color) {
    this.color         = color
    this.shotsPerEnd   = 16
    this.executedShots = 0
    this.stones        = new Stones(color)
    this.state         = 'idle'
    this.curlFactor    = 0
    
    
    // API
    this.run = () => {
      if (this.state === 'running') { return this.runEnd() }
      if (this.state === 'stopped') { this.setNewStone() }
      }
    
    this.shoot = (x, y) => {
      if (this.state === 'idle') { this.shootStone(x, y) }
      }
  }
  
  
  
  runEnd() {
    this.stones.run()    

    if (this.stones.state === 'stopped') {
      this.executedShots++
      this.state = 'stopped'
    }

    if (this.executedShots === this.shotsPerEnd) {
      this.state = 'finished'
      return this.getResult() 
    }

    return null 
  }
  
  setNewStone() {
    const color = (this.stones.currentStone.color === 'y') ? 'r' : 'y'
    this.stones.add(color)
    this.curlFactor  = 0
    this.state       = 'idle'
  }
  
  getResult() {
    const validStones = this.stones.getValidStones()

    if (validStones.length === 0) {
      return {color: this.color, score: 0} 
    }
    
    // Count winner stones and return score
    const color = validStones[0].color
    let score   = 0
    let i       = 0
    
    while (i < validStones.length && validStones[i].color === color) {
      score++
      i++
    }
    
    return {color: color, score: score}
  }
    
  shootStone(x, y) {
    if (this.curlFactor === 0) return
    this.stones.shoot(x, y, this.curlFactor)
    this.state = 'running'
  }
  
  incrCurl() {
    if (this.curlFactor < 3) {this.curlFactor++}
    if (this.curlFactor === 0) this.curlFactor = 1
  }

  decrCurl() {
    if (this.curlFactor > -3) {this.curlFactor--} 
    if (this.curlFactor === 0) this.curlFactor = -1
  }

}