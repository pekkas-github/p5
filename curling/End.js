class End {

  constructor(winnerColor) {
    
    this.shotsPerEnd   = 16
    this.executedShots = 0
    
    this.bouncer       = new BounceEngine()
    this.currentStone  = new Stone(winnerColor)
    this.stonesInPlay  = [this.currentStone]
    
  }
    
  
  moveStones() {
   
    this.bouncer.moveStones(this.stonesInPlay)
 
  }
 
  stonesStopped() {
    
    let status = true
    this.stonesInPlay.forEach( stone => {
      if (stone.v.mag > 0) {
      status = false  // at least one stone is moving
      }
    })
    if (status === true) this.executedShots++
    return status
 
  }
  
  removeStones() {
    
    this.stonesInPlay.forEach( (stone, index) => {
      if (stone.y > (board.height - stone.r) || stone.y < stone.r || (stone.x - stone.r) > board.backline || (stone.x - stone.r) < board.hogline) {
        this.stonesInPlay.splice(index, 1)
      }
    })
  
  }
  
  isFinished() {
    
    if (this.executedShots === this.shotsPerEnd) return true
    return false
  
  }

  
  newStone() {
  
    const color = (this.currentStone.color === 'y') ? 'r' : 'y'
    this.currentStone = new Stone(color)
    this.stonesInPlay.push(this.currentStone)
    
  }
  
  getResult() {
   
    const validStones = this.getValidStones()

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
  
  
  getValidStones() {

    const hx          = board.teeline
    const hy          = board.height/2
    
    // Only one stone in play
    if (this.stonesInPlay.length === 1) {
      const a = this.stonesInPlay[0]
      a.dist = Math.sqrt((a.x - hx)**2 + (a.y - hy)**2)
    }

    // None stones or more than 1 stone in play
    this.stonesInPlay.sort( (a, b) => {
       const distA = Math.sqrt((a.x - hx)**2 + (a.y - hy)**2)
       const distB = Math.sqrt((b.x - hx)**2 + (b.y - hy)**2)
       a.dist = distA
       b.dist = distB
       return distA - distB
    })

    const validStones = this.stonesInPlay.filter( stone => {
      return (stone.dist - stone.r) < (board.backline - board.teeline) 
    })
    
    return validStones
  
  }

}
