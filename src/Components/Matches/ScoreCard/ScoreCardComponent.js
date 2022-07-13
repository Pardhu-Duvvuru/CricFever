import React, { useEffect, useState } from 'react';
import { Row, Col, Tabs, Tab, Table } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import "./ScoreCard.scss";
import { API_ENDPOINT, API_KEY, MACTCHE_SCORECARD } from "../../../Common/Constants/Constants";


function ScoreCardComponent(props) {
    const params = useParams();


    // const sampleData = {
    //     "apikey": "37be7389-ad00-4ee9-a260-b1180d227dbe",
    //     "data": {
    //         "id": "0925d817-584a-40cf-a164-f59463622acf",
    //         "name": "England vs India, 1st ODI",
    //         "matchType": "odi",
    //         "status": "India won by 10 wkts",
    //         "venue": "Kennington Oval, London",
    //         "date": "2022-07-12",
    //         "dateTimeGMT": "2022-07-12T10:00:00",
    //         "teams": [
    //             "England",
    //             "India"
    //         ],
    //         "teamInfo": [
    //             {
    //                 "name": "England",
    //                 "shortname": "ENG",
    //                 "img": "https://cdorgapi.b-cdn.net/img/teams/23-637877072894080569.webp"
    //             },
    //             {
    //                 "name": "India",
    //                 "shortname": "IND",
    //                 "img": "https://cdorgapi.b-cdn.net/img/teams/31-637877061080567215.webp"
    //             }
    //         ],
    //         "score": [
    //             {
    //                 "r": 110,
    //                 "w": 10,
    //                 "o": 25.2,
    //                 "inning": "England Inning 1"
    //             },
    //             {
    //                 "r": 114,
    //                 "w": 0,
    //                 "o": 18.4,
    //                 "inning": "India Inning 1"
    //             }
    //         ],
    //         "tossWinner": "India",
    //         "tossChoice": "bowl",
    //         "matchWinner": "India",
    //         "series_id": "88650923-87d7-4cf4-9032-1b7b71f1027a",
    //         "scorecard": [
    //             {
    //                 "batting": [
    //                     {
    //                         "batsman": {
    //                             "id": "2a2c430b-c0dc-4154-a63f-32ffe8ef02fb",
    //                             "name": "Jason Roy"
    //                         },
    //                         "dismissal": "bowled",
    //                         "bowler": {
    //                             "id": "6602d875-cf56-46a3-866c-de80aaa006bc",
    //                             "name": "Jasprit Bumrah",
    //                             "altnames": [
    //                                 "bumrah"
    //                             ]
    //                         },
    //                         "dismissal-text": "b Bumrah     ?",
    //                         "r": 0,
    //                         "b": 5,
    //                         "4s": 0,
    //                         "6s": 0,
    //                         "sr": 0
    //                     },
    //                     {
    //                         "batsman": {
    //                             "id": "715107b5-0412-452b-aa0b-04394f7b1327",
    //                             "name": "Jonny Bairstow"
    //                         },
    //                         "dismissal": "catch",
    //                         "bowler": {
    //                             "id": "6602d875-cf56-46a3-866c-de80aaa006bc",
    //                             "name": "Jasprit Bumrah",
    //                             "altnames": [
    //                                 "bumrah"
    //                             ]
    //                         },
    //                         "catcher": {
    //                             "id": "a52b2d20-7c98-4238-9ba4-ec78419a5cc2",
    //                             "name": "Rishabh Pant"
    //                         },
    //                         "dismissal-text": "c Pant b Bumrah     ?",
    //                         "r": 7,
    //                         "b": 20,
    //                         "4s": 1,
    //                         "6s": 0,
    //                         "sr": 35
    //                     },
    //                     {
    //                         "batsman": {
    //                             "id": "1ee41e9e-e219-4df2-9861-2360b28bb307",
    //                             "name": "Joe Root",
    //                             "altnames": [
    //                                 "root"
    //                             ]
    //                         },
    //                         "dismissal": "catch",
    //                         "bowler": {
    //                             "id": "6602d875-cf56-46a3-866c-de80aaa006bc",
    //                             "name": "Jasprit Bumrah",
    //                             "altnames": [
    //                                 "bumrah"
    //                             ]
    //                         },
    //                         "catcher": {
    //                             "id": "a52b2d20-7c98-4238-9ba4-ec78419a5cc2",
    //                             "name": "Rishabh Pant"
    //                         },
    //                         "dismissal-text": "c Pant b Bumrah     ?",
    //                         "r": 0,
    //                         "b": 2,
    //                         "4s": 0,
    //                         "6s": 0,
    //                         "sr": 0
    //                     },
    //                     {
    //                         "batsman": {
    //                             "id": "fc09ce60-e7e4-44e5-9a53-67a617560161",
    //                             "name": "Ben Stokes"
    //                         },
    //                         "dismissal": "catch",
    //                         "bowler": {
    //                             "id": "11d06633-aa20-469c-8fbb-676a1ae33eed",
    //                             "name": "Mohammed Shami"
    //                         },
    //                         "catcher": {
    //                             "id": "a52b2d20-7c98-4238-9ba4-ec78419a5cc2",
    //                             "name": "Rishabh Pant"
    //                         },
    //                         "dismissal-text": "c Pant b Shami     ?",
    //                         "r": 0,
    //                         "b": 1,
    //                         "4s": 0,
    //                         "6s": 0,
    //                         "sr": 0
    //                     },
    //                     {
    //                         "batsman": {
    //                             "id": "7567e305-1b40-4eee-9290-e2fcb8804496",
    //                             "name": "Jos Buttler"
    //                         },
    //                         "dismissal": "catch",
    //                         "bowler": {
    //                             "id": "11d06633-aa20-469c-8fbb-676a1ae33eed",
    //                             "name": "Mohammed Shami"
    //                         },
    //                         "catcher": {
    //                             "id": "8c579447-bfbd-4cf6-a283-db4dc1d5ac33",
    //                             "name": "Suryakumar Yadav"
    //                         },
    //                         "dismissal-text": "c Suryakumar Yadav b Shami     ?",
    //                         "r": 30,
    //                         "b": 32,
    //                         "4s": 6,
    //                         "6s": 0,
    //                         "sr": 93.75
    //                     },
    //                     {
    //                         "batsman": {
    //                             "id": "d1c0a448-6ee6-473a-90a2-e6a486698a8a",
    //                             "name": "Liam Livingstone"
    //                         },
    //                         "dismissal": "bowled",
    //                         "bowler": {
    //                             "id": "6602d875-cf56-46a3-866c-de80aaa006bc",
    //                             "name": "Jasprit Bumrah",
    //                             "altnames": [
    //                                 "bumrah"
    //                             ]
    //                         },
    //                         "dismissal-text": "b Bumrah     ?",
    //                         "r": 0,
    //                         "b": 8,
    //                         "4s": 0,
    //                         "6s": 0,
    //                         "sr": 0
    //                     },
    //                     {
    //                         "batsman": {
    //                             "id": "9f06f450-c300-4b49-9359-7876f492f686",
    //                             "name": "Moeen Ali"
    //                         },
    //                         "dismissal": "cb",
    //                         "bowler": {
    //                             "id": "99eb6b5c-379f-46da-bab7-dc8fd31ba435",
    //                             "name": "Prasidh Krishna"
    //                         },
    //                         "dismissal-text": "c and b Prasidh     ?",
    //                         "r": 14,
    //                         "b": 18,
    //                         "4s": 2,
    //                         "6s": 0,
    //                         "sr": 77.78
    //                     },
    //                     {
    //                         "batsman": {
    //                             "id": "54e5a9b9-9b8d-460c-bf6e-8488f0e229f8",
    //                             "name": "David Willey"
    //                         },
    //                         "dismissal": "bowled",
    //                         "bowler": {
    //                             "id": "6602d875-cf56-46a3-866c-de80aaa006bc",
    //                             "name": "Jasprit Bumrah",
    //                             "altnames": [
    //                                 "bumrah"
    //                             ]
    //                         },
    //                         "dismissal-text": "b Bumrah",
    //                         "r": 21,
    //                         "b": 26,
    //                         "4s": 3,
    //                         "6s": 0,
    //                         "sr": 80.77
    //                     },
    //                     {
    //                         "batsman": {
    //                             "id": "df364910-9b38-41f9-8290-c2234cbbf71c",
    //                             "name": "Craig Overton"
    //                         },
    //                         "dismissal": "bowled",
    //                         "bowler": {
    //                             "id": "11d06633-aa20-469c-8fbb-676a1ae33eed",
    //                             "name": "Mohammed Shami"
    //                         },
    //                         "dismissal-text": "b Shami",
    //                         "r": 8,
    //                         "b": 7,
    //                         "4s": 2,
    //                         "6s": 0,
    //                         "sr": 114.29
    //                     },
    //                     {
    //                         "batsman": {
    //                             "id": "d50e7092-dc22-4854-84d3-e08ccba038e9",
    //                             "name": "Brydon Carse"
    //                         },
    //                         "dismissal": "bowled",
    //                         "bowler": {
    //                             "id": "6602d875-cf56-46a3-866c-de80aaa006bc",
    //                             "name": "Jasprit Bumrah",
    //                             "altnames": [
    //                                 "bumrah"
    //                             ]
    //                         },
    //                         "dismissal-text": "b Bumrah",
    //                         "r": 15,
    //                         "b": 26,
    //                         "4s": 2,
    //                         "6s": 0,
    //                         "sr": 57.69
    //                     },
    //                     {
    //                         "batsman": {
    //                             "id": "7e9dc8b1-c44c-44f1-8663-cc42bad7709b",
    //                             "name": "Reece Topley"
    //                         },
    //                         "dismissal-text": "not out",
    //                         "r": 6,
    //                         "b": 7,
    //                         "4s": 0,
    //                         "6s": 1,
    //                         "sr": 85.71
    //                     }
    //                 ],
    //                 "bowling": [
    //                     {
    //                         "bowler": {
    //                             "id": "11d06633-aa20-469c-8fbb-676a1ae33eed",
    //                             "name": "Mohammed Shami"
    //                         },
    //                         "o": 7,
    //                         "m": 0,
    //                         "r": 31,
    //                         "w": 3,
    //                         "nb": 0,
    //                         "wd": 1,
    //                         "eco": 4.4
    //                     },
    //                     {
    //                         "bowler": {
    //                             "id": "6602d875-cf56-46a3-866c-de80aaa006bc",
    //                             "name": "Jasprit Bumrah",
    //                             "altnames": [
    //                                 "bumrah"
    //                             ]
    //                         },
    //                         "o": 7.2,
    //                         "m": 3,
    //                         "r": 19,
    //                         "w": 6,
    //                         "nb": 0,
    //                         "wd": 6,
    //                         "eco": 2.6
    //                     },
    //                     {
    //                         "bowler": {
    //                             "id": "a90b2371-5c53-4c29-a382-9b52d40a7548",
    //                             "name": "Hardik Pandya"
    //                         },
    //                         "o": 4,
    //                         "m": 0,
    //                         "r": 22,
    //                         "w": 0,
    //                         "nb": 0,
    //                         "wd": 0,
    //                         "eco": 5.5
    //                     },
    //                     {
    //                         "bowler": {
    //                             "id": "99eb6b5c-379f-46da-bab7-dc8fd31ba435",
    //                             "name": "Prasidh Krishna"
    //                         },
    //                         "o": 5,
    //                         "m": 0,
    //                         "r": 26,
    //                         "w": 1,
    //                         "nb": 0,
    //                         "wd": 0,
    //                         "eco": 5.2
    //                     },
    //                     {
    //                         "bowler": {
    //                             "id": "0d704a13-518a-40a7-bb93-0fc0d92af9e2",
    //                             "name": "Yuzvendra Chahal"
    //                         },
    //                         "o": 2,
    //                         "m": 0,
    //                         "r": 10,
    //                         "w": 0,
    //                         "nb": 0,
    //                         "wd": 0,
    //                         "eco": 5
    //                     }
    //                 ],
    //                 "catching": [
    //                     {
    //                         "stumped": 0,
    //                         "runout": 0,
    //                         "catch": 3,
    //                         "catcher": {
    //                             "id": "a52b2d20-7c98-4238-9ba4-ec78419a5cc2",
    //                             "name": "Rishabh Pant"
    //                         }
    //                     },
    //                     {
    //                         "stumped": 0,
    //                         "runout": 0,
    //                         "catch": 1,
    //                         "catcher": {
    //                             "id": "8c579447-bfbd-4cf6-a283-db4dc1d5ac33",
    //                             "name": "Suryakumar Yadav"
    //                         }
    //                     }
    //                 ],
    //                 "extras": {
    //                     "r": 9,
    //                     "b": 0,
    //                     "lb": 2,
    //                     "w": 7,
    //                     "nb": 0,
    //                     "p": 0
    //                 },
    //                 "totals": {
    //                     "R": 110,
    //                     "O": 25.2,
    //                     "W": 10,
    //                     "RR": 4.34
    //                 },
    //                 "inning": "England Inning 1"
    //             },
    //             {
    //                 "batting": [
    //                     {
    //                         "batsman": {
    //                             "id": "03bda674-3916-4d64-952e-00a6c19c01e1",
    //                             "name": "Rohit Sharma",
    //                             "altnames": [
    //                                 "Rohit Gurunath Sharma",
    //                                 "RG Sharma"
    //                             ]
    //                         },
    //                         "dismissal-text": "not out",
    //                         "r": 76,
    //                         "b": 58,
    //                         "4s": 6,
    //                         "6s": 5,
    //                         "sr": 131.03
    //                     },
    //                     {
    //                         "batsman": {
    //                             "id": "05bb5069-68d9-422d-9676-ba5656672227",
    //                             "name": "Shikhar Dhawan"
    //                         },
    //                         "dismissal-text": "not out",
    //                         "r": 31,
    //                         "b": 54,
    //                         "4s": 4,
    //                         "6s": 0,
    //                         "sr": 57.41
    //                     }
    //                 ],
    //                 "bowling": [
    //                     {
    //                         "bowler": {
    //                             "id": "54e5a9b9-9b8d-460c-bf6e-8488f0e229f8",
    //                             "name": "David Willey"
    //                         },
    //                         "o": 3,
    //                         "m": 0,
    //                         "r": 8,
    //                         "w": 0,
    //                         "nb": 0,
    //                         "wd": 0,
    //                         "eco": 2.7
    //                     },
    //                     {
    //                         "bowler": {
    //                             "id": "7e9dc8b1-c44c-44f1-8663-cc42bad7709b",
    //                             "name": "Reece Topley"
    //                         },
    //                         "o": 5,
    //                         "m": 3,
    //                         "r": 22,
    //                         "w": 0,
    //                         "nb": 0,
    //                         "wd": 1,
    //                         "eco": 4.4
    //                     },
    //                     {
    //                         "bowler": {
    //                             "id": "df364910-9b38-41f9-8290-c2234cbbf71c",
    //                             "name": "Craig Overton"
    //                         },
    //                         "o": 4,
    //                         "m": 0,
    //                         "r": 34,
    //                         "w": 0,
    //                         "nb": 0,
    //                         "wd": 3,
    //                         "eco": 8.5
    //                     },
    //                     {
    //                         "bowler": {
    //                             "id": "d50e7092-dc22-4854-84d3-e08ccba038e9",
    //                             "name": "Brydon Carse"
    //                         },
    //                         "o": 3.4,
    //                         "m": 0,
    //                         "r": 38,
    //                         "w": 0,
    //                         "nb": 0,
    //                         "wd": 1,
    //                         "eco": 10.4
    //                     },
    //                     {
    //                         "bowler": {
    //                             "id": "fc09ce60-e7e4-44e5-9a53-67a617560161",
    //                             "name": "Ben Stokes"
    //                         },
    //                         "o": 1,
    //                         "m": 0,
    //                         "r": 1,
    //                         "w": 0,
    //                         "nb": 0,
    //                         "wd": 0,
    //                         "eco": 1
    //                     },
    //                     {
    //                         "bowler": {
    //                             "id": "9f06f450-c300-4b49-9359-7876f492f686",
    //                             "name": "Moeen Ali"
    //                         },
    //                         "o": 2,
    //                         "m": 0,
    //                         "r": 9,
    //                         "w": 0,
    //                         "nb": 0,
    //                         "wd": 0,
    //                         "eco": 4.5
    //                     }
    //                 ],
    //                 "catching": [],
    //                 "extras": {
    //                     "r": 7,
    //                     "b": 0,
    //                     "lb": 2,
    //                     "w": 5,
    //                     "nb": 0,
    //                     "p": 0
    //                 },
    //                 "totals": {
    //                     "R": 114,
    //                     "O": 18.4,
    //                     "W": 0,
    //                     "RR": 6.11
    //                 },
    //                 "inning": "India Inning 1"
    //             }
    //         ]
    //     },
    //     "status": "success",
    //     "info": {
    //         "hitsToday": 67,
    //         "hitsUsed": 10,
    //         "hitsLimit": 500,
    //         "credits": 0,
    //         "server": 9,
    //         "queryTime": 23.3717,
    //         "s": 0
    //     }
    // }

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