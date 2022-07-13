import React, { useState, useEffect, lazy } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import axios from "axios";
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import "./CurrentMatches.scss";
import { API_ENDPOINT, API_KEY, CURRENT_MACTCHES } from "../../../Common/Constants/Constants";

const UpcomingMatches = lazy(() => import("../UpcomingMatches/UpcomingMatches"));
const RecentMatchesComponent = lazy(() => import("../RecentMatches/RecentMatchesComponent"));

function CurrentMatches() {
    const [key, setKey] = useState('current');
    const [matches, setMatches] = useState([]);
    const [recentMatches, setRecentMatches] = useState([]);

    const Navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_ENDPOINT}${CURRENT_MACTCHES}${API_KEY}&offset=0`).then((res) => {
            let data = [];
            let recentMatches = [];
            res.data.forEach((mat) => {
                if (mat?.status?.toLowerCase()?.includes('won')) {
                    recentMatches.push(mat);
                } else {
                    data.push(mat);
                }
            })
            setRecentMatches(recentMatches);
            setMatches(data);
        })
    }, []);

    const goToScoreCard = (match) => {
        Navigate(`/match-score/${match.id}`);
    }

    return (
        <div className="current-matches">
            <h4 className='title'>Live Cricket Scores</h4>
            <div className='current-matche-tabs'>
                <Tabs
                    id="current-match"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="current" title="Live">
                        <Row>
                            <Col xs={8} className="matches">
                                {
                                    matches.map((match) => {
                                        let nameArr = match.name.split(",");
                                        return (
                                            <div key={match.id}>
                                                <div className='match-info'>
                                                    <div className='header'>{match.teams[0]} vs {match.teams[1]}</div>
                                                    <div className='body'>
                                                        <div><span className='match-name'>{nameArr[0]}</span>,<span>{nameArr[1]}</span></div>
                                                        <div>{match.date} . {match.venue}</div>
                                                        {match.score.length ? <div className='score-info'>
                                                            <div>{match.teamInfo[0]?.shortname} &nbsp; {`${match.score?.[0]?.r}-${match.score[0]?.w}(${match.score[0]?.o})`}</div>
                                                            <div>{match.teamInfo[1]?.shortname} &nbsp; {`${match.score[1]?.r}-${match.score[1]?.w}(${match.score[1]?.o})`}</div>
                                                            <div className='status'>{match.status}</div>
                                                        </div> : <div className='no-score'>{match.status}</div>}
                                                    </div>
                                                </div>
                                                <div className='match-nav'>
                                                    <span className='nav border-right'>Live Score</span>
                                                    <span className='nav border-right' onClick={()=>goToScoreCard(match)}>Score Card</span>
                                                    <span className='nav border-right'>Full Commentary</span>
                                                    <span className='nav'>News</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Col>
                            <Col xs={4}>Videos</Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="recent" title="Recent">
                        <Row>
                            <Col xs={8} className="matches">
                                <RecentMatchesComponent data={recentMatches} />
                            </Col>
                            <Col xs={4}>Videos</Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="upcoming" title="Upcoming">
                        <Row>
                            <Col xs={8} className="matches">
                                <UpcomingMatches />
                            </Col>
                            <Col xs={4}>Videos</Col>
                        </Row>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default CurrentMatches;