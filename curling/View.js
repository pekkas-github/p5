class View {

  constructor() {
    
    this.txtEnds   = document.querySelector('#ends')
    this.txtStones = document.querySelector('#stones')
    this.txtYellow = document.querySelector('#yellow')
    this.txtRed    = document.querySelector('#red')
    this.txtCurl   = document.querySelector('#curl')
    this.btnNewEnd = document.querySelector('#btn-new-end')
  }
  
  render() {
  
    this.drawBoardCircles()
    this.drawBoardLines()
    this.drawStones()
    this.updateScoreBoard()
    this.setEventListeners()  
  }
  
  drawBoardCircles() {

    fill(255,0,0) // red
    noStroke()
    circle(board.teeline, board.height/2, k*120)
    fill(255) // white
    circle(board.teeline, board.height/2, k*80)
    fill(0,0,255) // blue
    circle(board.teeline, board.height/2, k*40)
    fill(255) // white
    circle(board.teeline, board.height/2, k*20)
  
  }

  drawBoardLines() {
    
    stroke(0)
    line(0, board.centerline, board.width, board.centerline)
    line(board.hogline, 0, board.hogline, board.height)
    line(board.teeline, 0, board.teeline, board.height)
    line(board.backline, 0, board.backline, board.height)
  
  }

  drawStones() {  
  
    stroke(0)
    game.currentEnd.stonesInPlay.forEach( stone => {
      if (stone.color === 'y') {
        fill(255, 255, 0) 
      } else {
        fill(255, 0, 0) 
      }
      circle(stone.x, board.height - stone.y, 2*stone.r)
    })
  }

  
  updateScoreBoard() {
    
    let ends            = ''
    let playedEnds      = game.playedEnds.length
    for (let i = 1; i <= game.endsPerGame; i++) {
      ends += (playedEnds === i) ? i + ' '  : '- '
    }
  
    let stones          = ''
    let playedStones    = Math.floor((game.currentEnd.executedShots + 2) / 2)
    for (let i = 1; i <= game.currentEnd.shotsPerEnd / 2; i++) {
      stones += (playedStones === i) ? i + ' ' : '- '
    }

    this.txtEnds.innerText = ends
    this.txtStones.innerText = stones
    this.txtYellow.innerText = game.score.y
    this.txtRed.innerText = game.score.r
  
    if (fsm.state === 'running') {
        this.btnNewEnd.innerText = 'New End'
        this.btnNewEnd.disabled = true}
    if (fsm.state === 'idle') {this.btnNewEnd.disabled = false}
    if (fsm.state === 'end') {
        this.btnNewEnd.disabled = false
        this.btnNewEnd.innerText = 'New Game'}
    
    this.txtCurl.innerText = game.currentEnd.currentStone.curl
  
  }  
  
  setEventListeners() {

    this.btnNewEnd.onclick = () => fsm.execute('new_end')
  }

}

// Global event listeners


function keyPressed() {
  
  if (keyCode === 32)         fsm.execute('shoot', mouseX, mouseY)
  if (keyCode === UP_ARROW)   fsm.execute('inc_curl') 
  if (keyCode === DOWN_ARROW) fsm.execute('dec_curl') 
  
}