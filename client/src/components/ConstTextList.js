import React from "react";
import {Container, Row, Column, Card} from 'react-bootstrap'
import ConstTextCard from './ConstTextCard';

function ConstTextList({constText, user}) {
    return(
        <>
        <Container>
            {constText.map((text) => {
            return <ConstTextCard key={text.id} title={text.title} content={text.text} user={user} />
        })}
        </Container>
        </>
    )
}

export default ConstTextList