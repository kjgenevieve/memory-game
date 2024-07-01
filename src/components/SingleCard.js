import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    }
    
    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className={["cardImg", "front"].join(' ')} src={card.src} alt="card front" />
                <img 
                    className={["cardImg", "back"].join(' ')} 
                    src="/img/cover.png" 
                    onClick={handleClick} 
                    alt="card back" 
                />
            </div>
        </div>    
    );
}
