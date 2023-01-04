class Board {

  constructor() {
    
    this.width          = 1500
    this.height         = k*160
    this.centerline     = this.height / 2
    this.backline       = this.width - k*60
    this.teeline        = this.width - k*120
    this.hogline        = this.width - k*330 
  
  }

  createBoard() {
    
    createCanvas(this.width, this.height)

  }
  
}