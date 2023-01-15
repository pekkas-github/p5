const View = (function() {
    
  const txtEnds   = document.querySelector('#ends')
  const txtStones = document.querySelector('#stones')
  const txtYellow = document.querySelector('#yellow')
  const txtRed    = document.querySelector('#red')
  const txtCurl   = document.querySelector('#curl')
  const txtDir    = document.querySelector('#direction')
  const btnNewEnd = document.querySelector('#btn-new-end')

  
  function render() {
  
    drawBoardCircles()
    drawBoardLines()
    drawStones()
    drawEnds()
    drawScoreBoard()
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
  
    // Draw stones in play
    stroke(0)
    Sheet.stonesInPlay.forEach( stone => {
      if (stone.color === 'y') {
        fill(255, 255, 0) 
      } else {
        fill(255, 0, 0) 
      }
      circle(stone.position.x, stone.position.y, 2 * stone.radius)
    })
      
    // Draw remaining stones on canvas
    const d         = k*10
    const upRow     = 0.9 * Sheet.leftedge
    const storage   = Sheet.stoneStorage.length
    let xPos
    let yPos

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
  }

  
  function drawEnds() {
    
    const d         = k*10
    const bottomRow = 0.8 * Sheet.rightedge
    const ends      = Game.endsPerGame - Game.currentEnd
    let yPos
    let xPos
    
    // Draw remaining ends
    for (let i = 0; i < ends; i++) {
      fill(255)
      stroke(0)
      yPos = bottomRow
      xPos = i * (d+5)
      
      square(10 + xPos, yPos, d)
    }
  }
    
  function drawScoreBoard() {
    // Draw yellow and red score
    txtYellow.innerText = Game.totalScore.y
    txtRed.innerText = Game.totalScore.r
    
    const curl = Sheet.currentStone.curlFactor
    if (curl !== 0) {
      txtDir.innerText = (curl > 0) ? 'right' : 'left'
      txtCurl.innerText = Math.abs(curl)
    } else {
      txtDir.innerText = ''
      txtCurl.innerText = ''
    }
  
    // Set buttone text and visibility
    if (FSM.state === 'idle') {
      btnNewEnd.innerText = 'Start new end'
      btnNewEnd.disabled = false
      btnNewEnd.onclick = () => FSM.execute('new_end')
      return
    }
    
    if (FSM.state === 'end') {
      btnNewEnd.innerText = 'Start new game'
      btnNewEnd.disabled = false
      btnNewEnd.onclick = () => FSM.execute('new_game')
      return
    }
  
    btnNewEnd.innerText = 'Game is on'
    btnNewEnd.disabled = true
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