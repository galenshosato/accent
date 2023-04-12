import React from "react"
import { Card } from "react-bootstrap"

function UserTextCard({text}) {
    console.log(text)
    return(
        <>
        <Card>
            <Card.Body>
                <Card.Title>{text['text_title']}</Card.Title>
            </Card.Body>
        </Card>
        </>
    )
}

export default UserTextCard