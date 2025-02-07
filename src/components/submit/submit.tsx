import { ChangeEvent, useEffect, useMemo, useRef } from 'react';
import { debounce, fetchTranslation } from '../../functions/getTranslation';
import "./submit.css"
import { contextTranslate } from '../../context/useContex';
import Buttons from '../buttons/buttons';
import Letter from "../../assets/Sort_alfa.svg"

const SubmitModal = () => {

    const maxCaharcters = 500
    const { languagues, text, setText, setLoading } = contextTranslate()

    const textRef = useRef(text.actualText)



    useEffect(() => {
        textRef.current = text.actualText
    }, [text.actualText])



    const debouncedChange = useMemo(() => {
        return debounce(async () => {
            if(languagues.show === "" || languagues.submit === "") return 
            if (!textRef.current) return
            try {
                const usedSubmitLanguage = text.usedSubmitLanguage || languagues.submit;
                const { data } = await fetchTranslation(textRef.current.toLocaleLowerCase(), `${languagues.submit}|${languagues.show}`);

                setText((prev) => ({
                    ...prev,
                    response: data.responseData.translatedText,
                    usedSubmitLanguage,
                }))
            } catch (error) {
                console.error("debounced translation error", error)
            }

        }, 500);
    }, [languagues]);


    useEffect(() => {
        setText((prev) => ({
            ...prev,
            response: ""
        }))
        debouncedChange();

    }, [text.actualText, debouncedChange]);



    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        setText((prev) => ({
            ...prev,
            initialText: "",
            actualText: value
        }));
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!text.actualText) return;

        setLoading(true)

        try {
            const { data } = await fetchTranslation(text.actualText.toLocaleLowerCase(), `${languagues.submit}|${languagues.show}`);
            setText((prev) => ({
                ...prev,
                response: data.responseData.translatedText
            }))
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }


    return (
        <form onSubmit={handleSubmit} className='container-submit'>
            <label htmlFor="translate"></label>
            <div className='text-area-container'>
                <textarea name="translate" id="tranlate" onChange={handleInputChange} maxLength={maxCaharcters} value={text.initialText || text.actualText} />
                <span className='text-area-counter'>{text.actualText.length}/{maxCaharcters}</span>
            </div>
            <div className='buttons-container'>
                <Buttons text={text.actualText} language={languagues.show} />
                <button className='button-translate' type='submit'>
                    <img src={Letter} alt="" />
                    Translate
                    </button>
            </div>
        </form>
    )
}

export default SubmitModal