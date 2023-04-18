import React, {useState, useRef} from "react";
import { Modal, Form, Button } from "react-bootstrap";
import logo from "../images/Accent_logo_small.png"
import InputModal from "./InputModal";

function AddFileModal({showAddFile, setShowAddFile, setTitle, setUploadText, setShowLangChoice, showInput, setShowInput}) {
    const [file, setFile] = useState(null)
    const titleRef = useRef(null)

    function handleFileChange(event) {
        setFile(event.target.files[0]);
      }


    function handleSubmit(e) {
        e.preventDefault()
        const newTitle = titleRef.current.value
        setTitle(newTitle)
        const formData = new FormData()
        formData.append('file', file)

        fetch('/api/process_file', {
            method:'POST',
            body: formData
        })
        .then(resp => resp.text())
        .then(data => setUploadText(data))

        setShowAddFile(false)
        setShowLangChoice(true)
    }

    function handleClick(e) {
        setShowAddFile(false)
        setShowInput(true)
    }
    
    
    return (
        <>
        <Modal show={showAddFile} onHide={() => setShowAddFile(false)} >
            <Modal.Body>
                <img class='modalLogo' src={logo} alt="logo"/>
                <Modal.Title>New Text</Modal.Title>
                <br></br>
                <Form>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Title' autoFocus ref={titleRef}/>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId='formFile' className='mb-3'>
                        <Form.Label>What file would you like to upload?</Form.Label>
                        <Form.Control type='file' onChange={handleFileChange}/>
                    </Form.Group>
                </Form>
                <br></br>
                <span>
                    Input your own text? <span onClick={handleClick}>Click here!</span>
                </span>
                <br></br>
              <Button variant='primary' onClick={handleSubmit} size="lg">
                        Upload
                    </Button>  
            </Modal.Body>
        </Modal>
        <InputModal showInput={showInput} setShowInput={setShowInput} setTitle={setTitle} setUploadText={setUploadText} setShowLangChoice={setShowLangChoice} />
        </>
    )
}

export default AddFileModal