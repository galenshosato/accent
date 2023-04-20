import {Form, Button, Modal} from 'react-bootstrap'
import React, {useRef} from 'react';
import logo from "../images/Accent_logo_small.png"

function InputModal({showInput, setShowInput, setTitle, setUploadText, setShowLangChoice, setShowAddFile}) {

    const titleRef = useRef(null)
    const textRef = useRef(null)

    function handleClick(e) {
        const title = titleRef.current.value
        const content = textRef.current.value

        setTitle(title)
        setUploadText(content)
        setShowInput(false)
        setShowLangChoice(true)

    }

    function handleChange(e) {
        setShowInput(false)
        setShowAddFile(true)
        
    }
    
    return (
        <>
        <Modal show={showInput} onHide={() => setShowInput(false)} >
            <Modal.Header>
                <img class='modalLogo' src={logo} alt="logo"/>
            </Modal.Header>
            <Modal.Body >
                <Modal.Title className='mod-titles'>Create New Text</Modal.Title>
                <br></br>
                <Form>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' placeholder='Enter title' autoFocus ref={titleRef}/>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Custom Text</Form.Label>
                        <Form.Control type='textarea' placeholder='Enter your text' ref={textRef} />
                    </Form.Group>
                    <br></br>
                    <span className='my-span'>
                        Upload a file? <span className='pointer' onClick={handleChange}>Click here!</span>
                    </span>
                    <br></br>
                    <Button className='custom-btn' onClick={handleClick}>Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default InputModal
