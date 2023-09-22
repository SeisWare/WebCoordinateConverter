import React, { useEffect, useRef, useState } from "react";
import {
    CloseButton,
    Container,
    Row,
    Col
}from 'react-bootstrap';
import CoordinateField from '../CoordinatePanel/CoordinateField';
import LocationLLField from '../CoordinatePanel/LocationLLField';
import LocationXYField from '../CoordinatePanel/LocationXYField';
import './CoordinateBox.css';

const CoordinateBox = (props) => {
    const { id, type, coordinateSystems } = props;

    const [sourceCoordinateSystem, setSourceCoordinateSystem] = useState(null);
    const [sourceLL, setSourceLL] = useState(null);
    const [sourceXY, setSourceXY] = useState(null);
    
    const [destinationCoordinateSystem, setDestinationCoordinateSystem] = useState(null);
    const [destinationLL, setDestinationLL] = useState(null);
    const [destinationXY, setDestinationXY] = useState(null);

    useEffect(()=>{

    } , [destinationCoordinateSystem, destinationLL]);

    return (
        <div className="coordinateBox">
            <Container fluid>
                <Row>
                    <div className='coordinateBox-header'>
                        <h3>Coordinate Box {id}</h3>
                        <div className="coordinate-toolbar">
                            <CloseButton onClick={() => props.removeCoordinateBox(id)} title="Remove entry "/>
                        </div>
                    </div>
                </Row>
                <Row className='coordinateBox-body'>
                    <Col md={6}>
                        <Row>
                            <CoordinateField 
                                title="Source"
                                coordinateSystems={coordinateSystems}
                                onCoordinateSystemChange={setSourceCoordinateSystem}
                            />
                        </Row>
                        <Row>
                            <Col md={7}>
                                <LocationLLField onValueChange={setSourceLL} />
                            </Col>
                            <Col>
                                <LocationXYField onValueChange={setSourceXY} />
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <Row>
                            <CoordinateField
                                title="Destination"
                                coordinateSystems={coordinateSystems}
                                onCoordinateSystemChange={setDestinationCoordinateSystem}
                            />
                        </Row>
                        <Row>
                            <Col md={7}>
                                <LocationLLField onValueChange={setDestinationLL} />
                            </Col>
                            <Col>
                                <LocationXYField onValueChange={setDestinationXY} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CoordinateBox;