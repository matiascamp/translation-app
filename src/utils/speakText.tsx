

export const speakText = (text: string, lang: string = "en-US") => {
    if (!window.speechSynthesis) {
        console.warn("API SpeechSynthesisis not available in this explorer.");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = lang;

    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
};