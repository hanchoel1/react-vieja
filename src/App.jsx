
import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'

const TURNS = {
  X: '❎',
  O: '⚪'
}


const winner_combos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]


export function WinnerModal ({ winner, resetGame }) {
  if (winner === null) return null

  const winnerText = winner === false ? 'Empate' : 'Ganó:'

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>

        <header className='win'>
          {winner && <Square>{winner}</Square>}
        </header>

        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  )
}




const Square = ({children,isSelected,updateBoard,index}) =>{
  
  
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleclick = ()=>{
    updateBoard(index)
  }

  return(
    <div onClick={handleclick} className={className}>{children}</div>
  )
}



function App() {

  const [board,setBoard] = useState(Array(9).fill(null))
  const [turn,setTurn] = useState(TURNS.X)
  const [winner,setWinner] = useState(null)


  const Checkwinner = (boardtocheck) =>{

    for (const combo of winner_combos){
      const [a,b,c] = combo
      if(boardtocheck[a] && boardtocheck[a] === boardtocheck[b] && boardtocheck[b] === boardtocheck[c]){
        return boardtocheck[a]
      }

    }
    return null
  }

  const checkendgame = (board)=>{
   return board.every((cell)=> cell !== null)
  }


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    
  }


  const updateBoard = (index)=>{
    //comprueba si ya hay algo en la casilla para no sobreescribir
    if(board[index] || winner) return
    
    const newboard = [...board]
    newboard[index] = turn
    setBoard(newboard)

    const newturn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newturn) 

    const newwinner = Checkwinner(newboard)
    if(newwinner){
      confetti()
      setWinner(newwinner)
    }
    else if(checkendgame(newboard)){
      setWinner(false)
    }

  }

  return (
    <main className='board'>
      <h1>VIEJA</h1>
      <button onClick={resetGame}>Resetear juego</button>
      <section className='game'>
        {
          board.map((_,index)=>{
            return (
              <Square key={index} updateBoard={updateBoard} index={index}>
                {board[index]}
              </Square>
            )

          })
        }
      </section>


      <section className='turn'>
        <Square isSelected = {turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected = {turn === TURNS.O}>{TURNS.O}</Square>  
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
    
  )
}

export default App
