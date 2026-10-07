import { COURT_POSITIONS } from "../../constants/diaryOptions";

function StartingLineupSection({entry=[], startingLineup = {}, onChange}) {
    const getAvailablePlayers = (currentPosition) => {
        const selectedPlayerIds = Object.entries(startingLineup)
        .filter(([position]) => position !== currentPosition)
        .map(([, playerId]) => playerId)
        .filter(Boolean);

    return entry.filter((player) => player.name.trim() !== "" && !selectedPlayerIds.includes(player.id));
    };

    return (
        <div className="form_group lineup_group">
            <label>스타팅 라인업</label>
            <p className="lineup_description">스타팅라인업을 구성해주세요.</p>
            <div className="lineup_court">
                {COURT_POSITIONS.map((position) => {
                    const positionKey = `position${position}`;
                    return (
                        <div className={`lineup_position position${position}`} key={position}>
                            <span className="position_number">{position}</span>
                            <select
                                className={startingLineup[positionKey] ? "lineup_select selected" : "lineup_select"}
                                value={startingLineup[positionKey] || ""}
                                onChange={(e) => onChange(positionKey, e.target.value)}>
                                <option value="">선수 선택</option>
                                {getAvailablePlayers(positionKey).map((player) => (
                                    <option key={player.id} value={player.id}>{player.number} {player.name}</option>
                                ))}
                            </select>
                        </div>
                    );
                })}
            </div>

            {/*리베로*/}
            <div className="lineup_libero">
                <span className="position_number">L</span>
                <select
                    className={startingLineup.libero ? "lineup_select selected" : "lineup_select"}
                    value={startingLineup.libero || ""}
                    onChange={(e) => onChange("libero", e.target.value)}>
                    <option value="">리베로 선택</option>

                    {getAvailablePlayers("libero").map(
                        (player) => (
                            <option key={player.id} value={player.id}>{player.number} {player.name}</option>
                        )
                    )}
                </select>
            </div>
        </div>
    );
}

export default StartingLineupSection;