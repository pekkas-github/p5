  class Coordinates {
  
  // xy-coordinate system: Positive x-direction to right, positive y-direction upwards.
  // ra-coordinate system: positive angle direction counter-clockwise (0..2*pi)

  // Change origo based polar coords to origo based xy-coords
  toXY(length, angle) {
    const x_coord = length * Math.cos(angle)
    const y_coord = length * Math.sin(angle)
    
    return {x: x_coord, y: y_coord}
  }
  
  // Change origo based xy-coords to origo based polar coords (angle 0..2pi)
  toRA(x, y) {
    const length = sqrt(x**2 + y**2)
    
    if (x > 0 && y >= 0) {return {mag: length, ang: Math.atan(y/x)}}  // First quadrant
    if (x < 0) {return {mag: length, ang: Math.PI + Math.atan(y/x)}}   // Second and third quadrant
    if (x > 0 && y < 0) {return {mag: length, ang: 2 * Math.PI + Math.atan(y/x)}} // Fourth quadrant
    if (x === 0 && y > 0) {return {mag: length, ang: Math.PI/2}} // Staight up
    if (x === 0 && y < 0) {return {mag: length, ang: 3*Math.PI/2}} // Straight down
    {return {mag: length, ang: 0}}  // length === 0
  }
  
}