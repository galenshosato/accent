import React, {useState} from "react";
import { Card } from "react-bootstrap";

function TranscriptionCard({text, tr}) {
    const [trShow, setTrShow] = useState(false)
    return(
        <>
            <Card>
                <Card.Body>
                    {text.map((t, index) => {
                        return (
                            <div key={index}>
                                <span>{t}</span>
                                <br></br>
                                {trShow && <><span>{tr[index]}</span><p></p></>}
                            </div>
                        )
                    })}
                <button onClick={() => setTrShow(!trShow)}>
                    {trShow ? "Hide IPA" : "Show IPA"}
                </button>
                </Card.Body>
            </Card>
        </>
    )
}

export default TranscriptionCard