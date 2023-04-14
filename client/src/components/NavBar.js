import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import React from 'react'
import LoginForm from './LoginForm'

function NavBar({user, setUser}) {
   
    function handleLogout () {
        fetch('/api/logout', {
            method: 'POST'
        })

        setUser('')
    }

    return (
        <>
        <Navbar bg="light" variant="light">
         <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
             </Nav>
            {user.name ? <Navbar.Text>Welcome, {user.name}!</Navbar.Text> : <LoginForm setUser={setUser}/>}
            {user.name ? <button onClick={handleLogout}>Logout</button> : null}
         </Container>
      </Navbar>
        </>
    )
}

export default NavBar