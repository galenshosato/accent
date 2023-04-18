import React, {useState} from "react"
import { Card } from "react-bootstrap"
import TranscriptionCard from "./TranscriptionCard"

function UserTextCard({text}) {
    const [isExpan, setExpan] = useState(false)
    const trs = text.transcriptions[0]

    
    const handleClick = () => {
    setExpan(true);
  };

   

  return (
    <>
    <Card onClick={handleClick}>
      <Card.Body>
        <Card.Title className={isExpan ? 'text-center mb-3' : 'text-center'}>{text['text_title']}</Card.Title>
        {isExpan && (
            <>
            <TranscriptionCard text={trs.text1} tr={trs.tr1} />
            <TranscriptionCard text={trs.text2} tr={trs.tr2} />
            <TranscriptionCard text={trs.text3} tr={trs.tr3} />
            <TranscriptionCard text={trs.text4} tr={trs.tr4} />
            {trs.text5 && trs.tr5 ? <TranscriptionCard text={trs.text5} tr={trs.tr5} /> : null}
            {trs.text6 && trs.tr6 ? <TranscriptionCard text={trs.text6} tr={trs.tr6} /> : null}
            {trs.text7 && trs.tr7 ? <TranscriptionCard text={trs.text7} tr={trs.tr7} /> : null}
            </> 
        )}
      </Card.Body>
    </Card>
    </>
    )
}

export default UserTextCard