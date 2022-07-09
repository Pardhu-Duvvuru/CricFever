import React, { Suspense, lazy } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';

import './App.scss';

const HeaderComponent = lazy(() => import('./Components/Header/Header'));
const MatchesHeaderComponent = lazy(() => import('./Components/MatchesHeader/MatchesHeader'));
const MatchesComponent = lazy(()=> import('./Components/Matches/MatchesComponent'))

function App() {
  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <Container fluid>
          <Row>
            <Col xs={{span: 10, offset: 1}}>
              <HeaderComponent />
              <MatchesHeaderComponent />
              <div className='main-body'>
                <Router>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                      <Route path="/" element={<Navigate replace to='/cric-scores'/>}/>
                      <Route path="/cric-scores" element={<MatchesComponent />} />
                    </Routes>
                  </Suspense>
                </Router>
              </div>
            </Col>
          </Row>
        </Container>
      </Suspense>
    </div>
  );
}

export default App;
