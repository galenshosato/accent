import React from "react";
import {Container, Row, Column} from 'react-bootstrap'
import ConstTextCard from './ConstTextCard';

function ConstTextList({constText, user, showLangChoice, setShowLangChoice}) {
    return(
        <>
        <Container>
            {constText.map((text) => {
            return <ConstTextCard key={text.id} title={text.title} content={text.text} user={user} showLangChoice={showLangChoice} setShowLangChoice={setShowLangChoice} />
        })}
        </Container>
        </>
    )
}

export default ConstTextList