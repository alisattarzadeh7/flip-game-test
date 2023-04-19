import Card from "./Card";
import {cardsData} from "../cards";
import {useEffect, useState} from "react";

function Game() {
    const [cards, setCards] = useState(cardsData)
    const [isScreenLocked, setIsScreenLocked] = useState(false)

    const handleFlipCard = (id) => {
        if (!isScreenLocked) {
            const cardIndex = cards.findIndex(c => c.id === id)
            setCards((prevState) => {
                let temp = [...prevState]
                if (cardIndex !== -1) {
                    temp[cardIndex] = {...temp[cardIndex], isFlipped: true}
                }
                return temp
            })
        }
    }

    useEffect(() => {
        const flipedCardsCount = cards.filter(c => c.isFlipped && cards.find(ca => ca.name === c.name && !ca.isFlipped && c.id !== ca.id)).length
        if (flipedCardsCount >= 2) {
            setTimeout(()=>{
                setCards(cardsData)
            },900)
            setIsScreenLocked(true)
            setTimeout(() => {
                setIsScreenLocked(false)
            }, 1500)
        }
    }, [cards])


    return (
        <section className="memory-game" style={{position:'relative'}}>
            {
                cards.map(card => <Card key={card.id} card={card} onClick={() => handleFlipCard(card.id)}/>)
            }
            {
                isScreenLocked &&
                <div style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}}/>
            }
        </section>
    );
}


export default Game;
