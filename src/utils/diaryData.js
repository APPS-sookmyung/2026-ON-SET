export const isValidFinalScore = (myScoreValue, opponentScoreValue) => {
    if (myScoreValue === "" || opponentScoreValue === ""){
        return false;
    }

    const myScore = Number(myScoreValue);
    const opponentScore = Number(opponentScoreValue);

    return (
        (myScore === 3 && opponentScore >= 0 && opponentScore <= 2) ||
        (opponentScore === 3 && myScore >= 0 && myScore <=2)
    );
};


export const createSetFlowFromFinalScore = (previousSetFlow, myScoreValue, opponentScoreValue) => {
    if (!isValidFinalScore(myScoreValue, opponentScoreValue)){
        return [];
    }

    const totalSets = Number(myScoreValue) + Number(opponentScoreValue);

    return Array.from(
        {length: totalSets},
        (_, index) => previousSetFlow[index] ?? {
            set: index + 1,
            myScore: "",
            opponentScore: "",
            memo: "",
        }
    );
};

export const getResultFromFinalScore = (myScoreValue, opponentScoreValue) => {
    if(!isValidFinalScore(myScoreValue, opponentScoreValue)){
        return "";
    }

    return Number(myScoreValue) === 3 ? "승리" : "패배";
};