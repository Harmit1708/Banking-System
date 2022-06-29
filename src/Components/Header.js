import React from 'react'
import { Nav, Navbar} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
function Header() {

  let navigate = useNavigate()

  return (
    <Navbar bg="dark" expand="lg" className='px-3'>
        <Navbar.Brand onClick={()=> {navigate('/')}} className='text-light'  style={{cursor:"pointer"}}>Banking System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={()=> {navigate('/')}} className='text-light'  style={{cursor:"pointer"}}>Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header