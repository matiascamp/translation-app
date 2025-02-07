import { speakText } from "../../utils/speakText";
import Copy from "../../assets/Copy.svg"
import Speech from "../../assets/sound_max_fill.svg"
import "./buttons.css"

type ButtonsProps = {
    text:string;
    language:string;
}

const Buttons = ({text,language}:ButtonsProps) => {

    const handleSpeakInput = () => {
        const lang = `${language}-${language.toLocaleUpperCase()}`
        speakText(text, lang);
    };

    const CopyButton = ({ textToCopy }: {textToCopy:string}) => {
        const handleCopy = async () => {
          try {
            await navigator.clipboard.writeText(textToCopy);
            alert('Texto copiado al portapapeles!');
          } catch (error) {
            console.error('Error al copiar el texto: ', error);
          }
        };
        return (
            <button onClick={handleCopy}>
            <img src={Copy} alt="" />
        </button>
        )
    }


    return (
        <span className="speech-copy-buttons-container">
            <button type="button" onClick={handleSpeakInput}>
                <img src={Speech} alt="" />
            </button>
            <CopyButton textToCopy={text}/>
        </span>
    )
}

export default Buttons