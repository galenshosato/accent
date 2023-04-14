import React from "react";
import {Modal, Form} from 'react-bootstrap'

function SignInModal({showSignIn, setShowSignIn}) {
    return(
        <>
         <Modal >
            <Modal.Header>
                <Modal.Title>Welcome to Accent!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id='sign-in-form'>
                    <Form.Group controlId="signInName">
                        <Form.Label>What is your name?</Form.Label>
                        <Form.Control type="name" placeholder="Name" autoFocus />
                    </Form.Group>
                    <Form.Group controlId="signInUserName">
                        <Form.Label>Create a username</Form.Label>
                        <Form.Control type="username" placeholder="Username" />
                    </Form.Group>
                    <Form.Group controlId="signInEmail">
                        <Form.Label>Enter a valid email</Form.Label>
                        <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group controlId="signInPassword">
                        <Form.Label>Create a password</Form.Label>
                        <Form.Control placeholder="Password"/>
                    </Form.Group>
                </Form>
            </Modal.Body>
         </Modal>
        </>
    )
}

export default SignInModal