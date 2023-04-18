import React, {useState, useEffect} from "react"
import UserTextCard from "./UserTextCard"
import AddFileModal from "./AddFileModal"
import LangChoiceModal from "./LangChoiceModal"
import { Button, Container } from "react-bootstrap"

function UserTextList({user, userTexts, showAddFile, setShowAddFile, showLangChoice, setShowLangChoice, showInput, setShowInput}) {
    const [title, setTitle] = useState('')
    const [uploadText, setUploadText] = useState('')


    function handleClick(e) {
        setShowAddFile(true)
    }

    return (
        <div>
            <Container class='cards'>
            {userTexts.map(text => {
                return <UserTextCard key={text.id} text={text} />
            })}
            </Container>
            <Container id="userTxtBtn">
            <Button onClick={handleClick}>Add A New Text</Button>
            </Container>
            <AddFileModal showAddFile={showAddFile} setShowAddFile={setShowAddFile} setUploadText={setUploadText} 
                setTitle={setTitle} setShowLangChoice={setShowLangChoice} showInput={showInput} setShowInput={setShowInput} />
            <LangChoiceModal title={title} content={uploadText} showLangChoice={showLangChoice} setShowLangChoice={setShowLangChoice}/>
        </div>
    )
}

export default UserTextList