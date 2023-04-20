import React, {useState} from "react"
import { Card, Button } from "react-bootstrap"
import TranscriptionCard from "./TranscriptionCard"
import AddTrModal from "./AddTrModal"

function UserTextCard({text, user}) {
    const [isExpan, setExpan] = useState(false)
    const [showAddTrModal, setShowAddTrModal] = useState(false)

    const buttons = text.transcriptions
    const trs = text.transcriptions[0]
    const lang = trs.language
    

    
    function handleClick(e) {
    setExpan(!isExpan);
  };

    function handleShowTr(e) {
      console.log(e.target)
      setShowAddTrModal(true)
    }


    const cardStyle = {
      maxWidth: '100%',
      width: isExpan ? '80%' : 'calc((40% - 10px) / 2)',
      height: isExpan ? '85%' : '125px',
      marginTop: '30px',
      marginBottom: '10px',
    }

   

  return (
    <>
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title className={isExpan ? 'text-center mb-3 title' : 'text-center title'}>{text['text_title']}</Card.Title>
        <div className='d-flex justify-content-center align-items-center' style={{marginBottom: '10px', gap: '10px'}}>
        {buttons.map(button => {
           return <Button key={button.id} onClick={handleClick} size="sm" variant="outline-primary">{button.dialect}</Button>
        })}
        </div>
        <div className='d-flex justify-content-center align-items-center'>
        <Button size="sm" variant='outline-dark' onClick={handleShowTr}>+</Button>
        </div>
        
        {isExpan && (
            <>
            <TranscriptionCard text={trs.text1} tr={trs.tr1} lang={lang} />
            {trs.text2 && trs.tr2 ? <TranscriptionCard text={trs.text2} tr={trs.tr2} lang={lang} /> : null}
            {trs.text3 && trs.tr3 ? <TranscriptionCard text={trs.text3} tr={trs.tr3} lang={lang} /> : null}
            {trs.text4 && trs.tr4 ? <TranscriptionCard text={trs.text4} tr={trs.tr4} lang={lang} /> : null}
            {trs.text5 && trs.tr5 ? <TranscriptionCard text={trs.text5} tr={trs.tr5} lang={lang} /> : null}
            {trs.text6 && trs.tr6 ? <TranscriptionCard text={trs.text6} tr={trs.tr6} lang={lang} /> : null}
            {trs.text7 && trs.tr7 ? <TranscriptionCard text={trs.text7} tr={trs.tr7} lang={lang} /> : null}
            </> 
        )}
      </Card.Body>
    </Card>
    <AddTrModal id={text.id} title={text['text_title']} content={text['text_content']} showAddTrModal={showAddTrModal} setShowAddTrModal={setShowAddTrModal} user={user}/>
    </>
    )
}

export default UserTextCard