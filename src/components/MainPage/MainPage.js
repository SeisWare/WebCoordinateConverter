import React from "react";
import './MainPage.css'
import Alert from 'react-bootstrap/Alert';
import CoordinateConverters from "../CoordinateConverters/CoordinateConverters";

const MainPage = (props) => {
    const { coordinateSystems, converters, addCoordinateBox, removeCoordinateBox } = props;

    return (
        <div className="MainPage">
            <Alert variant="primary" className="m-2 text-center" >
                web coordinate converter
            </Alert>
            
            <CoordinateConverters
                converters={converters}
                addCoordinateBox={addCoordinateBox}
                removeCoordinateBox={removeCoordinateBox}
                coordinateSystems={coordinateSystems}
            />
        </div>
    )
}

export default MainPage;