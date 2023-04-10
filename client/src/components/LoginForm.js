import {useState} from "react";
import {Modal, Button, Form} from 'react-bootstrap'

function LoginForm({setUser}) {
    const [showLogin, setShowLogin] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        const email = document.getElementById('formBasicEmail').value
        const password = document.getElementById('formBasicPassword').value
        const data ={
            email:email,
            password:password
        }

        fetch('/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(data => setUser(data))

        setShowLogin(false)
        
    }


    return (
        <>
        <button onClick={() => setShowLogin(true)}>Login</button>
        <Modal centered show={showLogin} onHide={() => setShowLogin(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id='login-form'>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder="Enter Email" />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder="Enter Password" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleSubmit}>Submit</button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default LoginForm