import {Form, Button, Modal} from 'react-bootstrap'
import React, {useRef} from 'react';

function InputModal({showInput, setShowInput, setTitle, setUploadText, setShowLangChoice}) {

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
    
    return (
        <>
        <Modal show={showInput} onHide={() => setShowInput(false)} >
            <Modal.Body>
                <Modal.Title>Create New Text</Modal.Title>
                <br></br>
                <Form>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Title' autoFocus ref={titleRef}/>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Enter Your Text</Form.Label>
                        <Form.Control type='textarea' placeholder='Text' ref={textRef} />
                    </Form.Group>
                    <br></br>
                    <Button variant='primary' onClick={handleClick}>Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default InputModal
