import "./DiaryCard.css";

function DiaryCard({diary}) {
    return (
        <article className="diary_card">
            {/*날짜와 관람방식*/}
            <div className="diary_card_top">
                <span className="diary_card_date">
                    {diary.date}
                </span>

                <span className="diary_card_type">
                    {diary.viewingType}
                </span>
            </div>

            {/*경기정보*/}
            <div className="diary_card_match">
                <strong className="diary_card_team">
                    {diary.myTeam}
                </strong>

                <div className="diary_card_result">
                    <span className="diary_card_score">
                        {diary.myScore} : {diary.opponentScore}
                    </span>

                    <span className={`result_tag ${diary.result === "승리" ? "win" : "lose"}`}>
                        {diary.result}
                    </span>
                </div>

                <strong className="diary_card_team">
                    {diary.opponent}
                </strong>
            </div>

            {/*경기 일기*/}
            <div className="diary_card_bottom">
                {diary.emotion && (
                    <span className="emotion_tag">
                        {diary.emotion}
                    </span>
                )}

                <p className="diary_card_content">
                    {diary.content}
                </p>
            </div>
        </article>
    );
}

export default DiaryCard;