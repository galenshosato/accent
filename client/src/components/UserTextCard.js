import React, {useState} from "react"
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import TranscriptionCard from "./TranscriptionCard"
import AddTrModal from "./AddTrModal"

function UserTextCard({text, user}) {
    const [isExpan, setExpan] = useState(false)
    const [showAddTrModal, setShowAddTrModal] = useState(false)
    const [tr, setTr] = useState(text.transcriptions[0])
    const [isChecked, setIsChecked] = useState(false)

    const buttons = text.transcriptions
    const lang = tr.language
    

    
    function handleClick(e) {
      const name = e.target.name

      fetch(`/api/${user.username}/${text.id}/tr/${name}`)
      .then(resp=> resp.json())
      .then(data => setTr(data))
      

      if (isExpan) {
        return
      }
      
      else {
        setExpan(!isExpan)
      }
  };

    function handleIsChecked(button) {
      if (button === isChecked) {
        setIsChecked(null)
        setExpan(false)
      }

      else {
        setIsChecked(button)
      }

    }

    function handleShowTr(e) {
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
    <Card style={cardStyle} className="cards">
      <Card.Body>
        <Card.Title onClick={() => {setExpan(!isExpan); setIsChecked(false)}} className={isExpan ? 'text-center mb-3 title' : 'text-center title'}>{text['text_title']}</Card.Title>
        <div className='d-flex justify-content-center align-items-center' style={{marginBottom: '10px', gap: '10px'}}>
        {buttons.map(button => {
           return <Button key={button} name={button.dialect} onClick={(e) => {handleClick(e); handleIsChecked(button)}} size="sm" className={button === isChecked ? "custom-btn-active" : 'custom-btn-outline'}>{button.dialect}</Button>
        })}
        </div>
        
        <div className='d-flex justify-content-center align-items-center'>
        <OverlayTrigger placement="right"
                        overlay={
                          <Tooltip id='tooltip-right'>
                            Add a new accent to this text!
                          </Tooltip>
                        }>
        <Button className="custom-btn-outline" size="sm" variant='outline-dark' onClick={handleShowTr}>+</Button>
        </OverlayTrigger>
        </div>
        
        {isExpan && (
            <>
            <TranscriptionCard text={tr.text1} tr={tr.tr1} lang={lang} user={user} />
            {tr.text2 && tr.tr2 ? <TranscriptionCard text={tr.text2} tr={tr.tr2} lang={lang} user={user} /> : null}
            {tr.text3 && tr.tr3 ? <TranscriptionCard text={tr.text3} tr={tr.tr3} lang={lang} user={user} /> : null}
            {tr.text4 && tr.tr4 ? <TranscriptionCard text={tr.text4} tr={tr.tr4} lang={lang} user={user} /> : null}
            {tr.text5 && tr.tr5 ? <TranscriptionCard text={tr.text5} tr={tr.tr5} lang={lang} user={user} /> : null}
            {tr.text6 && tr.tr6 ? <TranscriptionCard text={tr.text6} tr={tr.tr6} lang={lang} user={user} /> : null}
            {tr.text7 && tr.tr7 ? <TranscriptionCard text={tr.text7} tr={tr.tr7} lang={lang} user={user} /> : null}
            </> 
        )}
      </Card.Body>
    </Card>
    <AddTrModal id={text.id} title={text['text_title']} content={text['text_content']} showAddTrModal={showAddTrModal} setShowAddTrModal={setShowAddTrModal} user={user}/>
    </>
    )
}

export default UserTextCard