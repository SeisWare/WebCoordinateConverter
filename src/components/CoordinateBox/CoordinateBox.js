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
//import { Module } from "module";
import proj4 from 'proj4';
import { decimalToDMS } from 'react-coordinate-input';

const CoordinateBox = (props) => {
    const { id, type, coordinateSystems } = props;

    const [sourceCoordinateSystem, setSourceCoordinateSystem] = useState(null);
    const [sourceLL, setSourceLL] = useState([0.0, 0.0]);
    const [sourceXY, setSourceXY] = useState([0.0, 0.0]);
    
    const [destinationCoordinateSystem, setDestinationCoordinateSystem] = useState(null);
    const [destinationLL, setDestinationLL] = useState([0.0, 0.0]);
    const [destinationXY, setDestinationXY] = useState([0.0, 0.0]);

    useEffect(()=>{
        if(sourceCoordinateSystem!== null && destinationCoordinateSystem!== null) {
            var converter = proj4(sourceCoordinateSystem.wkt, destinationCoordinateSystem.wkt);
            const converted = converter.forward(sourceXY);
            setDestinationXY(converted);
        }
    } , [sourceCoordinateSystem, sourceXY, destinationCoordinateSystem]);

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
                                <LocationLLField onValueChange={setSourceLL} value={sourceLL}/>
                            </Col>
                            <Col>
                                <LocationXYField onValueChange={setSourceXY} value={sourceXY}/>
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
                                <LocationLLField onValueChange={setDestinationLL} value={destinationLL}/>
                            </Col>
                            <Col>
                                <LocationXYField onValueChange={setDestinationXY} value={destinationXY} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CoordinateBox;