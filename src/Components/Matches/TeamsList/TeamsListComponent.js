import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Row, Col, Table } from 'react-bootstrap';

import { API_ENDPOINT, API_KEY, COUNTRIES } from "../../../Common/Constants/Constants";
import './TeamsList.scss';

function TeamsListComponent() {
    const [teamsList, setTeamsList] = useState([]);
    useEffect(() => {
        axios.get(`${API_ENDPOINT}${COUNTRIES}${API_KEY}&offset=0`).then((res) => {
            setTeamsList(res.data);
        })
    }, []);
    return (
        <div className="teams-list">
            <h4 className='title'>Cricket Teams</h4>
            <Row>
                <Col xs={8} className="teams">
                    <Table>
                        <tbody>
                            {
                                teamsList.map((team) => {
                                    return (
                                        <tr key={team.id}>
                                             <td className='team-info'>
                                                <img className='team-img' src={team.genericFlag} />{team.name}
                                            </td>
                                        </tr>)
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
                <Col xs={4} className="news">
                    Latest News
                </Col>
            </Row>

        </div>
    )
}

export default TeamsListComponent;