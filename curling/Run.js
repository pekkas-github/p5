const k           = 1.5

function setup() {
  createCanvas(Sheet.width, Sheet.height)
  Game.initialize()
  End.initialize(Game.lastWinner)
  Sheet.prepareNextStone()
}

function draw() {
  translate(Sheet.origo.x, Sheet.origo.y)
  background(250)
  View.render()
  FSM.execute('run')
}