function SetFlowSection({setFlow = [], hasValidFinalScore, onChange}) {
    return (
        <div className="form_group setflow_group">
            <label>세트별 흐름</label>
            <p className="setflow_description">각 세트의 스코어와 내가 느낀 세트별 흐름을 기록해주세요.</p>
            {!hasValidFinalScore ? (
                <div className="setflow_empty">잘못된 스코어입니다. 최종 스코어를 입력해주세요</div>    
            ) : (
                <div className="setflow_list">
                    {setFlow.map((setData, index) => (
                        <div className="setflow_item" key={setData.set}>
                            <div className="setflow_header">
                                <span className="setflow_set">{setData.set}세트</span>
                                <div className="setflow_score">
                                    <input type="number" min="0" placeholder="0" value={setData.myScore} onChange={(e) => onChange(index, "myScore", e.target.value)}/>
                                    <span>:</span>
                                    <input type="number" min="0" placeholder="0" value={setData.opponentScore} onChange={(e)=> onChange(index, "opponentScore", e.target.value)}/>
                                </div>
                            </div>

                            <textarea rows="3" placeholder="이 세트에서의 흐름은 어땠나요?" value={setData.memo} onChange={(e) => onChange(index, "memo", e.target.value)}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SetFlowSection;