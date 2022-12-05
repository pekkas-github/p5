class BounceEngine {
  
  moveStones(stones) {
    const coord = new Coordinates()
    const n     = stones.length   // number of stones
    
    // Compare pair by pair
    for (let i = 0; i < n-1; i++) {
      const b1 = stones[i]
      
      for (let j = i+1; j < n; j++) {
        const b2 = stones[j]
        // Distance vector between ball centers after next move
        const distance = coord.toRA((b2.x+b2.vx)-(b1.x+b1.vx), (b2.y+b2.vy)-(b1.y+b1.vy)) 
        // There is a bounce if the distance is less than the sum of radii
        if (distance.mag <= (b1.r + b2.r)) {
          // Define radial and tangential speed components as polar coordinates
          const b1vNT = b1.getNTComponents(distance.ang)
          const b2vNT = b2.getNTComponents(distance.ang)
                                     
          // Calculate new radial speeds for stones
          const b1vnmag = b2vNT.vn.mag
          const b2vnmag = b1vNT.vn.mag
          
          // Change radial and normal speeds in rectangular coordinates
          const b1vnxy = coord.toXY(b1vnmag, b1vNT.vn.ang)
          const b1vtxy = coord.toXY(b1vNT.vt.mag, b1vNT.vt.ang)
          const b2vnxy = coord.toXY(b2vnmag, b2vNT.vn.ang)
          const b2vtxy = coord.toXY(b2vNT.vt.mag, b2vNT.vt.ang)

          // Update stones' sppeds (xy components)
          b1.vx = b1vnxy.x + b1vtxy.x
          b1.vy = b1vnxy.y + b1vtxy.y
          b2.vx = b2vnxy.x + b2vtxy.x
          b2.vy = b2vnxy.y + b2vtxy.y
        }
      }
    }
    // Move the stones
    stones.forEach( stone => {
      stone.move() 
    })
  }
  
  
}