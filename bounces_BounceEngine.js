class BounceEngine {
  
  bounceFromWalls(balls) {
    balls.forEach(ball => {
      // Vertical walls (left, right)
      if (ball.x - ball.r <= 0) {
        ball.x = ball.r
        ball.vx = - ball.vx
      }
      
      if (ball.x + ball.r >= game.cw) {
        ball.x = game.cw - ball.r
        ball.vx = -ball.vx
      }
                                
      // Horizontal walls (upper, lower)
      if (ball.y - ball.r <= 0) {
        ball.y = ball.r
        ball.vy = -ball.vy 
      } 
      
      if (ball.y + ball.r >= game.ch) {
        ball.y = game.ch - ball.r
        ball.vy = -ball.vy
      }
    }) 
  }
  
  bounceFromBalls(balls) {
    const coord = new Coordinates()
    const n     = balls.length   // number of balls
    
    // Compare pair by pair
    for (let i = 0; i < n-1; i++) {
      const b1 = balls[i]
      
      for (let j = i+1; j < n; j++) {
        const b2 = balls[j]
        // Distance vector between ball centers after next move
        const distance = coord.toRA((b2.x+b2.vx)-(b1.x+b1.vx), (b2.y+b2.vy)-(b1.y+b1.vy)) 
        // There is a bounce if the distance is less than the sum of radii
        if (distance.mag <= (b1.r + b2.r)) {
          // määritä normaalinopeudet ja tangenttinopeudet
          const b1vNT = b1.getNTComponents(distance.ang)
          const b2vNT = b2.getNTComponents(distance.ang)
                                     
          // laske uudet normaalinopeudet (tässä vn:llä pitää olla suunta (kohti tai poispäin))
          const b1vnmag = b1vNT.vn.mag*((b1.m-b2.m)/(b1.m+b2.m)) + b2vNT.vn.mag*(2*b2.m/(b1.m+b2.m))
          const b2vnmag = b1vNT.vn.mag*(2*b1.m/(b1.m+b2.m)) - b2vNT.vn.mag*((b1.m-b2.m)/(b1.m+b2.m))
          
          // määritä uudet nopeusvektorit
          const b1vnxy = coord.toXY(b1vnmag, b1vNT.vn.ang)
          const b1vtxy = coord.toXY(b1vNT.vt.mag, b1vNT.vt.ang)
          const b2vnxy = coord.toXY(b2vnmag, b2vNT.vn.ang)
          const b2vtxy = coord.toXY(b2vNT.vt.mag, b2vNT.vt.ang)

          b1.vx = b1vnxy.x + b1vtxy.x
          b1.vy = b1vnxy.y + b1vtxy.y
          b2.vx = b2vnxy.x + b2vtxy.x
          b2.vy = b2vnxy.y + b2vtxy.y
        }
      }
    }
  }
  
  
}