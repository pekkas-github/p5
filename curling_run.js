const k           = 2
const friction    = 0.005
const curlSpeed   = 0.0005
    // board
const cw          = 1500
const ch          = k*160
const centerline  = ch/2
const backline    = cw - k*60
const teeline     = cw - k*120
const hogline     = cw - k*330

let game          = new Game()

const txtEnds   = document.querySelector('#ends')
const txtStones = document.querySelector('#stones')
const txtYellow = document.querySelector('#yellow')
const txtRed    = document.querySelector('#red')
const txtCurl   = document.querySelector('#curl')

const btnNewEnd = document.querySelector('#btn-new-end')
btnNewEnd.onclick = () => {
  if (game.state === 'idle') {game.newEnd()}
  if (game.state === 'finished') {game = new Game()}
  txtCurl.innerText = 0
}

function setup() {
  createCanvas(cw, ch)
}


function draw() {
  background(250)
  drawBoardCircles()
  drawBoardLines()
  drawStones()
  drawScoreBoard()
  game.run()
  if (game.currentEnd.state === 'stopped') txtCurl.innerText = 0
}

function drawBoardCircles() {
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

function drawBoardLines() {
  stroke(0)
  line(0, centerline, cw, centerline)
  line(hogline, 0, hogline, ch)
  line(teeline, 0, teeline, ch)
  line(backline, 0, backline, ch)
}

function drawStones() {  
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
 
function drawScoreBoard() {
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
  
    txtEnds.innerText = ends
    txtStones.innerText = stones
    txtYellow.innerText = game.score.y
    txtRed.innerText = game.score.r
  
    if (game.state === 'running') {
        btnNewEnd.innerText = 'New End'
        btnNewEnd.disabled = true}
    if (game.state === 'idle') {btnNewEnd.disabled = false}
    if (game.state === 'finished') {
        btnNewEnd.disabled = false
        btnNewEnd.innerText = 'New Game'}
    
}

function keyPressed() {
  if (keyCode === 32) {
    game.currentEnd.shoot(mouseX, mouseY)
  }
  if (keyCode === UP_ARROW) {game.currentEnd.incrCurl()}
  if (keyCode === DOWN_ARROW) {game.currentEnd.decrCurl()}
  
  txtCurl.innerText = game.currentEnd.curlFactor
}