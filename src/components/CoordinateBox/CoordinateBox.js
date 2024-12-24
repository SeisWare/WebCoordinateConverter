import React, { useEffect, useState } from "react";
import {
    Badge,
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

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(()=> {
        setErrorMessage("");
        
        if(sourceCoordinateSystem === null || destinationCoordinateSystem === null) { return;}
        
        CoordinateOperations.ConvertXYToXY(sourceCoordinateSystem, destinationCoordinateSystem, sourceXY)
        .then((result) => { setDestinationXY(result); })
        .catch((err) => { setErrorMessage(err.message); });

    } , [sourceCoordinateSystem, sourceXY, destinationCoordinateSystem]);

    useEffect(()=>{
        if(sourceCoordinateSystem === null) { return;}
        CoordinateOperations.ConvertXYToLL(sourceCoordinateSystem, sourceXY)
        .then((result)=> { setSourceLL(result); });
    } , [sourceCoordinateSystem, sourceXY]);

    useEffect(()=>{
        if(destinationCoordinateSystem === null) { return;}
        CoordinateOperations.ConvertXYToLL(destinationCoordinateSystem, destinationXY)
        .then((result)=> { setDestinationLL(result); });
    } , [destinationCoordinateSystem, destinationXY]);

    return (
        <div className="coordinateBox">
            <Container fluid>
                <Row>
                    <div className='coordinateBox-header'>
                        <div className="coordinate-toolbar">
                            <CloseButton onClick={() => props.removeCoordinateBox(id)} title="Remove entry"/>
                            {errorMessage.length === 0 ? '' : <Badge bg="danger" title={errorMessage}>Error</Badge>}
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
                            <Col>
                                <LocationXYField onValueChange={setSourceXY} value={sourceXY}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <LocationLLField onValueChange={setSourceLL} value={sourceLL}/>
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
                            <Col>
                                <LocationXYField onValueChange={setDestinationXY} value={destinationXY} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <LocationLLField onValueChange={setDestinationLL} value={destinationLL}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CoordinateBox;