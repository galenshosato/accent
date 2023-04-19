import { Modal, Button } from "react-bootstrap"
import { useState } from "react"

function LangChoiceModal({title, content, showLangChoice, setShowLangChoice, user}) {
    const [basicLang, setBasicLang] = useState()
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
        "Greek",
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
            case "French":
                setDialectLang('fr')
                break;
            case "Spanish":
                setDialectLang('es')
                break;
            case "Brazillian":
                setDialectLang('pt-br')
                break;
            case "Greek":
                setDialectLang('el')
                break;
            case "Russian":
                setDialectLang('ru')
                break;
            default:
                setDialectLang('en-us')
        }
    }

    
    function handleNewTr(e) {
        fetch(`/api/${user.username}/texts`, {
            method:'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                text_title: title,
                text_content: content,
                user_id: user.id,
            })
        })
        .then(resp => resp.json())
        .then(data => {
            return fetch(`/api/${user.username}/${data.id}/tr`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    language: dialectLang,
                    text: data.text_content,
                })
            })
        })
        .then(resp => resp.json())
        .then(data => setText(data))
    }

    
    return (
        <>
        <Modal centered scrollable show={showLangChoice} onHide={() => setShowLangChoice(false)}> 
            <Modal.Header className="justify-content-center">
                <Modal.Title>
                {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Choose An Accent:
                <p></p>
                <div className="d-flex mb-2 gap-2">
                    {baseLang.map((lang) => {
                        return <Button key={lang.id} onClick={() => {setBasicLang(lang); langClick(lang)}}>{lang}</Button>
                    })}
                </div>
                {basicLang ? <div className="d-flex mb-2 gap-2">
                    {langChoice.map((lang) => {
                        return <Button key={lang.id}  onClick={() => {setCountry(lang); langClick(lang)}}>{lang}</Button>
                    })}
                </div> : null}
                {country ? <div className="d-flex mb-2 gap-2">
                    {countryChoice.map((lang) => {
                        return <Button key={lang.id}  onClick={() => {setDialect(lang); langClick(lang)}}>{lang}</Button>
                    })}
                </div> : null}
            </Modal.Body>
            {langChoice ? <Modal.Footer>
                <Button onClick={() => {handleNewTr(); setShowLangChoice(false)}}>Let's Go!</Button>
            </Modal.Footer> : null}
        </Modal>
        </>
    )
}

export default LangChoiceModal