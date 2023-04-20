import {useState} from "react";
import {Modal, Form, Button} from 'react-bootstrap'
import SignInModal from "./SignInModal";
import { useNavigate } from "react-router-dom";
import logo from "../images/Accent_logo_small.png"

function LoginForm({setUser, user}) {
    const [showLogin, setShowLogin] = useState(false)
    const [showSignIn, setShowSignIn] = useState(false)
    const navigate = useNavigate()

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
        .then(() => navigate('/user'))
        
        setShowLogin(false)
        
        
    }
    
    function handleClick (e) {
        setShowLogin(false)
        setShowSignIn(true)
    }


    return (
        <>
        <button id='login' onClick={() => setShowLogin(true)}>Login/Sign Up</button>
        <Modal centered show={showLogin} onHide={() => setShowLogin(false)}>
            <Modal.Header>
                <img class='modalLogo' src={logo} alt="logo"/>
            </Modal.Header>
            <Modal.Body>
                <Form id='login-form'>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder="Enter Email" autoFocus/>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder="Enter Password" />
                    </Form.Group>
                </Form>
                <br></br>
                <div>
                    <span>
                        Don't have an account? <span className='pointer' onClick={handleClick}>Sign Up!</span>
                    </span>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <a href={`/user`}>
                <Button className="custom-btn" onClick={handleSubmit}>Login!</Button>
                </a>
            </Modal.Footer>
        </Modal>
        {showSignIn ? <SignInModal showSignIn={showSignIn} setShowSignIn={setShowSignIn} setUser={setUser} /> : null}
        </>
    )
}

export default LoginForm