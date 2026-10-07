import { preMatchCards } from "../data/cards";

export const getTodayDate = () => {
    const today = new Date();

    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
};

export const getTodayPreMatchCard = () => {
    try {
        const saved = localStorage.getItem("preMatchCard");

        if(!saved){ return null; }

        const parsed = JSON.parse(saved);

        if (parsed.date !== getTodayDate()){
            localStorage.removeItem("preMatchCard");
            return null;
        }

        return (
            preMatchCards.find(
                (card) => card.id === parsed.cardId) || null
            );
    } catch {
        localStorage.removeItem("preMatchCard");
        return null;
    }
};

export const saveTodayPreMatchCard = (cardId) => {
    const cardData = {date: getTodayDate(), cardId};
    localStorage.setItem("preMatchCard", JSON.stringify(cardData));
};