import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';

import "../CurrentMatches/CurrentMatches.scss";
import { API_ENDPOINT, API_KEY, UPCOMING_MACTCHES } from "../../../Common/Constants/Constants";

function UpcomingMatches() {
    const [matches, setMatches] = useState([]);
    useEffect(() => {
        axios.get(`${API_ENDPOINT}${UPCOMING_MACTCHES}${API_KEY}&offset=0`).then((res) => {
            const upcomingMatches = res.data.filter((item) => item.status === "Match not started");
            setMatches(upcomingMatches.reverse());
        })
    }, []);
    return (
        <div className="upcoming-matches">
            <Row>
                <Col xs={12} className="matches">
                    {
                        matches.map((match) => {
                            return (
                                <div key={match.id}>
                                    <div className='match-info'>
                                        <div className='header'>{match.t1} vs {match.t2}</div>
                                        <div className='body'>
                                            <div><span className='match-name'>{match.t1.split("[")?.[0]} vs {match.t2.split("[")?.[0]}</span>, <span>{match.matchType.toUpperCase()}</span></div>
                                            <div>{moment(match.dateTimeGMT).format('MMM Do')}</div>
                                            {match?.score?.length ? <div className='score-info'>
                                                <div>{match.teamInfo[0]?.shortname} &nbsp; {`${match.score?.[0]?.r}-${match.score[0]?.w}(${match.score[0]?.o})`}</div>
                                                <div>{match.teamInfo[1]?.shortname} &nbsp; {`${match.score[1]?.r}-${match.score[1]?.w}(${match.score[1]?.o})`}</div>
                                                <div className='status'>{match.status}</div>
                                            </div> : <div className='no-score'>{match.status}</div>}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Col>
            </Row>

        </div>
    )
}

export default UpcomingMatches;