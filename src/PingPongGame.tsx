import { createEffect, createSignal, onCleanup } from 'solid-js'
import { Motion } from 'solid-motionone'
import './PingPongGame.css'

const PingPongGame = () => {
  const [tableWidth, setTableWidth] = createSignal(window.innerWidth * 0.8)
  const [tableHeight, setTableHeight] = createSignal(window.innerHeight * 0.8)
  const ballSize = 12
  const paddleWidth = 60
  const paddleHeight = 10
  const [player1, setPlayer1] = createSignal(tableWidth() / 2 - paddleWidth / 2)
  const [player2, setPlayer2] = createSignal(tableWidth() / 2 - paddleWidth / 2)
  const [ball, setBall] = createSignal([tableWidth() / 2 - ballSize / 2, tableHeight() / 2 - ballSize / 2])
  const [velocity, setVelocity] = createSignal({ x: 2, y: 2 })
  const [acceleration, setAcceleration] = createSignal(1.01) // Speed up the ball over time
  const [friction, setFriction] = createSignal(0.99) // Apply friction to slow the ball down
  const [score1, setScore1] = createSignal(0)
  const [score2, setScore2] = createSignal(0)

  const resizeHandler = () => {
    setTableWidth(window.innerWidth * 0.8)
    setTableHeight(window.innerHeight * 0.8)
    resetBall()
  }

  window.addEventListener('resize', resizeHandler)
  onCleanup(() => window.removeEventListener('resize', resizeHandler))

  document.onkeydown = checkKey
  function checkKey(evt: any) {
    evt = evt || window.event
    if (evt.target.type === 'input') {
      return
    }
    if (evt.keyCode === 37) { // left arrow
      player1() > 0 && setPlayer1(prev => prev - 10)
    }
    if (evt.keyCode === 39) { // right arrow
      player1() < tableWidth() - paddleWidth && setPlayer1(prev => prev + 10)
    }
  }

  const moveBall = () => {
    let [ballX, ballY] = ball()
    let { x: velX, y: velY } = velocity()

    ballX += velX
    ballY += velY

    if (ballX <= 0 || ballX >= tableWidth() - ballSize) {
      velX = -velX
      ballX = ballX <= 0 ? 0 : tableWidth() - ballSize
    }

    if (
      (ballY <= paddleHeight + 30 && ballX >= player2() && ballX <= player2() + paddleWidth) ||
      (ballY >= tableHeight() - ballSize - paddleHeight - 30 && ballX >= player1() && ballX <= player1() + paddleWidth)
    ) {
      velY = -velY

      // Add a bit of randomness to the bounce to make it more realistic
      velX += (Math.random() - 0.5) * 2
    }

    if (ballY <= 0) {
      setScore1(prev => prev + 1)
      resetBall()
      return
    } else if (ballY >= tableHeight() - ballSize) {
      setScore2(prev => prev + 1)
      resetBall()
      return
    }

    // Apply acceleration
    velX *= acceleration()
    velY *= acceleration()

    // Apply friction
    velX *= friction()
    velY *= friction()

    setBall([ballX, ballY])
    setVelocity({ x: velX, y: velY })
  }

  const movePlayer2 = () => {
    let [ballX] = ball()
    let paddleCenter = player2() + paddleWidth / 2

    if (ballX < paddleCenter - 10) {
      setPlayer2(prev => Math.max(prev - 2, 0))
    } else if (ballX > paddleCenter + 10) {
      setPlayer2(prev => Math.min(prev + 2, tableWidth() - paddleWidth))
    }
  }

  const resetBall = () => {
    setBall([tableWidth() / 2 - ballSize / 2, tableHeight() / 2 - ballSize / 2])
    setVelocity({ x: 2, y: -2 }) // Reset to a consistent starting velocity
  }

  createEffect(() => {
    const interval = setInterval(() => {
      moveBall()
      movePlayer2()
    }, 16)

    return () => clearInterval(interval)
  })

  return (
    <div class='table-wrapper'>
      <div class='table' style={{ width: `${tableWidth()}px`, height: `${tableHeight()}px` }}>
        <div class='scoreboard'>
          <div>Player 1: {score1()}</div>
          <div>Player 2: {score2()}</div>
        </div>
        <Motion.div
          class='ball'
          animate={{ left: `${ball()[0]}px`, top: `${ball()[1]}px` }}
          transition={{ duration: 0.1, easing: 'linear' }}
        />
        <Motion.div
          class='player player1'
          style={{ bottom: '30px' }}
          animate={{ left: `${player1()}px` }}
          transition={{ duration: 0.1, easing: 'ease-out' }}
        />
        <Motion.div
          class='player player2'
          style={{ top: '30px' }}
          animate={{ left: `${player2()}px` }}
          transition={{ duration: 0.1, easing: 'ease-out' }}
        />
      </div>
    </div>
  )
}

export default PingPongGame
