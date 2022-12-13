class View {

  constructor() {
    this.txtEnds   = document.querySelector('#ends')
    this.txtStones = document.querySelector('#stones')
    this.txtYellow = document.querySelector('#yellow')
    this.txtRed    = document.querySelector('#red')
    this.txtCurl   = document.querySelector('#curl')
    this.btnNewEnd = document.querySelector('#btn-new-end')
    
    this.btnNewEnd.onclick = function() {
      if (game.state === 'idle') {game.newEnd()}
      if (game.state === 'finished') {game = new Game()}
      this.txtCurl.innerText = 0
    }
  }
  
  drawBoardCircles() {
    fill(255,0,0) // red
    noStroke()
    circle(teeline, ch/2, k*120)
    fill(255) // white
    circle(teeline, ch/2, k*80)
    fill(0,0,255) // blue
    circle(teeline, ch/2, k*40)
    fill(255) // white
    circle(teeline, ch/2, k*20)
  }

  drawBoardLines() {
    stroke(0)
    line(0, centerline, cw, centerline)
    line(hogline, 0, hogline, ch)
    line(teeline, 0, teeline, ch)
    line(backline, 0, backline, ch)
  }

  drawStones() {  
    stroke(0)
    game.currentEnd.stones.stonesInPlay.forEach( stone => {
      if (stone.color === 'y') {
        fill(255, 255, 0) 
      } else {
        fill(255, 0, 0) 
      }
      circle(stone.x, ch - stone.y, 2*stone.r)
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
  
    if (game.state === 'running') {
        this.btnNewEnd.innerText = 'New End'
        this.btnNewEnd.disabled = true}
    if (game.state === 'idle') {this.btnNewEnd.disabled = false}
    if (game.state === 'finished') {
        this.btnNewEnd.disabled = false
        this.btnNewEnd.innerText = 'New Game'}
    
    if (game.currentEnd.state === 'stopped')  view.showCurlFactor(0)

  }
    
  showCurlFactor(value) {
    this.txtCurl.innerText = value
  }
}

// Global event listeners
function keyPressed() {
  if (game.currentEnd.state === 'running') return
  
  if (keyCode === 32)         game.currentEnd.shoot(mouseX, mouseY)
  if (keyCode === UP_ARROW)   game.currentEnd.incrCurl()
  if (keyCode === DOWN_ARROW) game.currentEnd.decrCurl()
  
  view.showCurlFactor(game.currentEnd.curlFactor)
}