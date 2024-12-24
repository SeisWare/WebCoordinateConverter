import React from "react";
import { Button, button } from "react-bootstrap";
import CoordinateBox from "../CoordinateBox/CoordinateBox";
import './CoordinateConverters.css'

const CoordinateConverters = (props) => {
    const { converters, coordinateSystems, removeCoordinateBox } = props;
    return (
        <div className="converterPanel">
            <div className="main-toolbar">
                <Button
                    className="round-btn add-btn"
                    variant="outline-success"
                    onClick={() => props.addCoordinateBox()}>
                </Button>
            </div>
            {converters.map((converter) => (
                <CoordinateBox
                    id={converter.id}
                    key={converter.id}
                    data={converter}
                    coordinateSystems={coordinateSystems}
                    removeCoordinateBox={removeCoordinateBox}
                />
            ))}
        </div>
    )
}

export default CoordinateConverters;