export const getStoredDiaries = () => {
    try {
        const savedDiaries = localStorage.getItem("diaries");
        if(!savedDiaries) return [];
        const parsedDiaries = JSON.parse(savedDiaries);

        return Array.isArray(parsedDiaries)? parsedDiaries : [];
    } catch { return [];
    }
};

export const saveDiaries = (diaries) => {
    localStorage.setItem("diaries", JSON.stringify(diaries));
};

export const upsertDiary = (diary, id) => {
    const savedDiaries = getStoredDiaries();
    const now = new Date().toISOString();

    let updatedDiaries;

    if (id){
        updatedDiaries = savedDiaries.map((savedDiary) =>
            String(savedDiary.id) === String(id)
                ? {
                    ...diary,
                    id: savedDiary.id,
                    createdAt:savedDiary.createdAt,
                    updatedAt: now,
                }
                : savedDiary
        );
    } else {
        const newDiary = {
            ...diary,
            id: Date.now(),
            createdAt: now,
        };

        updatedDiaries = [
            ...savedDiaries,
            newDiary,
        ];
    }

    saveDiaries(updatedDiaries);
};