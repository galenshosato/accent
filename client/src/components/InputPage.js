import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import React from 'react';

function FileInput() {
    return (
        <>
        <Form>
            <Form.Group controlId='formFile' className='mb-3'>
                <Form.Label>What file would you like to upload?</Form.Label>
                <Form.Control type='file' />
            </Form.Group>
            <Button variant='primary' type='submit'>
                Submit
            </Button>
        </Form>
        </>
    )
}

export default FileInput
