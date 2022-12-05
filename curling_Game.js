class Game {

  constructor() {
    this.currentEnd  = new End('y')
    this.playedEnds  = [this.currentEnd]
    this.endsPerGame = 10
    this.score       = {y: 0, r: 0}
    this.state       = 'running'
    this.winner      = ''
    //API
    this.run = () => {
      if (this.state === 'running') { this.runEnd() }
    }
    
    this.newEnd = () => {
      if (this.state === 'idle') { this.startNewEnd() }
    }
  }

  runEnd() {
    // Run current end until all stones are shot
    const result = this.currentEnd.run()
    
    // If end is finished (returns results) then update score  
    if (result != null) {
      if (result.color === 'y') {
        this.score.y += result.score
      } else {
        this.score.r += result.score
      }
      this.winner = result.color
      this.state = (this.playedEnds.length === this.endsPerGame) ? 'finished' : 'idle'
    }   
  }
  
  startNewEnd() {
    // Create new end, the winner starts
    this.currentEnd = new End(this.winner)
    this.playedEnds.push(this.currentEnd)
    this.state = 'running'
  }
}