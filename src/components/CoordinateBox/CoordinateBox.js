import React from "react";
import {
    CloseButton,
    Container,
    Row,
    Col
}from 'react-bootstrap';
import CoordinateField from '../CoordinatePanel/CoordinateField';
import './CoordinateBox.css';

const CoordinateBox = (props) => {
    const { id, type, coordinateSystems } = props;
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
                        <CoordinateField 
                            title="Source"
                            coordinateSystems={coordinateSystems}
                        />
                    </Col>
                    <Col md={6}>
                        <CoordinateField
                            title="Destination"
                            coordinateSystems={coordinateSystems}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CoordinateBox;