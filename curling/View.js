const View = (function() {
    
  const txtEnds   = document.querySelector('#ends')
  const txtStones = document.querySelector('#stones')
  const txtYellow = document.querySelector('#yellow')
  const txtRed    = document.querySelector('#red')
  const txtCurl   = document.querySelector('#curl')
  const btnNewEnd = document.querySelector('#btn-new-end')

  
  function render() {
  
    drawBoardCircles()
    drawBoardLines()
    drawStones()
    updateScoreBoard()
  }
  
  function drawBoardCircles() {

    fill(255,0,0) // red
    noStroke()
    circle(Sheet.teeline, Sheet.centerline, k*120)
    fill(255) // white
    circle(Sheet.teeline, Sheet.centerline, k*80)
    fill(0,0,255) // blue
    circle(Sheet.teeline, Sheet.centerline, k*40)
    fill(255) // white
    circle(Sheet.teeline, Sheet.centerline, k*20)
  
  }

  function drawBoardLines() {
    
    stroke(0)
    line(0, Sheet.centerline, Sheet.width, Sheet.centerline)
    line(Sheet.hogline, Sheet.leftedge, Sheet.hogline, Sheet.rightedge)
    line(Sheet.teeline, Sheet.leftedge, Sheet.teeline, Sheet.rightedge)
    line(Sheet.backline, Sheet.leftedge, Sheet.backline, Sheet.rightedge)
  
  }

  function drawStones() {  
  
    stroke(0)
    Sheet.stonesInPlay.forEach( stone => {
      if (stone.color === 'y') {
        fill(255, 255, 0) 
      } else {
        fill(255, 0, 0) 
      }
      circle(stone.position.x, stone.position.y, 2 * stone.radius)
    })
  }

  
  function updateScoreBoard() {
    
    // Create ends line -2---
    let ends            = ''
    for (let i = 0; i < Game.endsPerGame - Game.currentEnd; i++) {
      ends += '- '
    }
    ends += 'O'
  
    // Create stones line --3---
    let stones = ''
    for (let i = 1; i < Math.round((Sheet.stoneStorage.length+1)/2); i++) {
      stones += '- '
    }
    stones += (Sheet.stoneStorage.length % 2 === 0) ? 'X' : 'O'
  
    txtEnds.innerText = ends
    txtStones.innerText = stones
    txtYellow.innerText = Game.totalScore.y
    txtRed.innerText = Game.totalScore.r
  
    // Draw remaining stones on canvas
    const d       = k*10
    const upRow   = 0.9 * Sheet.leftedge
    const storage = Sheet.stoneStorage.length
    let yPos
    let xPos
    for (let i = 0; i < storage; i++) {
      const stone = Sheet.stoneStorage[i]

      if (stone.color === 'y') {
          fill(255, 255, 0)
      } else {
        fill(255, 0, 0)
      }
      
      if (stone.color === Game.lastWinner) {
        yPos = upRow
      } else {
        yPos = upRow + (d+5)
      }
      
      xPos = Math.floor(i / 2) * (d+5)
      
      circle(10 + xPos, yPos, d)
    }
    
    if (FSM.state === 'idle') {
      btnNewEnd.innerText = 'New End'
      btnNewEnd.disabled = false
      btnNewEnd.onclick = () => FSM.execute('new_end')
      return
    }
    
    if (FSM.state === 'end') {
      btnNewEnd.innerText = 'New Game'
      btnNewEnd.disabled = false
      btnNewEnd.onclick = () => FSM.execute('new_game')
      return
    }
  
    btnNewEnd.innerText = 'Game on'
    btnNewEnd.disabled = true
    txtCurl.innerText = Sheet.currentStone.curlFactor
  }  
  
  
  return {
    render: render
  }

}())

// Global event listeners


function keyPressed() {
  
  if (keyCode === UP_ARROW)   FSM.execute('inc_curl') 
  if (keyCode === DOWN_ARROW) FSM.execute('dec_curl') 
  if (keyCode === 32) {
    const speedMag     = mouseX / Sheet.width
    // Translate doesn't affect mouseY values
    const initialSpeed = new p5.Vector(mouseX, mouseY + Sheet.leftedge)
    
    initialSpeed.normalize()
    initialSpeed.mult(5 * speedMag)
    
    FSM.execute('shoot', initialSpeed)
  }
  
}