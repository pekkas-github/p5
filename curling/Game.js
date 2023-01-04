class Game {

  constructor() {
    
    this.endsPerGame = 5
    this.score       = {y: 0, r: 0}
    this.winner      = 'y'
    this.currentEnd  = new End(this.winner)
    this.playedEnds  = [this.currentEnd]

    
  }
  
  getResult() {
    
    const result = this.currentEnd.getResult()
    
    if (result.color === 'y') {
      this.score.y += result.score
    } else {
      this.score.r += result.score
    }
    this.winner = result.color
    
    if (this.playedEnds.length === this.endsPerGame) return 'game_over'
    
    return 'next_end'
  
  }
  
  moveStones() {
    
    let result = 'running'
    this.currentEnd.moveStones()
 
    if (this.currentEnd.stonesStopped()) {
      this.currentEnd.removeStones()
      result = 'not_running'
    }
  
    if (this.currentEnd.isFinished()) {
      result = 'end_done'
    }
    
    return result
  
  }
  
  newEnd() {
    
    // Create new end, the winner starts
    this.currentEnd = new End(this.winner)
    this.playedEnds.push(this.currentEnd)
    return 'none'
  }
  
  newStone() {
   
    this.currentEnd.newStone()
    return 'none'
  }
 
  shootStone(args) {

    const x = args[0]
    const y = args[1]
    this.currentEnd.currentStone.shoot(x, y)
    return 'none'
  
  }
    
  incCurl() {
    
    this.currentEnd.currentStone.incCurl()
    return 'none'
  
  }
    
  decCurl() {
    
    this.currentEnd.currentStone.decCurl()
    return 'none'
  
  }
}