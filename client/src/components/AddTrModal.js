import { Modal, Button } from "react-bootstrap"
import { useState } from "react"


function AddTrModal({title, content, user, id, showAddTrModal, setShowAddTrModal}) {
    const [basicLang, setBasicLang] = useState()
    const [selectedButton, setSelectedButton] = useState(false);
    const [selectedButton2, setSelectedButton2] = useState(false);
    const [selectedButton3, setSelectedButton3] = useState(false)
    const [country, setCountry] = useState()
    const [dialect, setDialect] = useState()
    const [dialectLang, setDialectLang] = useState('en-us')
    const [text, setText] = useState()



    let langChoice = []
    let countryChoice = []

    

    const baseLang = [
        "English",
        "French",
        "Spanish",
        "Brazillian",
        "Japanese",
        "German",
        "Russian"
    ]

    const engSpeak = [
        "America",
        "Britain",
        "Australia"
    ]

    const americaDialects = [
        "General American",
        "Boston",
        "New York",
        "Southern"
    ]

    const englandDialects = [
        "Estuary",
        "RP",
        "Cockney",
        "Scottish",
        "Irish"
    ]

    if (basicLang === "English") {
            langChoice = engSpeak
        }
    


    if (country === "America") {
            countryChoice = americaDialects
            
        }

    else if (country === "Britain") {
            countryChoice = englandDialects
            
        }
    function langClick(lang) {
        switch (lang) {
            case "General American":
                setDialectLang('en-us');
                break;
            case "Estuary":
                setDialectLang('en')
                break;
            case "Scottish":
                setDialectLang('en-gb-scotland')
                break;
            case "Australian":
                setDialectLang('en')
                break;
            case "French":
                setDialectLang('fr')
                setCountry(null)
                break;
            case "Spanish":
                setDialectLang('es')
                setCountry(null)
                break;
            case "Brazillian":
                setDialectLang('pt-br')
                setCountry(null)
                break;
            case "German":
                setDialectLang('de')
                setCountry(null)
                break;
            case "Japanese":
                setDialectLang('ja')
                setCountry(null)
                break;
            case "Russian":
                setDialectLang('ru')
                setCountry(null)
                break;
            default:
                setDialectLang('en-us')
        }
    }

    
    function handleNewTr(e) {
         fetch(`/api/${user.username}/${id}/tr`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    language: dialectLang,
                    text: content,
                    dialect: dialect
                })
            })
        .then(resp => resp.json())
        .then(data => setText(data))
        .then(() => window.location.reload() )
        

        
    }

    function handleSelect (lang) {
        if (lang === selectedButton) {
            setSelectedButton(null)
        }
        else {
            setSelectedButton(lang)
        }
    }

    function handleSelect2 (lang) {
        if (lang === selectedButton) {
            setSelectedButton2(null)
        }
        else {
            setSelectedButton2(lang)
        }
    }

    function handleSelect3 (lang) {
        if (lang === selectedButton) {
            setSelectedButton3(null)
        }
        else {
            setSelectedButton3(lang)
        }
    }

    
    return (
        <>
        <Modal centered scrollable show={showAddTrModal} onHide={() => setShowAddTrModal(false)}> 
            <Modal.Header className="justify-content-center">
                <Modal.Title className="mod-titles">
                {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Choose An Accent:
                <p></p>
                <div className="d-flex mb-2 gap-2">
                    {baseLang.map((lang) => {
                        return <Button  key={lang}  className={lang === selectedButton ? 'custom-btn-active' : 'custom-btn-outline'} onClick={() => {setBasicLang(lang); langClick(lang); handleSelect(lang); setDialect(lang)}}>{lang}</Button>
                    })}
                </div>
                {basicLang ? <div className="d-flex mb-2 gap-2">
                    {langChoice.map((lang) => {
                        return <Button  key={lang} className={lang === selectedButton2 ? 'custom-btn-active' : 'custom-btn-outline'}  onClick={() => {setCountry(lang); langClick(lang); handleSelect2(lang); setDialect(lang)}}>{lang}</Button>
                    })}
                </div> : null}
                {country ? <div className="d-flex mb-2 gap-2">
                    {countryChoice.map((lang) => {
                        return <Button  key={lang} className={lang === selectedButton3 ? 'custom-btn-active' : 'custom-btn-outline'}  onClick={() => {setDialect(lang); langClick(lang); handleSelect3(lang); setDialect(lang)}}>{lang}</Button>
                    })}
                </div> : null}
            </Modal.Body>
            {langChoice ? <Modal.Footer>
                <Button className="custom-submit-btn" onClick={() => {handleNewTr(); setShowAddTrModal(false)}}>We're doing {dialect}</Button>
            </Modal.Footer> : null}
        </Modal>
        </>
    )
}

export default AddTrModal