class BounceEngine {
  
  moveStones(stones) {
    
    const vectors = new Vectors()
    const n       = stones.length   // number of stones
    
    // Compare pair by pair
    for (let i = 0; i < n-1; i++) {
      const s1 = stones[i]
      
      for (let j = i+1; j < n; j++) {
        const s2 = stones[j]
        // Distance vector between ball centers
        const distanceVector = vectors.getInPolarMode( {x: (s2.x - s1.x), y: (s2.y - s1.y)} ) 
        // There is a bounce if the distance is less than sum of the radii
        // Additional 1 ensures that the stones don't "stick" together
        if (distanceVector.mag <= (s1.r + s2.r + 1)) {
          // Get radial and tangential speed components of stone's speed
          const s1Comps = vectors.getRadAndTanComponents(s1.v, distanceVector.ang) 
          const s2Comps = vectors.getRadAndTanComponents(s2.v, distanceVector.ang) 
                                     
          // Exchange radial speeds between stones
          const s1vRad = s1Comps.vRad.mag
          s1Comps.vRad.mag = s2Comps.vRad.mag
          s2Comps.vRad.mag = s1vRad
          
          // New stone speed is sum of radial and tangential components
          s1.v = vectors.addVectors(s1Comps.vRad, s1Comps.vTan)
          s2.v = vectors.addVectors(s2Comps.vRad, s2Comps.vTan)
        }
      }
    }
    // Move the stones
    stones.forEach( stone => {
      stone.move() 
    })
  
  }
}