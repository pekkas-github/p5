class Sheet {
    
  static width          = 1500
  static height         = k*160
  static origo          = {x: 0, y: Sheet.height / 2}

  static leftedge       = -Sheet.height / 2
  static rightedge      = Sheet.height / 2
  static centerline     = 0
  static backline       = Sheet.width - k*60
  static teeline        = Sheet.width - k*120
  static hogline        = Sheet.width - k*330

  static frictionForce  = -0.005
  static curlForce      = 0.0002

  static stoneStorage   = []
  static stonesInPlay   = []
  static currentStone

  
  static removeInvalidStones() {
    const validStones = []
    
    Sheet.stonesInPlay.forEach( stone => {
      if (
        stone.position.y > Sheet.leftedge + stone.radius &&
        stone.position.y < Sheet.rightedge - stone.radius &&
        stone.position.x > Sheet.hogline + stone.radius &&
        stone.position.x < Sheet.backline + stone.radius) {

        validStones.push(stone)
      }
    })
    
    Sheet.stonesInPlay = validStones
  }


  static getStonesInHomeBase() {
    const home = new p5.Vector(Sheet.teeline, 0)
    
    // Calculate and add vector 'distances from home' in stones
    Sheet.stonesInPlay.forEach(stone => {
      stone.distance = p5.Vector.sub(home, stone.position) 
    })
                               
    // Sort stones per distance
    if (Sheet.stonesInPlay.length > 1) {
      Sheet.stonesInPlay.sort( (a, b) => {
         return a.distance.mag() - b.distance.mag()
      })
    }

    // Return valid stones
    const stonesInHomeBase = Sheet.stonesInPlay.filter( stone => {
      return (stone.distance.mag() - stone.radius) < (Sheet.backline - Sheet.teeline) 
    })
    console.table(stonesInHomeBase)
    return stonesInHomeBase

  }
  

  static prepareNextStone() {
    Sheet.currentStone = Sheet.stoneStorage.shift()
    Sheet.stonesInPlay.push(Sheet.currentStone)
  }


  static stonesStopped() {
    let result = true
    
    Sheet.stonesInPlay.forEach( stone => {
      if (stone.velocity.mag() > 0) result = false
    }) 
    
    return result
  }
}
