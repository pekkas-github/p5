class Bat {

  constructor() {
    this.batLevel = 30
    this.batSize  = 50
    this.batPos   = 50
  }

  move() {
    if (mouseY < topLine) this.batPos = topLine
    if (mouseY > height - this.batSize) this.batPos = height - this.batSize
    if (mouseY >= topLine && mouseY <= height - this.batSize) this.batPos = mouseY
  }
  
  draw() {
    rect(20, this.batPos, this.batLevel - 20, this.batSize) 
  }
}