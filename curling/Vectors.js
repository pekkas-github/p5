class Vectors {
  /**
  * Return sum vector of v1 and v2.
  * Vectors v1 and v2 are in polar mode.
  * The return value is also in polar mode.
  */
  addVectors(v1, v2) {
    
    // Summation is easier to do in rectangular format
    const v1Rect  = this.getInRectMode(v1)
    const v2Rect  = this.getInRectMode(v2)
    
    const vSumRect = {}
    vSumRect.x     = v1Rect.x + v2Rect.x
    vSumRect.y     = v1Rect.y + v2Rect.y
    
   // Change back to polar mode
    return this.getInPolarMode(vSumRect)
  
  }
  
  /**
  * Convert vector's rectangular coordinates into polar coordinates
  * (x, y) -> (len, ang)
  */
  getInPolarMode(vRect) {
  
    const vPolar = {mag: 0, ang: 0}
  
    vPolar.mag = Math.sqrt(vRect.x ** 2 + vRect.y **2)
    
    if (vRect.x > 0 && vRect.y >= 0) vPolar.ang = Math.atan(vRect.y/vRect.x)  // First quadrant
    if (vRect.x < 0) vPolar.ang = Math.PI + Math.atan(vRect.y/vRect.x)   // Second and third quadrant
    if (vRect.x > 0 && vRect.y < 0) vPolar.ang = 2 * Math.PI + Math.atan(vRect.y/vRect.x) // Fourth quadrant
    if (vRect.x === 0 && vRect.y > 0) vPolar.ang = Math.PI/2 // Staight up
    if (vRect.x === 0 && vRect.y < 0) vPolar.ang = 3*Math.PI/2 // Straight down
    if (vRect.x === 0 && vRect.y === 0) vPolar.ang = 0  // length === 0

    return vPolar
  
  }
  
  /**
  * Convert vector's polar coordinates into rectangular coordinates
  * (len, ang) -> (x, y)
  */
  getInRectMode(vPolar) {
  
    const vRect ={}
    
    vRect.x = vPolar.mag * Math.cos(vPolar.ang)
    vRect.y = vPolar.mag * Math.sin(vPolar.ang)
    
    return vRect
  
  }
  
  /**
  * Divide a vector in rectangular components (rad and tan)
  * where angle of the rad component is radAng.
  */
  getRadAndTanComponents(v, radAng) {
  
    const delta   = (v.ang - radAng)
    const radMag  = v.mag * Math.cos(delta)
    const tanMag  = Math.sqrt(v.mag**2 - radMag**2)
    const tanAng  = (delta >= 0 && delta <= Math.PI || delta <= -Math.PI) ? radAng + Math.PI/2 : radAng - Math.PI/2
    
    return {vRad:{mag: radMag, ang: radAng}, vTan:{mag: tanMag, ang: tanAng}}

  }
}


/*
testVectors()

function testVectors() {
  const t  = new Vectors()
  const pi = Math.PI
  
  console.log('== From rect to polar ==')
  console.log( 'xy (3,4)', t.getInPolarMode({x:3, y:4}) ) 
  console.log( 'xy (3,-4)', t.getInPolarMode({x:3, y:-4}) ) 
  console.log( 'xy (-3,4)', t.getInPolarMode({x:-3, y:4}) ) 
  console.log( 'xy (-3,-4)', t.getInPolarMode({x:-3, y:-4}) ) 
  console.log( 'xy (0,4)', t.getInPolarMode({x:0, y:4}) ) 
  console.log( 'xy (3,0)', t.getInPolarMode({x:3, y:0}) ) 
  console.log( 'xy (0,-4)', t.getInPolarMode({x:0, y:-4}) ) 
  console.log( 'xy (-3,0)', t.getInPolarMode({x:-3, y:0}) ) 
  
  console.log('== From polar to rect ==')
  console.log( 'polar (5, pi/4)', t.getInRectMode({mag:5, ang:pi/4} ) )
  console.log( 'polar (5, -pi/4)', t.getInRectMode({mag:5, ang:-pi/4} ) )
  console.log( 'polar (5, 3pi/4)', t.getInRectMode({mag:5, ang:3*pi/4} ) )
  console.log( 'polar (5, 5pi/4)', t.getInRectMode({mag:5, ang:5*pi/4} ) )
  console.log( 'polar (5, pi/2)', t.getInRectMode({mag:5, ang:pi/2} ) )
  console.log( 'polar (5, 0)', t.getInRectMode({mag:5, ang:0} ) )
  console.log( 'polar (5, pi)', t.getInRectMode({mag:5, ang:pi} ) )
  console.log( 'polar (5, 3pi/2)', t.getInRectMode({mag:5, ang:3*pi/2} ) )
  
  console.log('== Vector summation ==')
  console.log( 'add L', t.addVectors( {mag:1, ang:pi/2}, {mag:1, ang:0} ) )
  console.log( 'add V', t.addVectors( {mag:1, ang:3*pi/4}, {mag:1, ang:pi/4} ) )
  console.log( 'add >', t.addVectors( {mag:1, ang:3*pi/4}, {mag:1, ang:5*pi/4} ) )
  console.log( 'add <', t.addVectors( {mag:1, ang:pi/4}, {mag:1, ang:-pi/4} ) )
  console.log( 'add inv L', t.addVectors( {len:1, ang:pi}, {mag:1, ang:-pi/2} ) )
  
  console.log('== Rad and Tan components ==')
  console.log( 'rad pi/4', t.getRadAndTanComponents({mag:5, ang:0}, pi/4) )
  console.log( 'rad pi/2', t.getRadAndTanComponents({mag:5, ang:0}, pi/2) )
  console.log( 'rad 3pi/4', t.getRadAndTanComponents({mag:5, ang:0}, 3*pi/4) )
  console.log( 'rad -pi/4', t.getRadAndTanComponents({mag:5, ang:0}, -pi/4))

}
*/