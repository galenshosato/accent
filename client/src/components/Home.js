import {Container, Row, Col, Button} from 'react-bootstrap'
import '../Home.css'
import backgroundImage from '../images/welcome.png'



function Home() {

    const rowStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '600px'
      }

    return (
        <Container style={{maxWidth: '100%'}}>
            <Row style={rowStyle}>
                <Col>
                {/* <p>Image by <a href="https://www.freepik.com/free-vector/welcome-composition-different-languages_2581476.htm#query=welcome%20languages&position=0&from_view=search&track=ais">Freepik</a></p> */}
                </Col>
            </Row>
            <Row id='row-2'>
                <Col>
                    <h1 className='mod-titles'>Hamlet</h1>
                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
                <Col>

                </Col>
                <Col>
                
                </Col>
            </Row>
            <Row>
                <Col>
                <Button className='custom-btn'>Click for Upcoming Features!</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Home