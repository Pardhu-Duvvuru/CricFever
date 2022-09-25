import React, { useEffect, useState } from 'react';
import { Row, Col, Tabs, Tab, Table } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import "./ScoreCard.scss";
import { API_ENDPOINT, API_KEY, MACTCHE_SCORECARD } from "../../../Common/Constants/Constants";


function ScoreCardComponent(props) {
    const params = useParams();


    const [matchDetails, setMatchDetails] = useState({});
    const [key, setKey] = useState('Scorecard');

    useEffect(() => {
        axios.get(`${API_ENDPOINT}${MACTCHE_SCORECARD}${API_KEY}&id=${params.id}`).then((res) => {
            setMatchDetails(res.data);
        })
    }, []);

    return (
        <div className="score-card-page">
            <Row>
                <Col xs={12}>
                    <div className="matche-info">
                        <h4>{matchDetails?.teams?.[0]} vs {matchDetails?.teams?.[1]} - Live Cricket Score</h4>
                        <Row>
                            <Col xs={3} className="info">
                                <p><b>Series:</b> {matchDetails?.teams?.[1]} tour of {matchDetails?.teams?.[0]}</p>
                            </Col>
                            <Col xs={3} className="info p-0">
                                <p><b>Venue:</b> {matchDetails?.venue}</p>
                            </Col>
                            <Col xs={3} className="info p-0">
                                <p><b>Date and Time:</b> {moment(matchDetails?.dateTimeGMT).format('LLL')}</p>
                            </Col>
                        </Row>
                    </div>
                    <div className='tab-section'>
                        <Tabs
                            id="current-match"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                        >
                            <Tab eventKey="Scorecard" title="Score Card">
                                <Row>
                                    <Col xs={8} className="matches">
                                        <p className='status'>{matchDetails.status}</p>
                                        {matchDetails?.scorecard?.map((team) => {
                                            return (
                                                <div key={team.inning}>
                                                    <div className='score-header'>
                                                        <span className='pull-left'>{team?.inning}</span>
                                                        <span className='pull-right'>{`${team?.totals.R}-${team?.totals.W}(${team?.totals.O})`}</span>
                                                    </div>
                                                    <div className='batting-info'>
                                                        <Table>
                                                            <thead className='table-header'>
                                                                <tr>
                                                                    <th>Batter</th>
                                                                    <th>Wicket</th>
                                                                    <th>R</th>
                                                                    <th>B</th>
                                                                    <th>4s</th>
                                                                    <th>6s</th>
                                                                    <th>SR</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {team.batting.map((player) => {
                                                                    return (
                                                                        <tr key={player?.batsman?.id}>
                                                                            <td className='player-name'>{player?.batsman?.name}</td>
                                                                            <td>{player?.["dismissal-text"].replace('?', "")}</td>
                                                                            <td>{player?.r}</td>
                                                                            <td>{player?.b}</td>
                                                                            <td>{player?.['4s']}</td>
                                                                            <td>{player?.['6s']}</td>
                                                                            <td>{player?.sr}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                                }
                                                                <tr>
                                                                    <td>Extras</td>
                                                                    <td></td>
                                                                    <td>{team?.extras?.r}</td>
                                                                    <td>({team?.extras?.b} b,</td>
                                                                    <td>{team?.extras?.lb} lb,</td>
                                                                    <td>{team?.extras?.nb} nb,</td>
                                                                    <td>{team?.extras?.w} wd)</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Total</td>
                                                                    <td></td>
                                                                    <td>{team?.totals.R}-{team?.totals.W}</td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                    <div className='bowling-info'>
                                                        <Table>
                                                            <thead>
                                                                <tr>
                                                                    <th>Bowler</th>
                                                                    <th>O</th>
                                                                    <th>M</th>
                                                                    <th>R</th>
                                                                    <th>W</th>
                                                                    <th>NB</th>
                                                                    <th>WD</th>
                                                                    <th>ECO</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {team.bowling.map((bowler) => {
                                                                    return (
                                                                        <tr key={bowler?.bowler?.id}>
                                                                            <td className='player-name'>{bowler?.bowler?.name}</td>
                                                                            <td>{bowler?.o}</td>
                                                                            <td>{bowler?.m}</td>
                                                                            <td>{bowler?.r}</td>
                                                                            <td>{bowler?.w}</td>
                                                                            <td>{bowler?.nb}</td>
                                                                            <td>{bowler?.wd}</td>
                                                                            <td>{bowler?.eco}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                                }
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        }
                                    </Col>
                                    <Col xs={4}>Videos</Col>
                                </Row>
                            </Tab>
                            <Tab eventKey="matchFacts" title="Match Facts">
                                <Row>
                                    <Col xs={8} className="matches match-facts">
                                        <div className='score-header'>
                                            <span className='pull-left'>Match Info</span>
                                        </div>
                                        <div className='match-info'>
                                            <Table>
                                                <tbody>
                                                    <tr>
                                                        <td className='title'><b>Match: </b></td>
                                                        <td>{matchDetails?.name}, {matchDetails?.teams?.[1]} tour of {matchDetails?.teams?.[0]}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='title'><b>Date: </b></td>
                                                        <td>{moment(matchDetails?.dateTimeGMT).format('LLLL')}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='title'><b>Toss: </b></td>
                                                        <td>{matchDetails?.tossWinner} Won the toss and opt to {matchDetails?.tossChoice}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='title'><b>Venue: </b></td>
                                                        <td>{matchDetails?.venue}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='title'><b>Squad: </b></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td className='title'><b>Playing: </b></td>
                                                        <td>{matchDetails?.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='title'><b>Squad: </b></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td className='title'><b>Playing: </b></td>
                                                        <td>{matchDetails?.name}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Col>
                                    <Col xs={4}>Videos</Col>
                                </Row>
                            </Tab>
                        </Tabs>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ScoreCardComponent;