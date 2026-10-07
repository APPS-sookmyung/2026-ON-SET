export const createEmptyDiary = () => ({
    //기본 정보
    date: "",
    myTeam:"",
    opponent: "",
    viewingType: "",
    result: "",
    myScore: "",
    opponentScore: "",

    //상세 정보
    entry: [],
    startingLineup: {
        position1: "",
        position2: "",
        position3: "",
        position4: "",
        position5: "",
        position6: "",
        libero: ""
    },
    substitutions: [],
    setFlow: [],

    //감정 기록
    emotion: "",
    player: "",
    momentSet: "",
    moment: "",
    content: "",
});

export const createEmptyEntryPlayer = () => ({
    id: crypto.randomUUID(),
    number: "",
    name: "",
    position: "",
});

export const createEmptySubstitutioon = () => ({
    id: crypto.randomUUID(),
    set: "",
    outPlayer: "",
    inPlayer: "",
    myScore: "",
    opponentScore: ""
});