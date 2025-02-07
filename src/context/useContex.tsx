import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type languagesProps = {
    submit: string;
    show: string;
}

type TextProps = {
    initialText: string;
    actualText: string;
    response: string;
    usedSubmitLanguage: string;
}

interface ContextType {
    languagues: languagesProps,
    setlanguages: Dispatch<SetStateAction<languagesProps>>;
    text: TextProps;
    setText: Dispatch<SetStateAction<TextProps>>;
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>;
}


const TranslateContext = createContext<ContextType | undefined>(undefined)

export const ContexProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [languagues, setlanguages] = useState({
        submit: "",
        show: ""
    })
    const [text, setText] = useState({
        initialText: "",
        actualText: "",
        response: "",
        usedSubmitLanguage: ""
    })

    const [loading, setLoading] = useState(false)



    return (
        <TranslateContext.Provider value={{ languagues, setlanguages, text, setText, loading, setLoading }}>
            {children}
        </TranslateContext.Provider>
    )
}

export const contextTranslate = () => {
    const context = useContext(TranslateContext);
    if (!context) {
        throw new Error('contextProfile must be used within a TranslateContext');
    }
    return context;
};