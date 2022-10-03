import React from "react";
import { Button } from "react-bootstrap";
import CoordinateBox from "../CoordinateBox/CoordinateBox";
import './CoordinateConverters.css'

const CoordinateConverters = (props) => {
    const { converters, addCoordinateBox, removeCoordinateBox } = props;
    return (
        <div className="converterPanel">
            <div className="main-toolbar">
                <Button
                    className="round-btn"
                    variant="outline-success"
                    onClick={() => props.addCoordinateBox()}>
                    +
                </Button>
            </div>
            {converters.map((converter) => (
                <CoordinateBox
                    key={converter.id}
                    data={converter}
                    removeCoordinateBox={removeCoordinateBox}
                />
            ))}
        </div>
    )
}

export default CoordinateConverters;