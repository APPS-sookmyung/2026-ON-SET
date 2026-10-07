import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import "./DiaryDetail.css";

const RESULT_CLASS_MAP = {
    승리: "win",
    패배: "lose",
};

const POSITION_LABELS = {
    세터: "S",
    아웃사이드히터: "OH",
    아포짓스파이커: "OP",
    미들블로커: "MB",
    리베로: "L",
};

const STARTING_POSITIONS  = [4,3,2,5,6,1];

const getPositionLabel = (position) => {
    return POSITION_LABELS[position] ?? position;
};

const getStoredDiaries = () => {
    try {
        const savedDiaries = localStorage.getItem("diaries");
        if (!savedDiaries){ return []; }
        const parsedDiaries = JSON.parse(savedDiaries);
        return Array.isArray(parsedDiaries) ? parsedDiaries : [];
    } catch {
        return [];
    }
};

function DiaryDetail(){
    //id가져오기
    const { id } = useParams();

    //localStorage 전체 일기 불러오기
    const diaries = getStoredDiaries();

    //현재 id와 같은 일기 찾기
    const diary = diaries.find(
        (diary) => String(diary.id) === id
    );

    if(!diary){
        return (
            <>
                <Header />
                <main className="diarydetail">
                    <p>해당 경기 기록을 찾을 수 없습니다.</p>
                    <Link to ="/archive">
                        아카이브로 돌아가기
                    </Link>
                </main>
            </>
        );
    }

    const {
        date, viewingType, myTeam, myScore, opponentScore, result, opponent, entry = [], startingLineup, substitutions = [], setFlow = [],
        content, emotion, player, moment, momentSet,
    } = diary;

    const playerMap = new Map(
        entry.map((player) => [player.id, player])
    );

    const getPlayer = (playerId) => {
        return playerMap.get(playerId);
    };

    const liberoPlayer = getPlayer(startingLineup?.libero);

    const hasStartingLineup = STARTING_POSITIONS.some(
        (position) => startingLineup?.[`position${position}`]
    );

    const resultClass = RESULT_CLASS_MAP[result] ?? "";

    return(
        <>
            <Header />
            <main className="diarydetail">
                {/*목록으로 돌아가기*/}
                <Link to="/archive" className="back_link">
                    아카이브로 돌아가기
                </Link>

                {/*경기 기본 정보*/}
                <section className = "detail_match">
                    <div className="detail_top">
                        <span className="detail_date">{date}</span>
                        
                        <span className="detail_type">{viewingType}</span>
                    </div>

                    <div className="detail_score">
                        <strong className="detail_team">{myTeam}</strong>
                        
                        <div className="score_center">
                            <span>
                                {myScore} : {opponentScore}
                            </span>

                            {result && (<p className={`detail_result ${resultClass}`}>{result}</p>)}
                        </div>

                        <strong className="detail_team">{opponent}</strong>
                    </div>
                </section>
                
                {/*경기 엔트리*/}
                {diary.entry?.length > 0 && (
                    <section className="detail_entry">
                        <h2>경기 엔트리</h2>

                        <div className="detail_entry_list">
                            {entry.map((player) => (
                                <div className="detail_entry_player" key={player.id}>
                                    <span className="detail_entry_number">{player.number}</span>
                                    
                                    <div className="detail_entry_info">
                                        <p>{player.name}</p>
                                        {player.position && (
                                            <span className="detail_entry_position">
                                                {getPositionLabel(player.position)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/*스타팅 라인업 */}
                {hasStartingLineup && (
                    <section className="detail_starting">
                        <h2>스타팅 라인업</h2>

                        <div className="detail_starting_list">
                            {STARTING_POSITIONS.map((position) => {
                                const startingPlayer = getPlayer(
                                    startingLineup?.[`position${position}`]
                                );

                                return(
                                    <div className="detail_starting_player" key={position}>
                                        <p>{startingPlayer?.name}</p>

                                        {startingPlayer?.position && (
                                            <span className="detail_starting_position">
                                                {getPositionLabel(startingPlayer.position)}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {liberoPlayer && (
                            <div className="detail_libero">
                                <p>{liberoPlayer.name}</p>
                                {liberoPlayer.position && (
                                    <span className="detail_starting_position">{getPositionLabel(liberoPlayer.position)}</span>
                                )}
                            </div>
                        )}
                    </section>
                )}

                {/*선수 교체*/}
                {substitutions.length > 0 && (
                    <section className="detail_substitutions">
                        <h2>선수 교체</h2>

                        <div className="detail_substitution_list">
                            {substitutions.map((substitution) => {
                                const outPlayer = getPlayer(substitution.outPlayer);
                                const inPlayer = getPlayer(substitution.inPlayer);

                                return(
                                    <div
                                        className="detail_substitution"
                                        key={substitution.id}
                                    >
                                        <span>
                                            {substitution.set}세트 -{" "}
                                            {substitution.myScore} :{" "}
                                            {substitution.opponentScore}
                                        </span>

                                        <p>
                                            {outPlayer?.name}
                                            {" → "}
                                            {inPlayer?.name}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/*세트별 흐름*/}
                {setFlow.length > 0 &&(
                    <section className="detail_setflow">
                        <h2>세트별 흐름</h2>

                        <div className="detail_setflow_list">
                            {setFlow.map((set) => (
                                <div className="detail_setflow_item" key={set.set}>
                                    <div className="detail_setflow_top">
                                        <span>{set.set}세트</span>

                                        <strong>
                                            {set.myScore} : {set.opponentScore}
                                        </strong>
                                    </div>

                                    {set.memo && (
                                        <p>{set.memo}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/*경기 일기와 기록*/}
                <section className="detail_grid">
                    <div className="detail_main">
                        <h1>경기 일기</h1>

                        <p className="detail_diary">
                            {content || "작성한 경기 일기가 없습니다."}
                        </p>
                    </div>

                    <aside className="detail_side">
                        <h2>오늘의 기록</h2>
                        <div className="detail_item">
                            <span>오늘의 감정</span>
                            <p>
                                {emotion || "기록 없음"}
                            </p>
                        </div>

                        <div className="detail_item">
                            <span>오늘의 선수</span>
                            <p>
                                {player || "기록 없음"}
                            </p>
                        </div>

                        <div className="detail_item">
                            <span>기억에 남는 장면</span>
                            {moment ? (
                                <p>
                                    {momentSet && `${momentSet}세트 - `}
                                    {moment}
                                </p>
                            ) :(
                                <p>기록 없음</p>
                            )}
                        </div>
                    </aside>
                </section>
            </main>
        </>
    );
}

export default DiaryDetail;