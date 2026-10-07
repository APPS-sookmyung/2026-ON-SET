import { Link } from "react-router-dom";
import { getTodayPreMatchCard } from "../utils/PreMatchCardStorage";

function HomePreMatchSection(){
    const todayCard = getTodayPreMatchCard();

    return(
        <section className="home-card">
            <div className="section-title">
                <span>*</span>
                <h2>오늘의 응원 카드</h2>
            </div>

            {todayCard ? (
                <div className="home_precard_preview">
                    <img
                        src={todayCard.image}
                        alt={`${todayCard.name} 카드`}
                    />

                    <div className="home_precard_info">
                        <span>오늘의 카드</span>
                        <h3>{todayCard.name}</h3>

                        <div className="home_precard_keywords">
                            {todayCard.keywords.map((keyword) => (
                                <span key={keyword}>#{keyword}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="precard_empty">
                    <p>경기 시작 전, 오늘의 응원 포인트를 한 장 뽑아보세요.</p>
                </div>
            )}

            <Link to="/cards/pre-match" className="secondary-button">
                {todayCard ? "오늘의 카드 보기" : "오늘의 카드 뽑기"}
            </Link>
        </section>
    );
}

export default HomePreMatchSection;