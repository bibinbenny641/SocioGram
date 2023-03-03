import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AuthContext from '../../../context/AuthContext';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


function TopbarAdmin() {
  const navigate = useNavigate()

  let { logoutAdmin } = useContext(AuthContext)

  return (
    <>
      
      <Navbar sticky="top" bg="light" variant="light">
        <Container>
          <Link to='/admin/dashboard'>
          <Navbar.Brand style={{color:'green'}} ><strong>SocioGram Admin</strong></Navbar.Brand>
          </Link>
          <Nav className="me-auto">
          <Link to='/admin/dashboard'>
            <Navbar.Brand >Users </Navbar.Brand>

          </Link>
          <Link  to='/admin/posts'>
          <Navbar.Brand >Posts</Navbar.Brand>

          </Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            <Nav.Link className="me-2"  >

            <Button onClick={logoutAdmin} variant="outline-success">LogOut</Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default TopbarAdmin;