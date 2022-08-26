import Button from 'react-bootstrap/Button';
import React from "react";
import './CoordinateBox.css';


const CoordinateBox = (props) => {
    const { id, type } = props.data;
    return (
        <div className="coordinateBox">
            <h3>Coordinate Box {id}</h3>
            <Button className="removeBtn"
                variant="outline-danger"
                onClick={() => props.removeCoordinateBox(id)}>
                remove
            </Button>
            <div className="boxBody">
                <div className="source">
                    <div>Source:</div>
                    <input
                        type="text"
                        placeholder="Enter New Item"
                    />
                    <button class="icon"><i class="fa fa-search"></i></button>
                </div>
            </div>
        </div>
    )
}

export default CoordinateBox;