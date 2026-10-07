import { POSITIONS } from "../../constants/diaryOptions";

function EntrySection({entry = [], onAddPlayer, onChangePlayer, onRemovePlayer}){
    return (
        <div className="form_group">
            <label>엔트리</label>
            <div className="entry_list">
                {entry.map((player, index) => (
                    <div className="entry_item" key={player.id}>
                        <input type="number" className="entry_number" placeholder="등번호" min="1" value={player.number} onChange={(e)=> onChangePlayer(index, "number", e.target.value)}/>
                        <input type="text" className="entry_name" placeholder ="선수 이름" value={player.name} onChange={(e) => onChangePlayer(index, "name", e.target.value)}/>
                        <select className="entry_position" value={player.position} onChange={(e) => onChangePlayer(index, "position", e.target.value)}>
                            <option value="">포지션 선택</option>
                            {POSITIONS.map((position) => (
                                <option key={position} value={position}>{position}</option>
                            ))}
                        </select>
                        <button type="button" className="entry_remove" onClick={()=>onRemovePlayer(index)}>삭제</button>
                    </div>
                ))}
            </div>

            <button type="button" className="entry_add" onClick={onAddPlayer}>+ 선수 추가</button>
        </div>
    );
}

export default EntrySection;