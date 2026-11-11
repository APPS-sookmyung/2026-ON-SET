import { isValidFinalScore } from "./diaryData";

//승률계산
export const getDiaryStats = (diaries) => {
    //경기 기록 수
    const totalGames = diaries.length;
    //관람 방식별 경기 수(직관/집관)
    const liveGames = diaries.filter (
        (diary) => diary.viewingType === "직관"
    ).length;
    const homeGames = diaries.filter (
        (diary) => diary.viewingType === "집관"
    ).length;
    //승리/패배 경기 수
    const winGames = diaries.filter(
        (diary) => diary.result === "승리"
    ).length;
    const loseGames = diaries.filter(
        (diary) => diary.result === "패배"
    ).length;
    //승패가 기록된 경기
    const resultGames = winGames + loseGames;

    //승률 계산
    let winRate = 0;

    if(resultGames > 0) {
        winRate = Math.round((winGames / resultGames) * 1000) / 10;
    }

    //직관 중 승리, 패배 수
    const liveWins = diaries.filter(
        (diary) => diary.viewingType === "직관" && diary.result === "승리"
    ).length;

    const liveLoses = diaries.filter(
        (diary) => diary.viewingType === "직관" && diary.result === "패배"
    ).length;

    //집관 경기 중 승리, 패배 수
    const homeWins = diaries.filter(
        (diary) => diary.viewingType === "집관" && diary.result === "승리"
    ).length;

    const homeLoses = diaries.filter(
        (diary) => diary.viewingType === "집관" && diary.result === "패배"
    ).length;

    const liveResultGames = liveWins +  liveLoses;
    const homeResultGames = homeWins + homeLoses;
    
    let liveWinRate = 0;
    let homeWinRate = 0;

    if (liveResultGames > 0) {
        liveWinRate = Math.round((liveWins / liveResultGames) * 1000) / 10;
    }

    if (homeResultGames > 0) {
        homeWinRate = Math.round((homeWins / homeResultGames) * 1000) / 10;
    }

    //직관/집관 비율
    let liveRate = 0;
    let homeRate = 0;

    if (totalGames > 0) {
        liveRate = (liveGames / totalGames) * 100;
        homeRate = (homeGames / totalGames) * 100;
    }

    //감정별 기록 횟수
    const emotionCounts = {};

    diaries.forEach((diary) => {
        const emotion = diary.emotion;

        if (emotion) {
            if (emotionCounts[emotion]) {
                emotionCounts[emotion] += 1;
            } else {
                emotionCounts[emotion] = 1;
            }
        }
    });

    //많이 기록한 감정 순 정렬
    const emotionStats = Object.entries(emotionCounts).map(
        ([name, count]) => ({name, count})
    );

    emotionStats.sort((a, b) => b.count - a.count);

    //오늘의 선수별 기록 횟수
    const playerCounts = {};

    diaries.forEach((diary) => {
        const player = diary.player.trim();

        if (player) {
            if (playerCounts[player]) {
                playerCounts[player] += 1;
            } else {
                playerCounts[player] = 1;
            }
        }
    });

    //많이 기록된 오늘의 선수 순으로 정렬
    const playerStats = Object.entries(playerCounts).map(
        ([name, count]) => ({name, count})
    );

    playerStats.sort((a, b) => b.count - a.count);

    //상위 3명
    const topPlayers = playerStats.slice(0,3);


    // 최종 스코어가 기록된 경기만 선택
    const scoredGames = diaries.filter(
        (diary) => isValidFinalScore(diary.myScore, diary.opponentScore)
    );

    // 세트 수별 승패 기록
    const setStats = [
        { set: 3, wins: 0, losses: 0 },
        { set: 4, wins: 0, losses: 0 },
        { set: 5, wins: 0, losses: 0 },
    ];

    scoredGames.forEach((diary) => {
        // 최종 스코어를 더해 총 세트 수 계산
        const totalSets = Number(diary.myScore) + Number(diary.opponentScore);

        // 해당 세트 수의 통계 찾기
        const setStat = setStats.find(
            (item) => item.set === totalSets
        );

        if (setStat) {
            if (Number(diary.myScore) === 3) {
                setStat.wins += 1;
            } else {
                setStat.losses += 1;
            }
        }
    });


    return {
        totalGames,
        liveGames,
        homeGames,
        winGames,
        loseGames,
        resultGames,
        winRate,
        liveWins,
        liveLoses,
        homeWins,
        homeLoses,
        liveWinRate,
        homeWinRate,
        liveRate,
        homeRate,
        emotionStats,
        topPlayers,
        setStats,
        scoredGameCount: scoredGames.length,
    };
};