class Mover {

  static shootStone(initialSpeed) {
    Sheet.currentStone.velocity = initialSpeed
  }


  static moveStones() {
    Mover.checkBounces(Sheet.stonesInPlay)
    Mover.setNewPositions(Sheet.stonesInPlay)
    if (Sheet.stonesStopped()) {
      Sheet.removeInvalidStones()
    }
  }
  
  static checkBounces(stonesInPlay) {    
    // Compare pair by pair - start from currentStone (last in Array)
    for (let i = stonesInPlay.length - 1; i >= 0; i--) {
      const stone1 = stonesInPlay[i]
      
      for (let j = i-1; j >= 0; j--) {
        const stone2 = stonesInPlay[j]
        const distanceVector = p5.Vector.sub(stone2.position, stone1.position)
        // Additional 1 ensures that the stones don't "stick" together?
        if (distanceVector.mag() <= (stone1.radius + stone2.radius + 1)) {
          Mover.runBounce(stone1, stone2, distanceVector) 
        }
      }
    }
  }
  
  static runBounce(stone1, stone2, distanceVector) {
    // Add radial and tangential speed components in Stone objects
    Mover.defineComponents(stone1, distanceVector)
    Mover.defineComponents(stone2, distanceVector) 

    // Exchange radial components
    const temp = stone1.vRad
    stone1.vRad = stone2.vRad
    stone2.vRad = temp

    // Add components for new velocity vector
    stone1.velocity = p5.Vector.add(stone1.vRad, stone1.vTan)
    stone2.velocity = p5.Vector.add(stone2.vRad, stone2.vTan)    
  }
  
  static defineComponents(stone, distanceVector) {
    const vRadMag  = p5.Vector.dot(stone.velocity, distanceVector) / distanceVector.mag()
    const vRadUnit = p5.Vector.normalize(distanceVector)
    stone.vRad     = vRadUnit.mult(vRadMag)
    
    stone.vTan     = p5.Vector.sub(stone.velocity, stone.vRad)
  }
  
  static setNewPositions(stonesInPlay) {
    stonesInPlay.forEach( stone => {

      const friction = stone.velocity.copy()
      friction.normalize()
      friction.mult(Sheet.frictionForce)
                  
      const curl = stone.velocity.copy()
      curl.normalize()
      curl.rotate(PI/2)
      curl.mult(stone.curlFactor * Sheet.curlForce)
      
      stone.applyForce(friction)
      stone.applyForce(curl)
      
      stone.move()
    })
  }
}
