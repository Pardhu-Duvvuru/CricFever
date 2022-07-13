import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import axios from "axios";

import "./ScoreCard.scss";
import { API_ENDPOINT, API_KEY, MACTCHE_SCORECARD } from "../../../Common/Constants/Constants";


function ScoreCardComponent(props) {
    const params = useParams();

    const [matchDetails, setMatchDetails] = useState({});
    console.log(params)
    useEffect(() => {
        axios.get(`${API_ENDPOINT}${MACTCHE_SCORECARD}${API_KEY}&id=${params.id}`).then((res) => {
            console.log(res);
            setMatchDetails(res.data);
        })
    }, [])
    return (
        <div className="score-card">
            <Row>
                <Col xs={12} className="matches">
                    Score Card
                </Col>
            </Row>
        </div>
    )
    }

export default ScoreCardComponent;