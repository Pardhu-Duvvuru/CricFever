import React, { Suspense, lazy } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './App.scss';

const HeaderComponent = lazy(() => import('./Components/Header/Header'));
const MatchesHeaderComponent = lazy(() => import('./Components/MatchesHeader/MatchesHeader'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Container fluid>
          <Row>
            <Col>
              <HeaderComponent />
              <MatchesHeaderComponent />
            </Col>
          </Row>
        </Container>
      </Suspense>
    </div>
  );
}

export default App;
