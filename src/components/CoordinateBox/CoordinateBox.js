import React from "react";
import Button from 'react-bootstrap/Button';
import CoordinateField from '../CoordinatePanel/CoordinatePanel';
import './CoordinateBox.css';


const CoordinateBox = (props) => {
    const { id, type } = props.data;
    return (
        <div className="coordinateBox">
            <div className='coordinateBox-header'>
                <h3>Coordinate Box {id}</h3>
                <div className="coordinate-toolbar">
                    <Button className="removeBtn round-btn"
                        variant="outline-danger"
                        onClick={() => props.removeCoordinateBox(id)}>
                        x
                    </Button>
                </div>
            </div>
            <div className='coordinateBox-body'>
                <CoordinateField title="Source"/>
                <CoordinateField title="Destination"/>
            </div>
        </div>
    )
}

export default CoordinateBox;