import Navbar from 'react-bootstrap/Navbar'
import { Nav, Container } from 'react-bootstrap';
import { Link, BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { Home } from './Components/Home';
import { Login } from './Components/Login';
import { Register } from './Components/Register';

function App() {
  const user = localStorage.getItem('token');
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">StackRoot</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
              </Nav>
              {user ?
                <Nav>
                  <Nav.Link as={Link} to="/signout" onClick={() =>{
                        localStorage.clear();
                        window.location.reload();
                  }}>SignOut</Nav.Link>
                </Nav> :
                <Nav>
                  <Nav.Link as={Link} to="/signin">SignIn</Nav.Link>
                  <Nav.Link as={Link} to="/signup">SignUp</Nav.Link>
                </Nav>}

            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<Login />} />
            <Route path='/signup' element={<Register />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
