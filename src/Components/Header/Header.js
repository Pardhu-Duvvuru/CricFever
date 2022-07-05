import { Container, Navbar, Nav } from 'react-bootstrap';
import { BsPersonCircle } from "react-icons/bs";

import "./Header.scss";

function HeaderComponent() {
    return (
        <div className='app-header'>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>CricFever</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>Live Score</Nav.Link>
                            <Nav.Link>Schedule</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link className='user-icon'><BsPersonCircle /></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default HeaderComponent;