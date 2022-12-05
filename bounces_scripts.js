
const list = document.querySelector('#cbo-games')
const restart = document.querySelector('#btn-restart')

list.onchange = () => {
  game = games.createGame(list.value)
  setup()
}

restart.onclick = () => {
  game = games.createGame(list.value)
}