export const fetchTranslation = async (sentence: string, langpair: string) => {
    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(sentence)}&langpair=${langpair}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { data };
    } catch (e: any) {
        console.error("Error fetching translation:", e);
        throw new Error(e)
    }
}

export const debounce = ( func: (...args: any[]) => void, wait: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: any[]) => {

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            func(...args);
        }, wait);
    };
};