import React from "react"
import UserTextCard from "./UserTextCard"

function UserTextList({userTexts}) {
    return (
        <div class='cards'>
        {userTexts.map(text => {
            return <UserTextCard key={text.id} text={text} />
        })}
        </div>
    )
}

export default UserTextList