import React, {useRef} from "react";
import {Modal, Form} from 'react-bootstrap'

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
         <Modal show={showSignIn} onHide={() => setShowSignIn(false)} >
            <Modal.Body>
                <Modal.Title>Create your account</Modal.Title>
                <br></br>
                <Form id='sign-in-form'>
                    <Form.Group id="signInName">
                        <Form.Control size='lg' type="text" placeholder="Name" ref={nameRef} autoFocus />
                    </Form.Group>
                    <br></br>
                    <Form.Group id="signInUserName">
                        <Form.Control size='lg' type="text" placeholder="Username" ref={usernameRef} />
                    </Form.Group>
                    <br></br>
                    <Form.Group id="signInEmail">
                        <Form.Control size='lg' type="email" placeholder="Email" ref={emailRef} />
                    </Form.Group>
                    <br></br>
                    <Form.Group id="signInPassword">
                        <Form.Control size='lg' placeholder="Password" ref={passwordRef}/>
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

export default SignInModal