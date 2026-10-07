import "./DiaryCard.css";

function DiaryCard({diary}) {
    const {date, viewingType, myTeam, myScore, opponentScore, result, opponent, emotion, content,} = diary;

    const result_class_map = {승리: 'win', 패배: 'lose',};

    const result_class = result_class_map[result] ?? "";

    return (
        <article className="diary_card">
            {/*날짜와 관람방식*/}
            <div className="diary_card_top">
                <span className="diary_card_date">
                    {date}
                </span>

                <span className="diary_card_type">
                    {viewingType}
                </span>
            </div>

            {/*경기정보*/}
            <div className="diary_card_match">
                <strong className="diary_card_team">
                    {myTeam}
                </strong>

                <div className="diary_card_result">
                    <span className="diary_card_score">
                        {myScore} : {opponentScore}
                    </span>

                    <span className={`result_tag ${result_class}`}>
                        {result}
                    </span>
                </div>

                <strong className="diary_card_team">
                    {opponent}
                </strong>
            </div>

            {/*경기 일기*/}
            <div className="diary_card_bottom">
                {diary.emotion && (
                    <span className="emotion_tag">
                        {emotion}
                    </span>
                )}

                <p className="diary_card_content">
                    {content}
                </p>
            </div>
        </article>
    );
}

export default DiaryCard;