import {Form, Button, Card} from 'react-bootstrap'
import React, {useState} from 'react';

function InputPage() {
    const [file, setFile] = useState(null)
    const [uploadText, setUploadText] = useState('')

    function handleFileChange(event) {
        setFile(event.target.files[0]);
      }


    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)
        console.log(file)

        fetch('/api/process_file', {
            method:'POST',
            body: formData
        })
        .then(resp => resp.text())
        .then(data => console.log(data))
    }

    return (
        <>
        <Card>
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text' placeholder='Enter title' />
                </Form.Group>
                <br></br>
                <Form.Group controlId='formFile' className='mb-3'>
                    <Form.Label>What file would you like to upload?</Form.Label>
                    <Form.Control type='file' onChange={handleFileChange}/>
                </Form.Group>
                <Button variant='primary' type='submit' onClick={handleSubmit}>
                    Upload
                </Button>
            </Form>
        </Card>
        <br></br>
        <Card>
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text' placeholder='Enter title' />
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control type='textarea' placeholder='Enter content' />
                </Form.Group>
                <br></br>
                <Button variant='primary' type='submit'>Submit</Button>
            </Form>
        </Card>
        </>
    )
}

export default InputPage
