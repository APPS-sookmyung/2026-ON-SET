import "./PreMatchCard.css";

function PreMatchCard({ card }) {
    if (!card) {
        return null;
    }

    const {image, name, keywords = [], description} = card;

    return (
        <div className="card_item">
            <img
                src={image}
                alt={`${name} 카드`}
            />

            <div className="card_item_info">
                <h3>{name}</h3>

                <div className="card_keywords">
                    {keywords.map((keyword) => (
                        <span key={keyword}>#{keyword}</span>
                    ))}
                </div>

                <p>{description}</p>
            </div>
        </div>
    );
}

export default PreMatchCard;