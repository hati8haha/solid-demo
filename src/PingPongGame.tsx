import { createEffect, createSignal } from 'solid-js'
import './PingPongGame.css'

const PingPongGame = () => {
  const tableWidth = 300, tableHeight = 600, ballSize = 12
  const [player1, setPlayer1] = createSignal(138)
  const [player2, setPlayer2] = createSignal(138)
  const [ball, setBall] = createSignal([tableWidth / 2 - ballSize / 2, tableHeight / 2 - ballSize / 2])

  document.onkeydown = checkKey;
  function checkKey(evt: any) {
    evt = evt || window.event;
    if (evt.target.type === 'input') {
      return;
    }
    if (evt.keyCode == '37') { // user inputs the "?" key [shift + /]
      player1() > 0 && setPlayer1(prev => prev - 10)

    }
    if (evt.keyCode == '39') { // user inputs the "?" key [shift + /]
      player1() < 276 && setPlayer1(prev => prev+10)
    }
  }

  // setInterval(() => {
    // if (prev)
    // setBall(prev => [prev[0] + 4, prev[1] + 4])
    
  // }, 2000)


  return (
    <div class='table-wrapper'>
      <div class='table'>
        <div class='ball' style={{top: `${ball()[1]}px`, left:`${ball()[0]}px` }} />
        <div class='player' style={{top: '30px', left: `${player2()}px` }}></div>
        <div class='player' style={{bottom: '30px', left: `${player1()}px`}}></div>
      </div>
    </div>
  )
}

export default PingPongGame