import React from "react";
import './MainPage.css'
import Alert from 'react-bootstrap/Alert';
import CoordinateConverters from "../CoordinateConverters/CoordinateConverters";
import SystemSearch from "../SystemSearch/SystemSearch";

const MainPage = (props) => {
    const { converters, removeCoordinateBox } = props;
    return (
        <div className="MainPage">
            <Alert variant="primary" className="m-2 text-center" >
                web coordinate converter
            </Alert>
            <CoordinateConverters
                converters={converters}
                removeCoordinateBox={removeCoordinateBox}
            />
            <SystemSearch />
        </div>
    )
}

export default MainPage;