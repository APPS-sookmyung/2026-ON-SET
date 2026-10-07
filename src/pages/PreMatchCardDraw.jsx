import { useState } from "react";
import PreMatchCard from "../components/PreMatchCard";
import { preMatchCards } from "../data/cards";
import { getTodayPreMatchCard, saveTodayPreMatchCard } from "../utils/PreMatchCardStorage";
import Header from "../components/Header";
import "./PreMatchCardDraw.css";

function PreMatchCardDraw(){
    const [selectedCard, setSelectedCard] = useState(() => getTodayPreMatchCard());

    const drawPreMatchCard = () => {
        const randomIndex = Math.floor(Math.random() * preMatchCards.length);
        const drawnCard = preMatchCards[randomIndex];

        setSelectedCard(drawnCard);
        saveTodayPreMatchCard(drawnCard.id);
    };

    return (
        <>
            <Header/>

            <main className="precard_page">
                <section className="precard_content">
                    <div className="precard_header">
                        <span className="precard_label">
                            PRE-MATCH CARD
                        </span>

                        <h1>오늘의 응원 카드</h1>

                        <p>
                            경기 시작 전,
                            <br />
                            오늘의 응원 포인트를 한 장 뽑아보세요.
                        </p>
                    </div>

                    {selectedCard ? (
                        <div className="precard_result">
                            <p className="precard_result_label">
                                TODAY'S CARD
                            </p>

                            <h2>오늘 당신에게 도착한 카드</h2>

                            <PreMatchCard card={selectedCard} />

                            <div className="precard_message">
                                <span>오늘의 응원 포인트</span>
                                <p>
                                    이 카드와 함께 오늘의 경기를 지켜보세요.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="precard_back">
                                <span>ON SET</span>
                            </div>

                            <button
                                className="precard_draw_button"
                                onClick={drawPreMatchCard}
                            >
                                카드 한 장 뽑기
                            </button>
                        </>
                    )}
                </section>
            </main>
        </>
        
    );
}

export default PreMatchCardDraw;