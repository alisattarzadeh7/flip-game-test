import Card from "./Card";
import {cardsData} from "../cards";
import {useEffect, useState} from "react";

function Game() {

  const [cards,setCards] = useState(cardsData)


  const handleFlipCard = (id)=>{
    const cardIndex =  cards.findIndex(c=>c.id === id)
    setCards((prevState)=>{
      let temp = [...prevState]
      if(cardIndex !== -1){
        temp[cardIndex] = {...temp[cardIndex],isFlipped:true}
      }
      return temp
    })
  }

  useEffect(()=>{
    const flipedCardsCount = cards.filter(c=>c.isFlipped && cards.find(ca=>ca.name === c.name && !ca.isFlipped && c.id !== ca.id)).length
    if(flipedCardsCount >= 2){
      setCards(cardsData)
    }
  },[cards])


  return (
    <section className="memory-game">
      {
        cards.map(card=> <Card key={card.id} card={card} onClick={handleFlipCard} /> )
      }

    </section>
  );
}



export default Game;
