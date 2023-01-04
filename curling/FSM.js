class FSM {
  
  constructor(stateTransitionTable) {
    
    this.state = 'wait_curl'    // Initial state  
    this.stateTransitionTable = stateTransitionTable
  
  }
  
  execute(event, ...args) {
    
    // Find lines that match to the event and current state
    const hits = this.stateTransitionTable.filter( line => {
      if (line[0] === event && line[1] === this.state) return line
    })
    
    if (hits.length === 0) return // if no matches do nothing
    
    // Execute the action that relates to the event+status value
    // and store the result
    const response = hits[0][2](args)
    
    // Check the result
    const result = hits.find( line => {
      if (line[3] === response) return line
    })
    
    // and change the state value accordingly
    this.state = result[4]
  }
}