import {Container, Row, Col, Button} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import '../Home.css'
import backgroundImage from '../images/welcome.png'
import TranscriptionCard from './TranscriptionCard'
import ReactAudioPlayer from 'react-audio-player'
import genAm from '../sounds/General_Am.mp3'
import boston from '../sounds/Boston_accent.mp3'



function Home() {
    const [testTr, setTestTr] = useState([])
    const [clicked, setClicked] =useState(false)

    useEffect(() => {
        fetch('/api/gmoney/2/tr')
        .then(resp => resp.json())
        .then(data => setTestTr(data))
    })

    function handleClick(e) {
        setClicked(!clicked)
    }



    const rowStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '1000px',
      }

    return (
        <Container style={{maxWidth: '100%'}}>
            <Row style={rowStyle}>
                {testTr.map((tr) => {
                    return (
                        <Col className='testCols'>
                            <TranscriptionCard key={tr.id} text={tr.text1} tr={tr.tr1} lang={tr.language} dialect={tr.dialect}/>
                        </Col>
                    )
                })}
            <Row>
                <Col>
                <Button className='custom-btn' onClick={handleClick}>Click for Upcoming Features!</Button>
                <br></br>
                {clicked ? <Container 
                            style={{backgroundColor: 'white',
                                    zIndex: 2,
                                    borderRadius: '10px',
                                    width: '400px',
                                    padding: '20px',
                                    marginLeft: 0,
                                    marginTop: '10px'
                                    
                                              }}>
                                <h1>Boston</h1>
                                <ReactAudioPlayer src={genAm} controls />
                                <br></br>
                                <br></br>
                                <ReactAudioPlayer src={boston} controls />
                            </Container> : null}
                </Col>
            </Row> 
            </Row>
            {/* <p>Image by <a href="https://www.freepik.com/free-vector/welcome-composition-different-languages_2581476.htm#query=welcome%20languages&position=0&from_view=search&track=ais">Freepik</a></p> */}
        </Container>
    )
}

export default Home