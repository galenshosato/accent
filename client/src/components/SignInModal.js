import React, {useRef} from "react";
import {Modal, Form, Button} from 'react-bootstrap'
import logo from "../images/Accent_logo_small.png"

function SignInModal({showSignIn, setShowSignIn, setUser}) {
    const nameRef = useRef(null)
    const usernameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    function handleSubmit(e) {
        e.preventDefault()
        const name = nameRef.current.value
        const username = usernameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value

        const newUser = {
            name: name,
            username: username,
            email: email,
            password: password
        }

        fetch('/api/users', {
            method:'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(resp => resp.json())
        .then(data => setUser(data))

        setShowSignIn(false)
    }

    return(
        <>
         <Modal centered show={showSignIn} onHide={() => setShowSignIn(false)} >
            <Modal.Header>
                <img class='modalLogo' src={logo} alt="logo"/>
            </Modal.Header>
            <Modal.Body>
                <Modal.Title className="mod-titles">Create your account</Modal.Title>
                <br></br>
                <Form id='sign-in-form'>
                    <Form.Group id="signInName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control size='md' type="text" placeholder="Enter name" ref={nameRef} autoFocus />
                    </Form.Group>
                    <br></br>
                    <Form.Group id="signInUserName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control size='md' type="text" placeholder="Enter username" ref={usernameRef} />
                    </Form.Group>
                    <br></br>
                    <Form.Group id="signInEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control size='md' type="email" placeholder="Enter email" ref={emailRef} />
                    </Form.Group>
                    <br></br>
                    <Form.Group id="signInPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control size='md' placeholder="Enter password" ref={passwordRef}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="custom-btn" onClick={handleSubmit}>Sign Up!</Button>
            </Modal.Footer>
         </Modal>
        </>
    )
}

export default SignInModal