import { Container, Row, Col } from 'react-bootstrap';

import './App.scss';
import HeaderComponent from './Components/Header/Header';

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col>
            <HeaderComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
