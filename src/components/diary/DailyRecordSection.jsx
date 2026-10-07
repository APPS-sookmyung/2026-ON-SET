import { EMOTIONS } from "../../constants/diaryOptions";

function DailyRecordSection({diary, onChange, onSelect}) {
    return (
        <section className="diarywrite_section">
            <h2>오늘의 기록</h2>

            {/* 오늘의 감정 */}
            <div className="form_group">
                <label>오늘의 감정</label>
                <div className="emotion_group">
                    {EMOTIONS.map((emotion) => (
                        <button key={emotion} type="button" className={diary.emotion === emotion ? "emotion_button active" : "emotion_button"} onClick={() => onSelect("emotion", emotion)}>{emotion}</button>
                    ))}
                </div>
            </div>

            {/* 오늘의 선수 */}
            <div className="form_group">
                <label htmlFor="player">오늘의 선수</label>
                <input id="player" type="text" name="player" placeholder="가장 기억에 남는 선수를 적어주세요." value={diary.player} onChange={onChange}/>
            </div>

            {/* 기억에 남는 장면 */}
            <div className="form_group">
                <label htmlFor="moment">기억에 남는 장면</label>
                <div className="moment_input">
                    <select className="moment_set" name="momentSet" value={diary.momentSet} onChange={onChange}>
                        <option value="">세트 선택</option>
                        <option value="1">1세트</option>
                        <option value="2">2세트</option>
                        <option value="3">3세트</option>
                        <option value="4">4세트</option>
                        <option value="5">5세트</option>
                    </select>

                    <input id="moment" type="text" name="moment" placeholder="오늘 경기에서 가장 기억에 남는 순간은?" value={diary.moment} onChange={onChange}/>
                </div>
            </div>

            {/* 경기 일기 */}
            <div className="form_group">
                <label htmlFor="content">경기 일기</label>
                <textarea id="content" name="content" rows="7" placeholder="오늘 경기에 대한 이야기를 자유롭게 남겨보세요" value={diary.content} onChange={onChange}/>
            </div>
        </section>
    );
}

export default DailyRecordSection;