import React from "react"
import UserTextCard from "./UserTextCard"

function UserTextList({userTexts}) {
    console.log(userTexts)
    return (
        <>
        {userTexts.map(text => {
            return <UserTextCard key={text.id} text={text} />
        })}
        </>
    )
}

export default UserTextList