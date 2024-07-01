import { useEffect, useState } from 'react';
import './App.css';

import SingleCard from './components/SingleCard.js'

const cardImages = [
  { "src": "/img/card-boot.png", "matched": false },
  { "src": "/img/card-cactus.png", "matched": false },
  { "src": "/img/card-chaps.png", "matched": false },
  { "src": "/img/card-hare.png", "matched": false },
  { "src": "/img/card-hat.png", "matched": false },
  { "src": "/img/card-saddle.png", "matched": false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, "matched": true }
            } else {
              return card
            }
          })
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1500);
      }      
    }
  }, [choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  // start a new game on first load
  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App">
      <h1>Cowboy Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <div>
        <p>Turns: {turns}</p>
      </div>
    </div>
  );
}

export default App;
