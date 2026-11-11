import Header from "../components/Header";
import { getDiaryStats } from "../utils/diaryStats";
import { getStoredDiaries } from "../utils/diaryStorage";
import "./Stats.css";

function Stats() {
    //저장된 경기 일기 가져오기
    const diaries = getStoredDiaries();

    //전체 경기 기록 수
    const stats = getDiaryStats(diaries);

    return (
        <>
            <Header/>

            <main className="stats">
                <div className="stats_header">
                    <span className="stats_eyebrow">
                        MY VOLLEYBALL RECORD
                    </span>

                    <h1>나의 관람 기록</h1>
                    <p>기록해온 경기 속에서 나의 응원 기록을 돌아보세요.</p>
                </div>

                <section className="stats_summary">
                    <h2>전체 경기 기록</h2>
                    <div className="stats_summary_grid">
                        <div className="stats_summary_item">
                            <strong>{stats.totalGames}</strong>
                            <span>전체 기록</span>
                        </div>

                        <div className="stats_summary_item">
                            <strong>{stats.liveGames}</strong>
                            <span>직관</span>
                        </div>

                        <div className="stats_summary_item">
                            <strong>{stats.homeGames}</strong>
                            <span>집관</span>
                        </div>

                        <div className="stats_summary_item">
                            <strong>{stats.winRate}%</strong>
                            <span>승률</span>
                        </div>
                    </div>
                </section>

                {/* 세부 통계 */}
                <section className="stats_details">
                    {/*관람 방식 */}
                    <div className="stats_detail">
                        <div className="stats_detail_header">
                            <span>01</span>
                            <h2>관람 방식 분석</h2>
                        </div>

                        <div className="stats_viewing_bar">
                            <div className="stats_live_bar" style={{width: `${stats.liveRate}%`}}></div>
                            <div className="stats_home_bar" style={{width: `${stats.homeRate}%`}}></div>
                        </div>

                        <div className="stats_viewing_labels">
                            <span>직관 {stats.liveGames}경기</span>
                            <span>집관 {stats.homeGames}경기</span>
                        </div>

                        <div className="stats_win_rates">
                            <div>
                                <span>직관 승률</span>
                                <strong>
                                    {stats.liveWins + stats.liveLoses > 0 ? `${stats.liveWinRate}%` : "-"}
                                </strong>
                            </div>

                            <div>
                                <span>집관 승률</span>
                                <strong>
                                    {stats.homeWins + stats.homeLoses > 0 ? `${stats.homeWinRate}%` : "-"}
                                </strong>
                            </div>
                        </div>
                    </div>

                    {/*경기 결과 분석*/}
                    <div className="stats_detail">
                        <div className="stats_detail_header">
                            <span>02</span>
                            <h2>경기 결과 분석</h2>
                        </div>

                        <div className="stats_result_item">
                            <div className="stats_result_label">
                                <span>승리</span>
                                <strong>{stats.winGames}경기</strong>
                            </div>

                            <div className="stats_result_bar">
                                <div className="stats_result_win" style={{width: `${stats.winRate}%`}}></div>
                            </div>
                        </div>

                        <div className="stats_result_item">
                            <div className="stats_result_label">
                                <span>패배</span>
                                <strong>{stats.loseGames}경기</strong>
                            </div>

                            <div className="stats_result_bar">
                                <div className="stats_result_lose" style={{ width: `${stats.resultGames > 0 ? 100 - stats.winRate : 0}%`}}></div>
                            </div>
                        </div>
                        <p className="stats_result_note">승패가 기록된 {stats.resultGames}경기 기준</p>
                    </div>
                </section>


                {/* 감정 및 선수 통계 */}
                <section className="stats_details stats_extra">

                    {/* 감정 통계 */}
                    <div className="stats_detail">
                        <div className="stats_detail_header">
                            <span>03</span>
                            <h2>자주 기록한 감정</h2>
                        </div>

                        {stats.emotionStats.length > 0 ? (
                            <div className="stats_emotion_list">
                                {stats.emotionStats.map((emotion) => (
                                    <div className="stats_emotion_item" key={emotion.name}>
                                        <div className="stats_emotion_label">
                                            <span>{emotion.name}</span>
                                            <strong>{emotion.count}회</strong>
                                        </div>

                                        <div className="stats_emotion_bar">
                                            <div
                                                className="stats_emotion_fill"
                                                style={{ width: `${(emotion.count / stats.emotionStats[0].count) * 100}%`}}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="stats_empty">아직 기록된 감정이 없어요.</p>
                        )}
                    </div>

                    {/* 오늘의 선수 TOP 3 */}
                    <div className="stats_detail">
                        <div className="stats_detail_header">
                            <span>04</span>
                            <h2>오늘의 선수 TOP 3</h2>
                        </div>

                        {stats.topPlayers.length > 0 ? (
                            <div className="stats_player_list">
                                {stats.topPlayers.map((player, index) => (
                                    <div className="stats_player_item" key={player.name}>
                                        <span className="stats_player_rank">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <strong>{player.name}</strong>

                                        <span className="stats_player_count">
                                            {player.count}회
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="stats_empty">아직 기록된 오늘의 선수가 없어요.</p>
                        )}
                    </div>

                </section>


                {/* 세트 수별 경기 결과 */}
                <section className="stats_set_section">
                    <div className="stats_detail_header">
                        <span>05</span>
                        <h2>세트 수별 경기 결과</h2>
                    </div>

                    <p className="stats_set_description">
                        경기가 몇 세트까지 진행되었는지, 세트 수별 승패를 확인해 보세요.
                    </p>

                    <div className="stats_set_list">
                        {stats.setStats.map((item) => {
                            const total = item.wins + item.losses;

                            const winRate = total > 0
                                ? (item.wins / total) * 100
                                : 0;

                            const loseRate = total > 0
                                ? (item.losses / total) * 100
                                : 0;

                            return (
                                <div className="stats_set_item" key={item.set}>
                                    <div className="stats_set_heading">
                                        <h3>{item.set}세트 경기</h3>
                                        <span>총 {total}경기</span>
                                    </div>

                                    <div className="stats_set_bar">
                                        <div
                                            className="stats_set_win"
                                            style={{ width: `${winRate}%` }}
                                        ></div>
                                        <div
                                            className="stats_set_lose"
                                            style={{ width: `${loseRate}%` }}
                                        ></div>
                                    </div>

                                    <div className="stats_set_labels">
                                        <span>승리 {item.wins}경기</span>
                                        <span>패배 {item.losses}경기</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <p className="stats_result_note">
                        최종 스코어가 기록된 {stats.scoredGameCount}경기 기준
                    </p>
                </section>


            </main>
        </>
    )
}

export default Stats;