import React, {useState, useEffect} from "react";
import { Card } from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player'


function TranscriptionCard({text, tr, lang, dialect, user}) {
    const [trShow, setTrShow] = useState(false)
    const [audioURL, setAudioURL] = useState('')
    

    const new_speech = {
        text: text,
        language : lang
    }

    

    useEffect(() => {
        fetch('/api/text_to_speech', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(new_speech)
        })
        .then(resp => resp.blob())
        .then(data => URL.createObjectURL(data))
        .then(url => setAudioURL(url))
    }, [])
    
    function handleClick(e) {
        setTrShow(!trShow)
    }

    return(
        <>
            <Card style={user ? null : {border: '2px solid rgb(105, 87, 80)'}}>
                {user ? null : <Card.Header className="homeHeader">{dialect}</Card.Header> }
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
                <ReactAudioPlayer src={audioURL} controls />
                <br></br>
                <br></br>
                <button onClick={handleClick}>
                    {trShow ? "Hide IPA" : "Show IPA"}
                </button>
                </Card.Body>
            </Card>
        </>
    )
}

export default TranscriptionCard