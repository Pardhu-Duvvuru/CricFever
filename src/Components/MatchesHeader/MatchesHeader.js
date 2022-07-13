import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./MatchesHeader.scss";
import { API_ENDPOINT, API_KEY, CURRENT_MACTCHES } from "../../Common/Constants/Constants";

function MatchesHeaderComponent() {
    const [matches, setMatches] = useState([]);
    const Navigate = useNavigate();

    useEffect(()=> {
        axios.get(`${API_ENDPOINT}${CURRENT_MACTCHES}${API_KEY}&offset=0`).then((res) => {
            let data = res.data;
            setMatches(data.slice(0, 5));
        })
    }, []);

    const navigateToHome = () => {
        Navigate('/')
    }

    const goToScoreCard = (match) => {
        Navigate(`/match-score/${match.id}`);
    }

    return (
        <div className='matches-header'>
            <Navbar>
                <Container>
                    <Navbar.Brand onClick={navigateToHome} className="title">Matches</Navbar.Brand>
                    <Nav className="me-auto">
                        {
                            matches.map((match) => {
                                return (
                                    <Nav.Link className="text-overflow" key={match.id} title={`${match?.teamInfo?.[0]?.shortname} vs ${match?.teamInfo?.[1]?.shortname} - ${match?.status}`} onClick={()=>goToScoreCard(match)}>{`${match?.teamInfo?.[0]?.shortname} vs ${match?.teamInfo?.[1]?.shortname} - ${match?.status}`}</Nav.Link>
                                )
                            })
                        }
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default MatchesHeaderComponent;