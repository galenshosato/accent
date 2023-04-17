import React, {useState, useEffect} from "react"
import UserTextCard from "./UserTextCard"
import AddFileModal from "./AddFileModal"
import LangChoiceModal from "./LangChoiceModal"
import { Button } from "react-bootstrap"

function UserTextList({user, userTexts, showAddFile, setShowAddFile, showLangChoice, setShowLangChoice}) {
    const [title, setTitle] = useState('')
    const [uploadText, setUploadText] = useState('')


    function handleClick(e) {
        setShowAddFile(true)
    }

    return (
        <div>
            <div class='cards'>
            {userTexts.map(text => {
                return <UserTextCard key={text.id} text={text} />
            })}
            </div>
            <div id="userTxtBtn">
            <Button onClick={handleClick}>Add A New Text</Button>
            </div>
            <AddFileModal showAddFile={showAddFile} setShowAddFile={setShowAddFile} setUploadText={setUploadText} setTitle={setTitle} setShowLangChoice={setShowLangChoice} />
            <LangChoiceModal title={title} content={uploadText} showLangChoice={showLangChoice} setShowLangChoice={setShowLangChoice}/>
        </div>
    )
}

export default UserTextList