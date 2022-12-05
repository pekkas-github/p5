const games = new GameFactory()
//const coord   = new Coordinates()
let game    = games.createGame('fullyManual')

function setup() {
  createCanvas(game.cw, game.ch)
}


function draw() {
  background(200)
  game.run()
}

function keyPressed() {
  game.keyPressed() 
}

function mouseClicked() {
  game.mouseClicked() 
}