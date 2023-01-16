class FSM {

  static stateTable = [
    {state:'game_idle'      , event:'new_game'    , act:'newGame'       ,resp:'none'         ,next:'stone_idle'     },
    {state:'end_idle'       , event:'new_end'     , act:'newEnd'        ,resp:'none'         ,next:'stone_idle'     },
    {state:'stone_idle'     , event:'curl_left'   , act:'incCurl'       ,resp:'none'         ,next:'shoot_ready'    },
    {state:'stone_idle'     , event:'curl_right'  , act:'decCurl'       ,resp:'none'         ,next:'shoot_ready'    },
    {state:'shoot_ready'    , event:'curl_left'   , act:'incCurl'       ,resp:'none'         ,next:'shoot_ready'    },
    {state:'shoot_ready'    , event:'curl_right'  , act:'decCurl'       ,resp:'none'         ,next:'shoot_ready'    },
    {state:'shoot_ready'    , event:'shoot'       , act:'shoot'         ,resp:'none'         ,next:'stones_running' },
    {state:'stones_running' , event:'run'         , act:'move'          ,resp:'running'      ,next:'stones_running' },
    {state:'stones_running' , event:'run'         , act:'move'          ,resp:'not_running'  ,next:'stones_stopped' },
    {state:'stones_running' , event:'run'         , act:'move'          ,resp:'end_done'     ,next:'end_done'       },
    {state:'stones_stopped' , event:'run'         , act:'nextStone'     ,resp:'none'         ,next:'stone_idle'     },
    {state:'end_done'       , event:'run'         , act:'score'         ,resp:'next_end'     ,next:'end_idle'       },
    {state:'end_done'       , event:'run'         , act:'score'         ,resp:'game_over'    ,next:'game_idle'      },
  ]
    
  static state = 'stone_idle'    // Initial state    

  
  static execute(event, ...args) {
    
    // Find lines that match to the event and current state
    const hitLines = FSM.stateTable.filter( line => {
      if (line.event === event && line.state === FSM.state) return line
    })
    
    if (hitLines.length === 0) return // if no matches do nothing
    
    // Execute the action that relates to the event+status value
    // and store the result
    const act = hitLines[0].act
    const response = FSM.router[act](args)
    // Check the result
    const result = hitLines.find( line => {
      if (line.resp === response) return line
    })
    // and change the state value accordingly
    FSM.state = result.next
  }


  static router = {
    
    decCurl: () => {
      Sheet.currentStone.decCurl()
      return 'none'
    },
    
    incCurl: () => {
      Sheet.currentStone.incCurl()
      return 'none'
    },
    
    move: () => {
      Mover.moveStones()
      if (Sheet.stonesStopped()) {
        if (End.isFinished()) {
          return 'end_done'
        } else {
          return 'not_running' 
        }
      }
      return 'running'
    },
    
    newGame: () => {
      Game.initialize()
      End.initialize(Game.lastWinner)
      Sheet.prepareNextStone()
      
      return 'none'
    },
    
    newEnd: () => {
      End.initialize(Game.lastWinner)
      Sheet.prepareNextStone()
      
      return 'none'
    },

    nextStone: () => {
      Sheet.prepareNextStone()
      
      return 'none'
    },
    
    shoot: (args) => {
      const initialSpeed = args[0]
      Mover.shootStone(initialSpeed)
      return 'none'
    },
    
    score: () => {
      Game.findEndScore()
      if (Game.currentEnd > Game.endsPerGame) {
        return 'game_over'
      }
      return 'next_end'
    },
  }
}