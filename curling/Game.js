class Game {

  static endsPerGame = 10
  static currentEnd
  static lastWinner
  static totalScore = {y: 0, r: 0}


  static initialize() {
    Game.currentEnd = 1
    Game.lastWinner = 'y'
    Game.totalScore = {y: 0, r: 0}
  }


  static findEndScore() {
    const result = End.getScore()
 
    Game.lastWinner = result.winner
    Game.totalScore.y += result.y
    Game.totalScore.r += result.r
    Game.currentEnd++    
    Sheet.currentStone.curlFactor = 0
  }
}
