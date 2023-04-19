import React from "react";
import {Container, Row, Column} from 'react-bootstrap'
import ConstTextCard from './ConstTextCard';

function ConstTextList({constText, user}) {
    

    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
        <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '30px' }} >
            {constText.map((text) => {
            return <ConstTextCard key={text.id} title={text.title} content={text.text} user={user} />
        })}
        </Container>
        </div>
    )
}

export default ConstTextList