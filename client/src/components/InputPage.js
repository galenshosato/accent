import {Form, Button, Card} from 'react-bootstrap'
import React from 'react';

function InputPage() {

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
                    <Form.Control type='file'/>
                </Form.Group>
                <Button variant='primary' type='submit'>
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
