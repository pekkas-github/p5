const k           = 2
const friction    = 0.005
const curlSpeed   = 0.0005
const board       = new Board()
const game        = new Game()
const view        = new View()

const stateTransitionTable = [
  ['inc_curl' , 'wait_curl' , () => game.incCurl()                , 'none'       , 'ready'],
  ['inc_curl' , 'ready'     , () => game.incCurl()                , 'none'       , 'ready'],
  ['dec_curl' , 'wait_curl' , () => game.decCurl()                , 'none'       , 'ready'],
  ['dec_curl' , 'ready'     , () => game.decCurl()                , 'none'       , 'ready'],
  ['shoot'    , 'ready'     , (args) => game.shootStone(args)     , 'none'       , 'running'],
  ['run'      , 'running'   , () => game.moveStones()             , 'running'    , 'running'],
  ['run'      , 'running'   , () => game.moveStones()             , 'not_running', 'stopped'],
  ['run'      , 'running'   , () => game.moveStones()             , 'end_done'   , 'score'],
  ['run'      , 'stopped'   , () => game.newStone()               , 'none'       , 'wait_curl'],
  ['run'      , 'score'     , () => game.getResult()              , 'next_end'   , 'idle'],
  ['run'      , 'score'     , () => game.getResult()              , 'game_over'  , 'end'],
  ['new_end'  , 'idle'      , () => game.newEnd()                 , 'none'       , 'wait_curl']
]

const fsm         = new FSM(stateTransitionTable)


function setup() {

  board.createBoard()

}


function draw() {

  background(250)
  view.render()
  fsm.execute('run')

}

