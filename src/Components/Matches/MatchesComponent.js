import React, { useState, lazy } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import CurrentMatches from "./CurrentMatches/CurrentMatchesComponent";
import "./MatchesComponent.scss";
const TeamsListComponent = lazy(()=>import("./TeamsList/TeamsListComponent"));

function MatchesComponent() {
    const [key, setKey] = useState('current');

    return (
        <div className='matches-page'>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="current" title="Current Matches">
                    <CurrentMatches />
                </Tab>
                {/* <Tab eventKey="future" title="Current & Future Series">
                    Current & Future Series
                </Tab> */}
                <Tab eventKey="teams" title="Teams">
                    <TeamsListComponent />
                </Tab>
            </Tabs>
        </div>
    );
}

export default MatchesComponent;