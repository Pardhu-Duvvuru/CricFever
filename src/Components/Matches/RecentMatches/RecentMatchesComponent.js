import React from 'react';
import { Row, Col } from 'react-bootstrap';

import "../CurrentMatches/CurrentMatches.scss";


function RecentMatchesComponent(props) {
    return (
        <div className="recent-matches">
            <Row>
                <Col xs={12} className="matches">
                    {
                        props.data.map((match) => {
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
                                        <span className='nav border-right'>Score Card</span>
                                        <span className='nav border-right'>Full Commentary</span>
                                        <span className='nav'>News</span>
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

export default RecentMatchesComponent;