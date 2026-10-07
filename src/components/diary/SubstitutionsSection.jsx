function SubstitutionSection({entry = [], substitutions = [], onAdd, onChange, onRemove}) {
    return (
        <div className="form_group substitution_group">
            <label>선수 교체</label>
            <p className="substitution_description">선수 교체를 기록해주세요.</p>
            <div className="substitution_list">
                {substitutions.map((substitution, index) => (
                    <div className="substitution_item" key={substitution.id}>
                        {/*세트*/}
                        <select className="substitution_set" value={substitution.set} onChange={(e)=>onChange(index, "set", e.target.value)}>
                            <option value="">세트</option>
                            <option value="1">1세트</option>
                            <option value="2">2세트</option>
                            <option value="3">3세트</option>
                            <option value="4">4세트</option>
                            <option value="5">5세트</option>
                        </select>

                        {/*OUT*/}
                        <select value={substitution.outPlayer} onChange={(e) => onChange(index, "outPlayer", e.target.value)}>
                            <option value="">OUT</option>
                            {entry.filter((player) => player.name.trim() !== "")
                                .filter((player) => player.id !== substitution.inPlayer)
                                .map((player) => (<option key={player.id} value={player.id}>{player.number} {player.name}</option>))
                            }
                        </select>

                        <span className="substitution_arrow">→</span>

                        {/*IN*/}
                        <select value={substitution.inPlayer} onChange={(e) => onChange(index, "inPlayer", e.target.value)}>
                            <option value="">IN</option>
                            {entry.filter((player) => player.name.trim() !== "")
                                .filter((player) => player.id !== substitution.outPlayer)
                                .map((player) => (<option key={player.id} value={player.id}>{player.number} {player.name}</option>))
                            }
                        </select>

                        {/*교체 스코어*/}
                        <div className="substitution_score">
                            <span className="substitution_score_title">스코어</span>
                            <input type="number" min="0" placeholder="0" value={substitution.myScore} onChange={(e) => onChange(index, "myScore", e.target.value)}/>
                            <span className="score_colon">:</span>
                            <input type="number" min="0" placeholder="0" value={substitution.opponentScore} onChange={(e)=> onChange(index, "opponentScore", e.target.value)}/>
                            <button type="button" className="substitution_remove" onClick={() => onRemove(index)}>삭제</button>
                        </div>
                    </div>
                ))}
            </div>

            <button type = "button" className="substitution_add" onClick={onAdd}>+교체 기록 추가</button>
        </div>
    );
}

export default SubstitutionSection;