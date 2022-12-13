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
let view          = new View()

function setup() {
  createCanvas(cw, ch)
}


function draw() {
  background(250)
  view.drawBoardCircles()
  view.drawBoardLines()
  view.drawStones()
  view.updateScoreBoard()
  game.run()
}

