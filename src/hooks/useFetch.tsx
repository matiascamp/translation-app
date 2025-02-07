import { useState,useEffect } from "react";

const fetchData = async (setence:string,langpair:string) => {
    const translate = await fetch(`https://api.mymemory.translated.net/get?q=${setence}&langpair=${langpair}`)
    return translate.json()
}

export const useFetch = (sentence:string,langpair:string) => {
    const [data,setData] = useState<Promise<any> | null>(null)
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const response = await fetchData(sentence,langpair)
                setData(response)
                setLoading(false)
            }
            catch(e) {
                console.error("Error to translate",e)
            }
        })()
    },[])

    return {data,loading}
}