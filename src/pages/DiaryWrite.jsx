import { useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import MatchInfoSection from "../components/diary/MatchInfoSection";
import EntrySection from "../components/diary/EntrySection";
import StartingLineupSection from "../components/diary/StartingLineupSection";
import SubstitutionSection from "../components/diary/SubstitutionsSection";
import SetFlowSection from "../components/diary/SetFlowSection";
import DailyRecordSection from "../components/diary/DailyRecordSection";
import { createEmptyDiary, createEmptyEntryPlayer, createEmptySubstitutioon } from "../constants/diaryInitialState";
import { getStoredDiaries, upsertDiary } from "../utils/diaryStorage";
import { isValidFinalScore, createSetFlowFromFinalScore, getResultFromFinalScore } from "../utils/diaryData";
import "./DiaryWrite.css";

function DiaryWrite(){
    const { id } = useParams();
    const isEditMode = Boolean(id);
    //경기 일기 입력값
    const [diary, setDiary] = useState(() => {
        const emptyDiary = createEmptyDiary();

        if (!isEditMode) {
            return emptyDiary;
        }

        const savedDiaries = getStoredDiaries();
        
        const savedDiary = savedDiaries.find(
            (diary) => String(diary.id) === id
        );

        if (!savedDiary){
            return emptyDiary;
        }

        return {
            ...emptyDiary,
            ...savedDiary,

            startingLineup: {
                ...emptyDiary.startingLineup,
                ...(savedDiary.startingLineup || {}),
            },

            entry: savedDiary.entry || [],
            substitutions: savedDiary.substitutions || [],
            setFlow: savedDiary.setFlow || [],
            momentSet: savedDiary.momentSet || "",
        };
    });

    const navigate = useNavigate();

    const hasValidFinalScore = isValidFinalScore(diary.myScore, diary.opponentScore);

    const updateDiaryField = (name, value) => {
        setDiary((prev) => {
            const updatedDiary = {...prev, [name]: value};
            if (name === "myScore" || name === "opponentScore") {
                updatedDiary.setFlow = createSetFlowFromFinalScore(
                    prev.setFlow, updatedDiary.myScore, updatedDiary.opponentScore
                );

                const resultFromScore = getResultFromFinalScore(updatedDiary.myScore, updatedDiary.opponentScore);
                if(resultFromScore){updatedDiary.result = resultFromScore;}
            }

            return updatedDiary;
        });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        updateDiaryField(name, value);
    }

    //엔트리 입력
    const addEntryPlayer = () => {
        setDiary((prev) => ({
            ...prev,
            entry: [
               ...prev.entry, createEmptyEntryPlayer()
            ],
        }));
    };

    const updateDiaryArrayItem = (arrayName, index, field, value) => {
        setDiary((prev) => ({
            ...prev, [arrayName]: prev[arrayName].map((item, i) => i === index ? {...item, [field]: value} : item)
        }));
    };

    //엔트리 변경
    const handleEntryChange = (index, field, value) => {
       updateDiaryArrayItem("entry", index, field, value);
    };

    const removeEntryPlayer = (index) => {
        setDiary((prev) => {
            const deletedPlayerId = prev.entry[index]?.id;

            if (!deletedPlayerId){
                return prev;
            }

            return {
                ...prev,

                entry: prev.entry.filter(
                    (_,i)=> i !== index
                ),

                startingLineup: Object.fromEntries(
                    Object.entries(prev.startingLineup).map(
                        ([position, playerId]) => [
                            position,
                            playerId === deletedPlayerId ? "" : playerId,
                        ]
                    )
                ),

                substitutions: prev.substitutions.filter(
                    (substitution) =>
                        substitution.outPlayer !== deletedPlayerId && substitution.inPlayer !== deletedPlayerId
                ),
            };

        });
    };

    //스타팅라인업
    const handleStartingLineupChange = (position, playerId) => {
        setDiary((prev) => ({
            ...prev,
            startingLineup: {
                ...prev.startingLineup,
                [position]: playerId,
            },
        }));
    };

    //선수 교체
    const addSubstitution = () => {
        setDiary((prev) => ({
            ...prev,
            substitutions: [
                ...prev.substitutions, createEmptySubstitutioon(),
            ],
        }));
    };

    //선수 교체 기록 변경
    const handleSubstitutionChange = (index, field, value) => {
        updateDiaryArrayItem("substitutions", index, field, value);
    };

    //선수 교체 삭제
    const removeSubstitution = (index) => {
        setDiary((prev) => ({
            ...prev,
            substitutions: prev.substitutions.filter(
                (_,i)=> i !== index
            ),
        }));
    };

    const handleSetFlowChange = (index, field, value) => {
        updateDiaryArrayItem("setFlow", index, field, value);
    };

    //경기 일기 저장 (console)
    const handleSubmit = (e) => {
        e.preventDefault();
        const hasFinalScoreInput = diary.myScore !== "" || diary.opponentScore !== "";
        if (hasFinalScoreInput && !hasValidFinalScore){
            alert("최종 스코어를 올바르게 입력해주세요.");
            return;
        }

        if(hasValidFinalScore){
            const resultFromScore = getResultFromFinalScore(diary.myScore, diary.opponentScore);
            if(diary.result && diary.result !== resultFromScore){
                alert("경기 결과와 최종 스코어가 일치하지 않습니다.");
                return;
            }
        }

        upsertDiary(diary, isEditMode ? id : null);

        //저장 후 아카이브 페이지로 이동
        navigate("/archive");
    };

    return (
        <>
            <Header/>

            <main className="diarywrite">
                {/*제목*/}
                <div className="diarywrite_header">
                    <h1>{isEditMode ? "경기 일기 수정" : "경기 일기 작성"}</h1>
                    <p>
                        {isEditMode ? "기록한 경기의 내용을 수정해보세요." : "오늘 본 경기의 기억과 감정을 남겨보세요."}
                    </p>
                </div>

                {/*경기 일기 입력*/}
                <form className="diarywrite_form" onSubmit={handleSubmit}>
                    <MatchInfoSection diary={diary} onChange={handleChange} onSelect={updateDiaryField}/>
                    
                    <section className="diarywrite_section">
                        <h2>경기 상세 기록</h2>
                        <EntrySection entry={diary.entry} onAddPlayer={addEntryPlayer} onChangePlayer={handleEntryChange} onRemovePlayer={removeEntryPlayer}/>
                        <StartingLineupSection entry={diary.entry} startingLineup={diary.startingLineup} onChange={handleStartingLineupChange}/>
                        <SubstitutionSection entry={diary.entry} substitutions={diary.substitutions} onAdd={addSubstitution} onChange={handleSubstitutionChange} onRemove={removeSubstitution}/>
                        <SetFlowSection setFlow={diary.setFlow} hasValidFinalScore={hasValidFinalScore} onChange={handleSetFlowChange}/>
                    </section>

                    <DailyRecordSection diary={diary} onChange={handleChange} onSelect={updateDiaryField}/>             

                    {/*저장버튼*/}
                    <div className="save_area">
                        <button type="submit" className="save_button">
                            {isEditMode ? "수정 완료하기" : "기록 저장하기"}
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}

export default DiaryWrite;