class End {

  static stonePairsPerEnd
  
  static initialize(lastWinner) {
    End.stonePairsPerEnd = 2
    Sheet.stoneStorage     = []
    Sheet.stonesInPlay     = []

    // Load stone storage
    for (let i = 0; i < End.stonePairsPerEnd; i++) {

      let color = lastWinner
      const stone1 = new Stone(color)

      color = (color === 'y') ? 'r' : 'y'
      const stone2 = new Stone(color)

      Sheet.stoneStorage.push(stone1)
      Sheet.stoneStorage.push(stone2)
    }    
  }

  
  static isFinished() {
    if (Sheet.stoneStorage.length === 0) {
      return true
    }
    return false
  }
  
  
  static getScore() {
    const stonesInHomeBase = Sheet.getStonesInHomeBase()
    const result = {winner: 'even', y: 0, r: 0}
    
    // No stones in home base -> result is even
    if (stonesInHomeBase.length === 0) {
      return result
    }
    
    // Count winner stones and return score
    const winner = stonesInHomeBase[0].color
    let score    = 0
    let i        = 0
    
    result.winner = winner
    while (i < stonesInHomeBase.length && stonesInHomeBase[i].color === winner) {
      result[winner]++
      i++
    }
    return result
  }

}
