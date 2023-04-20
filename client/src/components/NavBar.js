import React from 'react'
import LoginForm from './LoginForm'
import logo from "../images/Accent_logo_small.png"
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../Navbar.css'

function NavBar({user, setUser}) {
    const navigate = useNavigate()
   
    function handleLogout () {
        fetch('/api/logout', {
            method: 'POST'
        })

        setUser('')
        navigate('/examples')
    }

    return (
        <>
        <Navbar className='Navbar'>
         <Container fluid style={{maxWidth: "1600px"}}>
            <Navbar.Brand href="/" ><img id='Navlogo' src={logo} alt='logo' /></Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link id="texts" href='/user'>Texts</Nav.Link>
                <Nav.Link id="exampleLink" href='/examples'>Examples</Nav.Link>
             </Nav>
             <Nav> 
            {user.name ? <><Navbar.Text id='welcome'>Welcome, {user.name}!</Navbar.Text></> : <LoginForm setUser={setUser} user={user}/>}
            {user.name ? <button id='logout' onClick={handleLogout}>Logout</button> : null}
             </Nav>
         </Container>
      </Navbar>
        </>
    )
}

export default NavBar