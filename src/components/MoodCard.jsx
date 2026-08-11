function MoodCard(){
    return(
        <section className="home-card">
            <div className="section-title">
                <span>*</span>
                <h2>오늘의 경기 무드</h2>
            </div>

            <div className="mood-card">
                <span className="modd-card-label">MATCH DAY</span>
                <div className="mood-card-emoji">🔥</div>
                <h3>열정 MAX</h3>
                <p>
                    오늘도 마지막 한 점까지
                    <br/>
                    응원할 준비 완료!
                </p>
            </div>
            <button className="secondary-button">
                무드 카드 뽑기
            </button>
        </section>
    );
}

export default MoodCard;