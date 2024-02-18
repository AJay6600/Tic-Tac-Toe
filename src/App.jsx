import { useCallback, useState } from "react"
import GameBoard from "./component/GameBoard"
import Player from "./component/Player"
import Log from "./component/Log";
import { WINNING_COMBINATIONS } from "./Winning_combinations";
import GameOver from "./component/GameOver";
const INITIAL_GAME_BOARD =[
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

const PLAYERS ={
  X:'Player 1',
  O:'Player 2'
}

function deriveActivePlayer(gameTurn){
  let currentPlayer = 'X';
        if(gameTurn.length > 0 && gameTurn[0].player === 'X'){
          currentPlayer = 'O'; 
        }
        return currentPlayer;
}

function deriveGameBoard(gameTurn)
{
  let gameBoard = [...INITIAL_GAME_BOARD.map(arr => [...arr])]
  for(const turn of gameTurn){
     const  {square,player} = turn;
     const {row,col} = square;
     gameBoard[row][col] = player
  }
  return gameBoard;
}

function deriveWinner(gameBoard,players){
  let winner;
  for(const combination of WINNING_COMBINATIONS)
  {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol)
    {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
 
  const [players,setplayers] = useState(PLAYERS)
  const [gameTurn, setGameTurn] = useState([]); 

  let activePlayer = deriveActivePlayer(gameTurn);
  const gameBoard = deriveGameBoard(gameTurn);  
  const winner = deriveWinner(gameBoard,players) ;  
  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSelectSquare(rowIndex,colIndex){
    
    setGameTurn((prevTurn)=>{
        let currentPlayer = deriveActivePlayer(prevTurn)
        const updateTurn = [{square:{row:rowIndex,col:colIndex},player:currentPlayer},...prevTurn,];
        return updateTurn;
    })
  }
 
  function handleRestart()
  {
    setGameTurn([])
  }

  function handlePlayerNameChange(symbol, newName)
  {
    setplayers(prevPlayer =>{
      return {
        ...prevPlayer,
        [symbol]:newName
      }
    })
  }
  return (
   <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
         <Player 
            initialName={PLAYERS.X} 
            symbol="X" 
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
         />       
         <Player 
            initialName={PLAYERS.O} 
            symbol="O" 
            isActive={activePlayer === 'O'} 
            onChangeName={handlePlayerNameChange}
         />       
      </ol>
      {
      (winner || hasDraw ) && <GameOver winner={winner} onRestart={handleRestart}/>}
      <GameBoard onSelectSquare = {handleSelectSquare} board= {gameBoard}/>
       
    </div>
     <Log turns={gameTurn} />
   </main>
  )
}

export default App
