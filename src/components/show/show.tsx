import { contextTranslate } from "../../context/useContex"
import Buttons from "../buttons/buttons"
import BouncingDotsLoader from "../customLoader/customLoader"
import "./show.css"

const ShowModal = () => {
    const { text, languagues, loading } = contextTranslate()

    return (
        <>
            <p className="show-text-area">{loading ? <BouncingDotsLoader /> : text.response}</p>
            <Buttons text={text.response} language={languagues.show} />
        </>
    )
}

export default ShowModal