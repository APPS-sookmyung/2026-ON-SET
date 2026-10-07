import { TEAMS } from "../../constants/diaryOptions";

function MatchInfoSection({diary, onChange, onSelect}){
    return (
        <section className="diarywrite_section">
            <h2>경기 정보</h2>
            <div className="form_grid">
                {/*경기 날짜*/}
                <div className="form_group">
                    <label htmlFor="date">경기 날짜</label>
                    <input id="date" type="date" name="date" value={diary.date} onChange={onChange}/>
                </div>

                {/*응원팀*/}
                <div className="form_group">
                    <label htmlFor="myTeam">응원 팀</label>
                    <select id="myTeam" name="myTeam" value={diary.myTeam} onChange={onChange}>
                        <option value="">팀을 선택해주세요</option>
                        {TEAMS.map((team) => (
                            <option key={team} value={team}>{team}</option>
                        ))}
                    </select>
                </div>
                
                {/*상대팀*/}
                <div className="form_group">
                    <label htmlFor="opponent">상대 팀</label>
                    <select id="opponent" name="opponent" value={diary.opponent} onChange={onChange}>
                        <option value="">팀을 선택해주세요</option>
                        {TEAMS.map((team) => (
                            <option key={team} value={team}>{team}</option>
                        ))}
                    </select>
                </div>
                
                {/*관람 방식*/}
                <div className="form_group">
                    <label>관람 방식</label>
                    <div className="button_group">
                        <button type="button" className={diary.viewingType === "직관" ? "select_button active" : "select_button"} onClick={() => onSelect("viewingType", "직관")}>
                            직관
                        </button>

                        <button type="button" className={diary.viewingType === "집관" ? "select_button active" : "select_button"} onClick={() => onSelect("viewingType", "집관")}>
                            집관
                        </button>
                    </div>
                </div>
                
                {/*경기 결과*/}
                <div className="form_group">
                    <label>경기 결과</label>
                    <div className="button_group">
                        <button type="button" className={diary.result === "승리" ? "select_button active" : "select_button"} onClick={() => onSelect("result", "승리")}>
                            승리
                        </button>
                        <button type="button" className={diary.result === "패배" ? "select_button active" : "select_button"} onClick={() => onSelect("result", "패배")}>
                            패배
                        </button>
                    </div>
                </div>

                {/*최종 스코어*/}
                <div className="form_group">
                    <label>최종 스코어</label>
                    <div className="score_input">
                        <input type="number" name="myScore" min="0" max="3" placeholder="0" value={diary.myScore} onChange={onChange}/>
                        <span>:</span>
                        <input type="number" name="opponentScore" min="0" max="3" placeholder="0" value={diary.opponentScore} onChange={onChange}/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MatchInfoSection;