import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./DiaryWrite.css";

//팀선택
const teams = [
    "현대캐피탈",
    "대한항공",
    "한국전력",
    "우리카드",
    "KB손해보험",
    "OK저축은행",
    "삼성화재"
];

//감정선택목록
const emotions=[
    "짜릿해요",
    "행복해요",
    "감동",
    "긴장",
    "아쉬워요",
    "슬퍼요",
    "해체해라",
];

function DiaryWrite(){
    //경기 일기 입력값
    const [diary, setDiary] = useState({
        date:"",
        myTeam:"",
        opponent: "",
        viewingType: "",
        result: "",
        myScore: "",
        opponentScore:"",
        emotion: "",
        player: "",
        moment: "",
        content:"",
    });

    const navigate = useNavigate();

    //input, select, textarea 변경
    const handleChange=(e) => {
        const { name, value } = e.target;

        setDiary({
            ...diary,
            [name]: value,
        });
    };

    //경기 일기 저장 (console)
    const handleSubmit = (e) => {
        e.preventDefault();
        
        //기존 저장된 경기 일기 불러오기
        const savedDiaries = JSON.parse(localStorage.getItem("diaries")) || [];
        
        //새로 저장한 경기 일기
        const newDiary = {
            ...diary,
            id: Date.now(),
            createdAt: new Date().toISOString(),
        };

        //기존 기록에 새로운 기록 추가
        const updatedDiaries = [
            ...savedDiaries,
            newDiary,
        ];

        //localStroage
        localStorage.setItem("diaries", JSON.stringify(updatedDiaries));

        //저장 후 아카이브 페이지로 이동
        navigate("/archive");
    };

    return (
        <>
            <Header/>

            <main className="diarywrite">
                {/*제목*/}
                <div className="diarywrite_header">
                    <h1>경기 일기 작성</h1>
                    <p>오늘 본 경기의 기억과 감정을 남겨보세요.</p>
                </div>

                {/*경기 일기 입력*/}
                <form className="diarywrite_form" onSubmit={handleSubmit}>
                    {/*1.경기 기본 정보 */}
                    <section className="diarywrite_section">
                        <h2>경기 정보</h2>

                        <div className="form_grid">
                            <div className="form_group">
                                <label htmlFor="date">
                                    경기 날짜
                                </label>

                                <input id="date" type="date" name="date" value={diary.date} onChange={handleChange}/>
                            </div>

                            {/*응원팀*/}
                            <div className="form_group">
                                <label htmlFor="myTeam">
                                    응원 팀
                                </label>

                                <select id="myTeam" name="myTeam" value={diary.myTeam} onChange={handleChange}>
                                    <option value="">
                                        팀을 선택해주세요
                                    </option>

                                    {teams.map((team) => (
                                        <option key={team} value={team}>
                                            {team}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/*상대팀*/}
                            <div className="form_group">
                                <label htmlFor="opponent">
                                    상대 팀
                                </label>

                                <select id="opponent" name="opponent" value={diary.opponent} onChange={handleChange}>
                                    <option value="">
                                        팀을 선택해주세요
                                    </option>
                                    {teams.map((team) => (
                                        <option key={team} value={team}>
                                            {team}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/*관람방식*/}
                            <div className="form_group">
                                <label>관람 방식</label>

                                <div className="button_group">
                                    <button 
                                    type="button"
                                    className={
                                        diary.viewingType === "직관" ? "select_button active" : "select_button"
                                    }
                                    onClick={() =>
                                        setDiary({
                                            ...diary,
                                            viewingType: "직관",
                                        })
                                    }>직관</button>

                                    <button
                                        type="button"
                                        className={
                                            diary.viewingType === "집관" ? "select_button active" : "select_button"
                                        }
                                        onClick={()=>
                                            setDiary({
                                                ...diary,
                                                viewingType: "집관",
                                            })
                                        }
                                    >집관</button>
                                </div>
                            </div>

                            {/*경기결과*/}
                            <div className="form_group">
                                <label>경기 결과</label>

                                <div className="button_group">
                                    <button
                                        type="button"
                                        className={
                                            diary.result==="승리" ? "select_button active" : "select_button"
                                        }
                                        onClick = {() =>
                                            setDiary({
                                                ...diary,
                                                result: "승리",
                                            })
                                        }
                                    >승리</button>

                                    <button
                                        type="button"
                                        className={
                                            diary.result==="패배" ? "select_button active" : "select_button"
                                        }
                                        onClick = {() =>
                                            setDiary({
                                                ...diary,
                                                result: "패배",
                                            })
                                        }
                                    >패배</button>
                                </div>
                            </div>

                            {/*최종스코어*/}
                            <div className="form_group">
                                <label>최종 스코어</label>

                                <div className="score_input">
                                    <input
                                        type="number"
                                        name="myScore"
                                        min="0"
                                        max="3"
                                        placeholder="0"
                                        value={diary.myScore}
                                        onChange={handleChange}
                                    />

                                    <span>:</span>

                                    <input
                                        type="number"
                                        name="opponentScore"
                                        min="0"
                                        max="3"
                                        palceholder="0"
                                        value={diary.opponentScore}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/*오늘의 기록*/}
                    <section className="diarywrite_section">
                        <h2>오늘의 기록</h2>

                        {/*감정 선택*/}
                        <div className="form_group">
                            <label>오늘의 감정</label>

                            <div className="emotion_group">
                                {emotions.map((emotion) => (
                                    <button
                                        key={emotion}
                                        type="button"
                                        className={
                                            diary.emotion === emotion ? "emotion_button active" : "emotion_button"
                                        }
                                        onClick={() =>
                                            setDiary({
                                                ...diary,
                                                emotion: emotion,
                                            })
                                        }
                                    >{emotion}</button>
                                ))}
                            </div>
                        </div>

                        {/*오늘의 선수*/}
                        <div className="form_group">
                            <label htmlFor="player">
                                오늘의 선수
                            </label>

                            <input
                                id="player"
                                type="text"
                                name="player"
                                placeholder="가장 기억에 남는 선수를 적어주세요."
                                value={diary.player}
                                onChange={handleChange}
                            />
                        </div>

                        {/*기억에 남는 장면*/}
                        <div className="form_group">
                            <label htmlFor="moment">
                                기억에 남는 장면
                            </label>

                            <input
                                id = "moment"
                                type = "text"
                                name = "moment"
                                palceholder="오늘 경기에서 가장 기억에 남는 순간은?"
                                value={diary.moment}
                                onChange={handleChange}
                            />
                        </div>

                        {/*경기 일기*/}
                        <div className="form_group">
                            <label htmlFor = "content">
                                경기 일기
                            </label>

                            <textarea
                                id="content"
                                name="content"
                                rows="7"
                                placeholder="오늘 경기에 대한 이야기를 자유롭게 남겨보세요"
                                value={diary.content}
                                onChange={handleChange}
                            />
                        </div>
                    </section>

                    {/*저장버튼*/}
                    <div className="save_area">
                        <button type="submit" className="save_button">
                            기록 저장하기
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}

export default DiaryWrite;