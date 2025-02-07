import { ReactNode, useState } from "react"
import countries from "../../languagues.json"
import { contextTranslate } from "../../context/useContex"
import { franc } from "franc";
import Reverse from "../../assets/Horizontal_top_left_main.svg"
import "./languages.css"

type languagesProps = {
    children: ReactNode;
    target: "submit" | "show"
}

const Languagues = ({ children, target }: languagesProps) => {
    const { setlanguages, text, languagues } = contextTranslate()
    const [activeOption, setActiveOption] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setlanguages((prev) => ({
            ...prev,
            [target]: event.target.value
        }))
        setActiveOption("select")
    }

    const handleButtonClick = (languageCode: string) => {
        setlanguages((prev) => ({
            ...prev,
            [target]: languageCode,
        }));
        setActiveOption(languageCode)

    };

    const handleDetecLanguague = () => {
        if (!text.actualText.trim()) return
        const detected = franc(text.actualText, { minLength: 2 })
        setlanguages((prev) => ({
            ...prev,
            [target]: detected,
        }));
        setActiveOption("detect");
    }

    const handleReverse = () => {
        const currentSubmit = languagues.submit;
        const currentShow = languagues.show;
        
        setlanguages({
          submit: currentShow,
          show: currentSubmit,
        });

        if (currentSubmit === "en" || currentSubmit === "fr") {
          setActiveOption(currentSubmit);
        } else if(currentShow === "en" || currentShow === "fr"){
            setActiveOption(currentShow);
        }
      };



    return (
        <div className="lenguages-wrapper">
            <div className="selectors-container">
                <button onClick={handleDetecLanguague} style={target === 'show' ? { display: 'none' } : {}} className={activeOption === "detect" ? "selected" : ""} >Detect Language</button>
                <button onClick={() => handleButtonClick("en")}  className={activeOption === "en" ? "selected" : ""}>English</button>
                <button onClick={() => handleButtonClick("fr")}  className={activeOption === "fr" ? "selected" : ""}>French</button>
                <select name="languagues-select" id="languagues-select" onChange={handleChange}>
                    {countries.map((country) => (
                        <option key={country.code} value={country.code} >
                            {country.name}
                        </option>
                    )
                    )}
                </select>

                <button style={target === 'submit' ? { display: 'none' } : {}} className="button-reverse" onClick={handleReverse}>
                    <img src={Reverse} alt="" />
                </button>

            </div>
            {children}
        </div>
    )

}

export default Languagues