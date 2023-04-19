import { Modal, Button } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function LangChoiceModal({title, content, showLangChoice, setShowLangChoice, userTexts, setUserTexts, user}) {
    const [basicLang, setBasicLang] = useState()
    const [selectedButton, setSelectedButton] = useState(false);
    const [selectedButton2, setSelectedButton2] = useState(false);
    const [selectedButton3, setSelectedButton3] = useState(false)
    const [country, setCountry] = useState()
    const [dialect, setDialect] = useState()
    const [dialectLang, setDialectLang] = useState('en-us')
    const [text, setText] = useState()

    const navigate = useNavigate()


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
                    dialect: dialect
                })
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
                        return <Button key={lang}  variant={lang === selectedButton ? 'primary' : 'outline-primary'} onClick={() => {setBasicLang(lang); langClick(lang); handleSelect(lang); setDialect(lang)}}>{lang}</Button>
                    })}
                </div>
                {basicLang ? <div className="d-flex mb-2 gap-2">
                    {langChoice.map((lang) => {
                        return <Button  key={lang} variant={lang === selectedButton2 ? 'primary' : 'outline-primary'}  onClick={() => {setCountry(lang); langClick(lang); handleSelect2(lang); setDialect(lang)}}>{lang}</Button>
                    })}
                </div> : null}
                {country ? <div className="d-flex mb-2 gap-2">
                    {countryChoice.map((lang) => {
                        return <Button key={lang} variant={lang === selectedButton3 ? 'primary' : 'outline-primary'}  onClick={() => {setDialect(lang); langClick(lang); handleSelect3(lang); setDialect(lang)}}>{lang}</Button>
                    })}
                </div> : null}
            </Modal.Body>
            {langChoice ? <Modal.Footer>
                <Button onClick={() => {handleNewTr(); setShowLangChoice(false)}}>We're doing {dialect}</Button>
            </Modal.Footer> : null}
        </Modal>
        </>
    )
}

export default LangChoiceModal