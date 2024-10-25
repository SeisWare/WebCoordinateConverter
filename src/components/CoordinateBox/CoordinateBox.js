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
import * as CoordinateOperations from './CoordinateOperations.ts';

const CoordinateBox = (props) => {
    const { id, type, coordinateSystems } = props;

    const [sourceCoordinateSystem, setSourceCoordinateSystem] = useState(null);
    const [sourceLL, setSourceLL] = useState([0.0, 0.0]);
    const [sourceXY, setSourceXY] = useState([0.0, 0.0]);
    
    const [destinationCoordinateSystem, setDestinationCoordinateSystem] = useState(null);
    const [destinationLL, setDestinationLL] = useState([0.0, 0.0]);
    const [destinationXY, setDestinationXY] = useState([0.0, 0.0]);

    // useEffect(()=>{
    //     if(sourceCoordinateSystem === null || destinationCoordinateSystem === null) { return;}
    //     CoordinateOperations.ConvertXYToXY(destinationCoordinateSystem.wkt, sourceCoordinateSystem.wkt, destinationXY)
    //     .then((result) => { setDestinationXY(result); });
    // } , [sourceCoordinateSystem, destinationXY, destinationCoordinateSystem]);

    useEffect(()=>{
        if(sourceCoordinateSystem === null || destinationCoordinateSystem === null) { return;}
        CoordinateOperations.ConvertXYToXY(sourceCoordinateSystem.wkt, destinationCoordinateSystem.wkt, sourceXY)
        .then((result) => { setDestinationXY(result); });
    } , [sourceCoordinateSystem, sourceXY, destinationCoordinateSystem]);

    useEffect(()=>{
        if(sourceCoordinateSystem === null) { return;}
        CoordinateOperations.ConvertXYToLL(sourceCoordinateSystem.wkt, sourceXY)
        .then((result)=> { setSourceLL(result); });
    } , [sourceCoordinateSystem, sourceXY]);

    useEffect(()=>{
        if(destinationCoordinateSystem === null) { return;}
        CoordinateOperations.ConvertXYToLL(destinationCoordinateSystem.wkt, destinationXY)
        .then((result)=> { setDestinationLL(result); });
    } , [destinationCoordinateSystem, destinationXY]);

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