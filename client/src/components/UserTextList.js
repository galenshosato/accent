import React, {useState, useEffect} from "react"
import UserTextCard from "./UserTextCard"
import AddFileModal from "./AddFileModal"
import LangChoiceModal from "./LangChoiceModal"
import { Button, Container } from "react-bootstrap"

function UserTextList({user, setUserTexts, userTexts, showAddFile, setShowAddFile, showLangChoice, setShowLangChoice, showInput, setShowInput}) {
    const [title, setTitle] = useState('')
    const [uploadText, setUploadText] = useState('')

    useEffect(() => {
        fetch(`/api/${user.username}/texts`)
        .then(resp => resp.json())
        .then(data => setUserTexts(data))
      }, [user])


    


    function handleClick(e) {
        setShowAddFile(true)
    }

    return (
        <>
            <div style={{height: '100vh'}}>
                <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '30px'}}>
                    {userTexts.map(text => {
                        return <UserTextCard key={text.id} text={text} user={user} />
                    })}
                </Container>
                <Container className='d-flex justify-content-center align-items-center' style={{marginTop:'20px'}}>
                <Button className="custom-btn" onClick={handleClick}>Add A New Text</Button>
                </Container>
            </div>    
            <AddFileModal showAddFile={showAddFile} setShowAddFile={setShowAddFile} setUploadText={setUploadText} 
                setTitle={setTitle} setShowLangChoice={setShowLangChoice} showInput={showInput} setShowInput={setShowInput} />
            <LangChoiceModal user={user} title={title} content={uploadText} userTexts={userTexts} setUserTexts={setUserTexts} showLangChoice={showLangChoice} setShowLangChoice={setShowLangChoice}/>
        </>
    )
}

export default UserTextList